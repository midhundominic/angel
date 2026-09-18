import { MapPin, Navigation } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceAreas, siteConfig } from "@/data/site";

/**
 * Named places are what let "funeral services near me" and "freezer box
 * <village>" searches resolve to this business. The same list feeds `areaServed`
 * in the structured data, so the markup and the visible copy agree.
 */
export function ServiceAreas() {
  return (
    <section
      id="service-areas"
      className="scroll-mt-24 overflow-hidden bg-[#f8f8f4] py-24 lg:py-32"
    >
      <div className="section-shell relative">
        <div
          className="pointer-events-none absolute -left-44 -top-40 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(105,151,155,0.1),transparent_68%)]"
          aria-hidden="true"
        />

        <Reveal>
          <SectionHeading
            eyebrow="Where we travel"
            title="Two shops, covering Wayanad from both ends."
            description="One shop at Payyampally in Mananthavady taluk, the other at Chennalode in Vythiri taluk just north of Kalpetta — about 22km apart, between them reaching every panchayat in Wayanad district. For long-distance journeys we cross into Kannur, Kozhikode, Karnataka, and Tamil Nadu."
          />
        </Reveal>

        <div className="relative mt-14 grid gap-4 lg:mt-20 lg:grid-cols-2">
          {serviceAreas.map((area, index) => (
            <Reveal key={area.group} delay={index * 0.07}>
              <div className="h-full rounded-[1.4rem] border border-[#dfe6e3] bg-white p-7 shadow-[0_14px_45px_rgba(23,58,66,0.045)] transition-[border-color,box-shadow] duration-300 hover:border-[#cdbb98] hover:shadow-[0_22px_55px_rgba(23,58,66,0.09)] sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#edf3f1] text-[#2c5961]">
                    {index === 0 ? (
                      <MapPin className="size-5" strokeWidth={1.7} aria-hidden="true" />
                    ) : (
                      <Navigation className="size-5" strokeWidth={1.7} aria-hidden="true" />
                    )}
                  </span>
                  <div>
                    <h3 className="display-font text-[1.45rem] leading-tight tracking-[-0.02em] text-[#19373e]">
                      {area.group}
                    </h3>
                    <p className="mt-2 text-[0.9rem] leading-6 text-[#69787a]">
                      {area.description}
                    </p>
                  </div>
                </div>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {area.places.map((place) => (
                    <li
                      key={place}
                      className="rounded-full border border-[#e4eae7] bg-[#fafbf9] px-3 py-1.5 text-[0.8rem] text-[#3f5b60]"
                    >
                      {place}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="relative mt-10 max-w-3xl text-[0.92rem] leading-7 text-[#69787a]">
            Don’t see your village listed? Call{" "}
            <a
              href={siteConfig.phoneHref}
              className="font-semibold text-[#8b6b3c] underline decoration-[#d4b678] underline-offset-4 transition-colors hover:text-[#193f47]"
            >
              {siteConfig.phoneDisplay}
            </a>{" "}
            anyway — if it is within reach of Wayanad, we will almost certainly
            come, and we will tell you plainly on the phone if we cannot.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
