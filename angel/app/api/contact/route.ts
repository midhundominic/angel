import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";

export const runtime = "nodejs";
// Enquiries must never be served from a cache.
export const dynamic = "force-dynamic";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Where enquiries land. Overridable so staging can point somewhere harmless. */
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || siteConfig.email;

/**
 * Must be an address on a domain verified in Resend. Sending from a subdomain
 * (mail.heavenfuneralservices.com) keeps the root-domain SPF record — which
 * Cloudflare Email Routing owns — untouched. See SEO-AND-SETUP.md.
 */
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ||
  "Heaven Funeral Services <enquiries@mail.heavenfuneralservices.com>";

const MAX_LENGTHS = {
  name: 120,
  phone: 32,
  email: 160,
  message: 4000,
} as const;

type Field = keyof typeof MAX_LENGTHS;

/**
 * Best-effort per-IP throttle. This lives in module memory, so it resets on cold
 * start and is not shared between serverless instances — it is a speed bump
 * against casual form spam, not a security control. The honeypot below does the
 * heavier lifting.
 */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const recentSubmissions = new Map<string, number[]>();

function recentHits(ip: string) {
  const now = Date.now();
  return (recentSubmissions.get(ip) || []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );
}

function isRateLimited(ip: string) {
  return recentHits(ip).length >= RATE_LIMIT_MAX;
}

/**
 * Called only once a submission is about to be sent. Validation failures must
 * not consume the allowance — someone mistyping their email three times while
 * arranging a funeral should not then be locked out.
 */
function recordAttempt(ip: string) {
  const now = Date.now();
  recentSubmissions.set(ip, [...recentHits(ip), now]);

  // Stop the map growing without bound on a long-lived instance.
  if (recentSubmissions.size > 500) {
    for (const [key, times] of recentSubmissions) {
      if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) {
        recentSubmissions.delete(key);
      }
    }
  }
}

function clean(value: unknown, field: Field) {
  return typeof value === "string"
    ? value.trim().slice(0, MAX_LENGTHS[field])
    : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Too many requests in a short time. Please call us directly — we answer 24 hours.",
      },
      { status: 429 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not read the form data." },
      { status: 400 },
    );
  }

  // Honeypot: a field hidden from humans. Anything that fills it is a bot, so we
  // return success without sending, which keeps the bot from retrying.
  if (clean(payload.company, "name")) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name, "name");
  const phone = clean(payload.phone, "phone");
  const email = clean(payload.email, "email");
  const message = clean(payload.message, "message");

  if (!name || !phone || !message) {
    return NextResponse.json(
      { ok: false, error: "Please fill in your name, phone number, and message." },
      { status: 400 },
    );
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "That email address does not look right." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "[contact] RESEND_API_KEY is not set — enquiry could not be delivered.",
      { name, phone, email },
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not send your message just now. Please call us directly — we answer 24 hours.",
      },
      { status: 503 },
    );
  }

  recordAttempt(ip);

  const receivedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email || "Not provided"],
    ["Received", `${receivedAt} (IST)`],
  ];

  const html = `
<div style="font-family:system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif;background:#fbfaf7;padding:24px;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #dce4e1;border-radius:14px;overflow:hidden;">
    <div style="background:#173b43;padding:22px 26px;">
      <p style="margin:0;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#dcc58f;font-weight:600;">New website enquiry</p>
      <p style="margin:8px 0 0;font-size:20px;color:#ffffff;font-weight:600;">Heaven Funeral Services</p>
    </div>
    <table style="width:100%;border-collapse:collapse;">
      ${rows
        .map(
          ([label, value]) => `
      <tr>
        <td style="padding:13px 26px;border-bottom:1px solid #eef2f0;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#7b898a;width:110px;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:13px 26px;border-bottom:1px solid #eef2f0;font-size:15px;color:#1d3b42;">${escapeHtml(value)}</td>
      </tr>`,
        )
        .join("")}
      <tr>
        <td style="padding:13px 26px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#7b898a;vertical-align:top;">Message</td>
        <td style="padding:13px 26px;font-size:15px;line-height:1.65;color:#1d3b42;white-space:pre-wrap;">${escapeHtml(message)}</td>
      </tr>
    </table>
    <div style="padding:18px 26px;background:#f6f8f7;">
      <a href="tel:${escapeHtml(phone.replace(/[^\d+]/g, ""))}" style="display:inline-block;background:#193f47;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:11px 20px;border-radius:999px;">Call ${escapeHtml(name)}</a>
    </div>
  </div>
</div>`.trim();

  const text = [
    "New website enquiry — Heaven Funeral Services",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        subject: `New enquiry from ${name} — ${phone}`,
        html,
        text,
        // Replying in the mail client goes straight back to the family.
        ...(email ? { reply_to: email } : {}),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("[contact] Resend rejected the message", {
        status: response.status,
        detail,
      });
      return NextResponse.json(
        {
          ok: false,
          error:
            "We could not send your message just now. Please call us directly — we answer 24 hours.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Unexpected failure sending enquiry", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not send your message just now. Please call us directly — we answer 24 hours.",
      },
      { status: 502 },
    );
  }
}
