# SEO & setup — Heaven Funeral Services

Everything in **Part 1** is already done in code. Everything in **Part 2** has to be
done by a human with access to the Google and Resend accounts — the site cannot
rank or send email until those are finished.

---

## Why the site was not appearing in Google

Searching `site:heavenfuneralservices.com` returned **zero results** — Google had
not indexed a single page. Five separate causes:

| # | Problem | Status |
|---|---------|--------|
| 1 | `/robots.txt` returned **404** — crawlers had no sitemap pointer | Fixed in code |
| 2 | `/sitemap.xml` returned **404** — nothing to submit or crawl | Fixed in code |
| 3 | No canonical URL and no `metadataBase` | Fixed in code |
| 4 | No structured data — Google could not tell it was a local business | Fixed in code |
| 5 | **Never submitted to Google Search Console** | ⚠️ You must do this |

Cause 5 is the big one. A brand-new domain with no backlinks can sit
undiscovered for months. Submitting it in Search Console usually gets the
homepage indexed within a few days.

There was also a content problem. The page targeted American funeral-trade
language — *"decedent transport"*, *"mortuary transport"* — which has
effectively **zero search volume in Kerala**. Nobody in Wayanad types that. The
copy now targets what people actually search: *Christian funeral services*,
*dead body freezer box*, *hearse van*, *coffin shop*, *ambulance for dead body*,
*funeral services Wayanad*.

The site also described a single showroom. There are **two shops**, in two
different taluks, and each needs its own listing and its own structured-data
entry — see below.

---

## Part 1 — What was changed in code

### New files

| File | What it does |
|------|--------------|
| `app/robots.ts` | Serves `/robots.txt`, points to the sitemap |
| `app/sitemap.ts` | Serves `/sitemap.xml`, including all 14 gallery images for Google Images |
| `app/manifest.ts` | PWA manifest |
| `app/api/contact/route.ts` | Sends contact-form enquiries to `woads@heavenfuneralservices.com` |
| `components/seo/StructuredData.tsx` | JSON-LD: one `FuneralHome` per shop, plus `Organization`, `WebSite`, `WebPage`, `FAQPage` |
| `components/sections/ServiceAreas.tsx` | 49 named towns and villages, grouped around each shop |
| `components/sections/Faq.tsx` | 9 questions, rendered as plain `<details>` so they are crawlable |
| `data/seo.ts` | The keyword set, with reasoning |
| `public/llms.txt` | Plain-text business summary for AI assistants |
| `.env.example` | Environment variable template |

### Changed files

- **`app/layout.tsx`** — full metadata: `metadataBase`, canonical, localised
  title and description, OpenGraph with image, Twitter card, geo tags,
  `max-image-preview:large`, Search Console verification hook.
- **`data/site.ts`** — a `locations` array holding both shops with their own NAP
  and coordinates, plus service areas, FAQs, and location-bearing image alt text.
- **`components/sections/Hero.tsx`** — the `<h1>` now reads *"Christian funeral
  services in Wayanad, with quiet care."* It previously carried no location,
  service or denomination keyword at all, which is the single most important
  on-page signal.
- **`components/sections/Services.tsx`** — service names rewritten to real search
  terms; added *Christian Funeral Arrangements*, *Hearse Van Service*, *Mortuary
  Freezer Box on Rent*, *Coffins, Crosses & Flowers*, and *Church & Parish
  Coordination*.
- **`components/sections/About.tsx`**, **`Contact.tsx`**, **`layout/Footer.tsx`** —
  local copy, full postal address, and email in the footer and contact panel.

### Verified working

```
✓ /robots.txt      → 200, points at the sitemap
✓ /sitemap.xml     → 200, homepage + 14 images
✓ JSON-LD          → parses clean; 2 branches, 50 areaServed, 8 services, 9 FAQs
✓ <h1>             → "Christian funeral services in Wayanad, with quiet care."
✓ canonical        → https://www.heavenfuneralservices.com
✓ /api/contact     → validation, honeypot, rate limiting, error handling
✓ next build       → passes, TypeScript clean
```

---

## Part 2 — What you must do

### 2.1 Set the environment variables (required for the contact form)

