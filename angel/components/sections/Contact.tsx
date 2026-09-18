"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Clock3,
  Loader2,
  Mail,
  MapPin,
  PhoneCall,
  Send,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { locations, siteConfig } from "@/data/site";

const fieldClass =
  "mt-2 min-h-12 w-full rounded-xl border border-[#dce4e1] bg-[#fafbf9] px-4 text-[0.95rem] text-[#1d3b42] outline-none transition placeholder:text-[#9aa6a5] focus:border-[#9b793f] focus:bg-white focus:ring-4 focus:ring-[#b08d57]/10";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "error"; message: string };

const FALLBACK_ERROR =
  "We could not send your message just now. Please call us directly — we answer 24 hours.";

export function Contact() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const reduceMotion = useReducedMotion();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.state === "sending") return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus({ state: "sending" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.ok) {
        form.reset();
        setStatus({ state: "sent" });
        return;
      }

      setStatus({ state: "error", message: result.error || FALLBACK_ERROR });
    } catch {
      setStatus({ state: "error", message: FALLBACK_ERROR });
    }
  };

  const sending = status.state === "sending";

  return (
    <section id="contact" className="scroll-mt-24 bg-[#fbfaf7] py-24 lg:py-32">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Here when you need us"
            title="Funeral help in Wayanad, any hour of the day."
            description="For an immediate hearse, a freezer box at the house, or a planned long-distance journey, contact us. We’ll take down the essential details and tell you exactly what happens next."
          />
        </Reveal>

        <div className="mt-14 grid overflow-hidden rounded-[1.8rem] border border-[#dce4e1] bg-white shadow-[0_28px_80px_rgba(24,55,62,0.1)] lg:mt-20 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal className="relative overflow-hidden bg-[#173b43] p-7 text-white sm:p-10 lg:p-12" y={0}>
            <div
              className="absolute -right-28 -top-28 size-80 rounded-full border border-white/10"
              aria-hidden="true"
            />
            <div
              className="absolute -right-14 -top-14 size-52 rounded-full border border-white/10"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#dcc58f]">
                24-hour dispatch
              </p>
              <h3 className="display-font mt-4 max-w-sm text-4xl leading-[1.08] tracking-[-0.03em]">
                Speak with someone calm and local.
              </h3>
              <p className="mt-5 max-w-sm text-sm leading-7 text-white/62">
                If your need is urgent, calling is the quickest way to begin. We
                have two shops in Wayanad — at Payyampally and at Chennalode —
                so one of them is close to you.
              </p>

              <div className="mt-9 space-y-3">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Call dispatch
                </p>
                {siteConfig.phoneNumbers.map((phone) => (
                  <motion.a
                    key={phone.href}
                    href={phone.href}
                    whileHover={reduceMotion ? undefined : { x: 4 }}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-white/12 bg-white/[0.07] p-4 transition-colors hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dcc58f]"
                  >
                    <span className="flex items-center gap-4">
                      <span className="grid size-10 place-items-center rounded-xl bg-[#dcc58f] text-[#173b43]">
                        <PhoneCall className="size-[18px]" aria-hidden="true" />
                      </span>
                      <span className="text-base font-semibold text-white">
                        {phone.display}
                      </span>
                    </span>
                    <ArrowUpRight className="size-5 text-[#dcc58f]" aria-hidden="true" />
                  </motion.a>
                ))}
              </div>

              <ul className="mt-9 space-y-4 text-sm text-white/58">
                <li className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 size-4 shrink-0 text-[#dcc58f]" aria-hidden="true" />
                  {siteConfig.availability}
                </li>
                {/* Both shops spelled out, matching their Google Business
                    Profiles — consistent NAP text is a direct local-ranking
                    signal, and each address needs to appear on the page. */}
                {locations.map((location) => (
                  <li key={location.id} className="flex items-start gap-3">
                    <MapPin
                      className="mt-0.5 size-4 shrink-0 text-[#dcc58f]"
                      aria-hidden="true"
                    />
                    <address className="not-italic leading-6">
                      <span className="block font-semibold text-white/80">
                        {location.label}
                      </span>
                      {location.streetAddress}, {location.taluk},{" "}
                      {location.district}, {location.addressRegion}{" "}
                      {location.postalCode}
                    </address>
                  </li>
                ))}
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-[#dcc58f]" aria-hidden="true" />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="break-all transition-colors hover:text-white"
                  >
                    {siteConfig.email}
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal className="p-7 sm:p-10 lg:p-12" delay={0.08} y={0}>
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b6b3c]">
                  Request service
                </p>
                <h3 className="display-font mt-3 text-3xl tracking-[-0.025em] text-[#19373e]">
                  Tell us how we can help.
                </h3>
              </div>
              <span className="hidden size-12 place-items-center rounded-full bg-[#edf3f1] text-[#28555d] sm:grid">
                <Send className="size-5" aria-hidden="true" />
              </span>
            </div>

            <form className="relative mt-8" onSubmit={handleSubmit}>
              {/* Honeypot — hidden from people, irresistible to bots. Positioned
                  off-screen rather than display:none, which many bots skip. */}
              <div className="absolute left-[-9999px] top-0 size-px overflow-hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-medium text-[#29484e]">
                  Name
                  <input
                    className={fieldClass}
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Your full name"
                    maxLength={120}
                    required
                  />
                </label>
                <label className="text-sm font-medium text-[#29484e]">
                  Phone
                  <input
                    className={fieldClass}
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="Best number to reach you"
                    maxLength={32}
                    required
                  />
                </label>
              </div>
              <label className="mt-5 block text-sm font-medium text-[#29484e]">
                Email <span className="font-normal text-[#849091]">(optional)</span>
                <input
                  className={fieldClass}
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  maxLength={160}
                />
              </label>
              <label className="mt-5 block text-sm font-medium text-[#29484e]">
                Message
                <textarea
                  className={`${fieldClass} min-h-32 resize-y py-3`}
                  name="message"
                  placeholder="Share the pickup location, destination, and timing if known."
                  maxLength={4000}
                  required
                />
              </label>

              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#193f47] px-6 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(25,63,71,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#24515a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b08d57] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {sending ? (
                    <>
                      Sending
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      Request Immediate Service
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </>
                  )}
                </button>
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-semibold text-[#35565d] transition-colors hover:text-[#8b6b3c]"
                >
                  <PhoneCall className="size-4" aria-hidden="true" />
                  Call Now
                </a>
              </div>

              <p
                className={`mt-5 text-xs leading-5 ${
                  status.state === "sent"
                    ? "font-semibold text-[#2b6b4f]"
                    : status.state === "error"
                      ? "font-semibold text-[#a4442f]"
                      : "text-[#849091]"
                }`}
                role="status"
                aria-live="polite"
              >
                {status.state === "sent"
                  ? "Thank you — your message has reached us. We will call you back shortly. If it is urgent, please ring the dispatch number."
                  : status.state === "error"
                    ? status.message
                    : status.state === "sending"
                      ? "Sending your request…"
                      : "For urgent requests, please call — we answer 24 hours. Messages sent here reach us by email."}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
