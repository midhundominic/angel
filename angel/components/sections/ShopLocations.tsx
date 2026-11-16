import { Clock3, MapPin, Navigation, PhoneCall } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { directionsUrl, locations, mapEmbedUrl, siteConfig } from "@/data/site";

/**
 * Every shop on a live Google Map, each with a one-tap "Get directions" link.
 * The address text matches the structured data and the Business Profiles —
 * keep all three identical (see data/site.ts).
 *
 * Maps load lazily, so they cost nothing until the reader scrolls here.
 */
export function ShopLocations() {
  return (
    <section id="locations" className="scroll-mt-24 bg-[#f1f5f3] py-24 lg:py-32">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Find our shops"
            title="Three shops in Wayanad, open day and night."
            description="Come to whichever is nearer to see the coffins and arrangements in person, or tap for directions straight to the door."
          />
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:mt-20 xl:grid-cols-3">
          {locations.map((location, index) => (
            <Reveal key={location.id} delay={index * 0.08}>
              <article className="flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-[#dce4e1] bg-white shadow-[0_28px_80px_rgba(24,55,62,0.08)]">
                <div className="relative aspect-[16/10] bg-[#dfe8e5]">
                  <iframe
                    src={mapEmbedUrl(location)}
                    title={`Map showing ${location.name}, ${location.district}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 size-full border-0"
                    allowFullScreen
                  />
                </div>

                <div className="flex flex-1 flex-col p-7 sm:p-9">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b6b3c]">
                    {location.region}
                  </p>
                  <h3 className="display-font mt-3 text-3xl tracking-[-0.025em] text-[#19373e]">
                    {location.label}
                  </h3>
                  <p className="mt-4 text-[0.95rem] leading-7 text-[#5b6d6f]">
                    {location.description}
                  </p>

                  <ul className="mt-6 space-y-3 text-sm text-[#405a5f]">
                    <li className="flex items-start gap-3">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-[#9b793f]" aria-hidden="true" />
                      <address className="not-italic leading-6">
                        {location.streetAddress}, {location.taluk},{" "}
                        {location.district}, {location.addressRegion}{" "}
                        {location.postalCode}
                      </address>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock3 className="mt-0.5 size-4 shrink-0 text-[#9b793f]" aria-hidden="true" />
                      {siteConfig.availability}
                    </li>
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-3 pt-8">
                    <a
                      href={directionsUrl(location)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#173b43] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0f2b31]"
                    >
                      <Navigation className="size-4" aria-hidden="true" />
                      Get directions
                    </a>
                    <a
                      href={siteConfig.phoneHref}
                      className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#cdd8d4] px-6 text-sm font-semibold text-[#173b43] transition-colors hover:border-[#9b793f] hover:text-[#8b6b3c]"
                    >
                      <PhoneCall className="size-4" aria-hidden="true" />
                      Call {siteConfig.phoneDisplay}
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