The form posts to `/api/contact`, which sends through **Resend**. Without a key
the form shows *"please call us directly"* instead of silently failing.

**a. Create a Resend account** at <https://resend.com> — the free tier covers
3,000 emails/month, far more than this form will ever need.

**b. Add a sending domain.** In Resend, add `mail.heavenfuneralservices.com`
(a subdomain, not the root). Resend gives you DKIM and SPF records.

> **Why a subdomain?** Your root domain already has an SPF record for Cloudflare
> Email Routing: `v=spf1 include:_spf.mx.cloudflare.net ~all`. A domain may only
> have **one** SPF record. Using a subdomain for sending keeps that record
> untouched, so incoming mail to `woads@heavenfuneralservices.com` keeps working.

**c. Add the records in Cloudflare DNS** (your nameservers are
`johnathan.ns.cloudflare.com` / `mckenzie.ns.cloudflare.com`). Set each record to
**DNS only** (grey cloud), not proxied.

**d. Add these in Vercel** → Project → Settings → Environment Variables:

```
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_FROM_EMAIL="Heaven Funeral Services <enquiries@mail.heavenfuneralservices.com>"
CONTACT_TO_EMAIL=woads@heavenfuneralservices.com
```

Redeploy afterwards — Vercel does not apply new variables to existing builds.

**e. Test it.** Submit the form on the live site and confirm the email arrives.
Check the spam folder on the first one; mark it "not spam" if it lands there.

> `woads@heavenfuneralservices.com` is a **Cloudflare Email Routing** address —
> it forwards to a real inbox rather than being one. Make sure whoever needs to
> see enquiries is on the receiving end of that forward.

### 2.2 Google Search Console — this is what gets you indexed

1. Go to <https://search.google.com/search-console>.
2. Add a **Domain** property for `heavenfuneralservices.com` (covers www, non-www,
   http and https in one).
3. Verify with the **DNS TXT record** method — add the TXT record Google gives
   you in Cloudflare DNS. *(Alternative: set `GOOGLE_SITE_VERIFICATION` in Vercel
   and use the HTML-tag method; the layout already emits the tag when that
   variable is set.)*
4. **Sitemaps** → submit `sitemap.xml`.
5. **URL Inspection** → paste `https://www.heavenfuneralservices.com/` →
   **Request Indexing**.

Expect the homepage to appear within 3–14 days. Check back in Search Console
rather than guessing — searching Google yourself is unreliable because of
personalisation.

### 2.3 Google Business Profile — create **two**, one per shop

For a local funeral service, **most people will find you through Google Maps,
not web search.** Verified Business Profiles are worth more than everything else
on this page combined.

You have two shops in two different taluks, so create **two separate profiles**.
A single profile cannot rank in both Mananthavady and Kalpetta, and Google will
only show a location in the Maps pack for searches near its own pin.

| | Payyampally shop | Chennalode shop |
|---|---|---|
| Name | Heaven Funeral Services | Heaven Funeral Services |
| Locality | Payyampally, Mananthavady taluk | Chennalode, Vythiri taluk |
| Pincode | 670646 | 673121 |
| Pin | 11.810803, 76.0536769 | 11.63045, 76.0867 |

For each one, at <https://business.google.com>:

1. Category: **Funeral home** (add *Funeral director* and *Mortuary* as secondary).
2. Address: the exact address on that shop's signboard. Verification is by
   postcard or video call — allow a couple of weeks per location.
3. Hours: **Open 24 hours**, all seven days.
4. Phone: `+91 95956 16843`. Website: `https://www.heavenfuneralservices.com`.
5. Service areas: for Payyampally add Mananthavady, Panamaram, Kattikulam,
   Thirunelli, Vellamunda, Thalappuzha. For Chennalode add Kalpetta, Vythiri,
   Meppadi, Muttil, Sulthan Bathery, Meenangadi.
6. Upload the shop, hearse and freezer-unit photos already in `public/images/`.
7. List services matching the site: Christian funeral arrangements, dead body
   transport, freezer box rental, hearse van, coffins, long-distance transport.

> **Critical:** the name, address and phone number on each profile must match the
> website **character for character**. Inconsistent NAP data is one of the most
> common local-ranking problems. Both addresses live in one place —
> the `locations` array in `data/site.ts` — so set those to match the profiles
> exactly.

Then ask families you have served to leave a review, on whichever profile is
nearer to them. Reviews are the strongest ranking factor in the Maps pack, and
you currently have none.

### 2.4 Fill in the remaining business details

Two `TODO(owner)` markers are in `data/site.ts`:

- **`streetAddress`** on each entry in the `locations` array — currently just
  `"Payyampally"` and `"Chennalode"`. Replace each with the exact address on that
  shop's signboard.
- **`social`** — Facebook, Instagram, YouTube and the Google Maps link are all
  empty strings. Each one filled in becomes a `sameAs` entry in the structured
  data, which is how Google connects the website to the business as one entity.
  Once both Business Profiles exist, add each shop's Maps link too.

The coordinates you supplied are in place (Payyampally `11.810803, 76.0536769`;
Chennalode `11.63045, 76.0867`). Confirm each against its Business Profile pin
once the profiles are live, so the schema and the profile agree.

### 2.5 Local directories

Free listings, each one a citation that reinforces the business's existence:
Justdial, IndiaMART, Sulekha, Bing Places, Apple Business Connect. Use the
**same NAP text every time**.

---

## Keyword reference

The full set lives in `data/seo.ts`. The terms the site is built to win:

**Primary**
- funeral services Wayanad
- Christian funeral services Wayanad
- funeral services Payyampally / Chennalode / Mananthavady / Kalpetta
- dead body freezer box Wayanad
- mortuary freezer box rent Wayanad
- hearse van Wayanad
- dead body transport Wayanad
- coffin shop Wayanad
- ambulance for dead body Wayanad
- long distance dead body transport Kerala
- 24 hour funeral service Wayanad

**Christian funeral** — the core of the business, and previously absent from the
site entirely: Christian funeral service Kerala, Christian funeral arrangements
Wayanad, Catholic funeral services Wayanad, church funeral arrangements,
Christian coffin shop Wayanad, parish funeral coordination.

**Secondary** — village-level and neighbouring-district terms (Panamaram,
Kattikulam, Thalappuzha, Vellamunda, Thirunelli, Vythiri, Meppadi, Muttil,
Kalpetta, Sulthan Bathery, Meenangadi, Ambalavayal, Pulpally, Kannur, Kozhikode,
Bangalore-to-Kerala), plus transliterated Malayalam.

Every one of these appears in visible page copy, not only in the meta keywords
tag — Google ignores that tag entirely. The copy is where the ranking comes from.

### Worth doing later

Right now this is a single page, which limits how many terms it can rank for.
The highest-value next step is a handful of dedicated pages, each targeting one
intent:

- `/christian-funeral-services-wayanad`
- `/freezer-box-rent-wayanad`
- `/hearse-van-wayanad`
- `/coffin-shop-wayanad`
- `/long-distance-dead-body-transport`
- `/funeral-services-mananthavady` (Payyampally shop)
- `/funeral-services-kalpetta` (Chennalode shop)

The last two matter most: a page per shop, each linked from its own Google
Business Profile, is what lets the two locations rank independently.

Add a Malayalam version of the homepage too — a large share of local searches
are in Malayalam, and nothing currently serves them.

---

## Checklist

- [ ] Deploy these changes to production
- [ ] Confirm `https://www.heavenfuneralservices.com/robots.txt` returns 200
- [ ] Confirm `https://www.heavenfuneralservices.com/sitemap.xml` returns 200
- [ ] Run the homepage through the [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Set `RESEND_API_KEY` and the contact variables in Vercel, then redeploy
- [ ] Send a test enquiry and confirm it arrives
- [ ] Verify the domain in Google Search Console
- [ ] Submit the sitemap
- [ ] Request indexing for the homepage
- [ ] Create and verify the **Payyampally** Google Business Profile
- [ ] Create and verify the **Chennalode** Google Business Profile
- [ ] Replace both `streetAddress` values in `data/site.ts` with the real addresses
- [ ] Add the social and both Google Maps URLs to `data/site.ts`
- [ ] Ask past clients for Google reviews
- [ ] Re-check Search Console coverage after two weeks
