import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs, siteConfig } from "@/data/site";

/**
 * Plain <details> elements — no JavaScript, so the answers are in the server-
 * rendered HTML and crawlable. These questions are mirrored as FAQPage
 * structured data in components/seo/StructuredData.tsx; Google requires the
 * marked-up text to be visible on the page, which is why both read from the
 * same source in data/site.ts.
 */
export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-[#fbfaf7] py-24 lg:py-32">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Common questions"
            title="What families in Wayanad usually ask us."
            description="Straight answers to the questions that come up most often on the phone — about freezer boxes, hearse vans, coffins, cost, and how far we travel."
          />
        </Reveal>

        <div className="mt-14 grid gap-3 lg:mt-20 lg:grid-cols-2 lg:gap-4">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={(index % 2) * 0.06}>
              <details className="group h-full rounded-[1.2rem] border border-[#dfe6e3] bg-white px-6 py-5 shadow-[0_10px_35px_rgba(23,58,66,0.04)] transition-[border-color,box-shadow] duration-300 open:border-[#cdbb98] open:shadow-[0_18px_50px_rgba(23,58,66,0.08)] sm:px-7 sm:py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b08d57] focus-visible:ring-offset-4 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[1.02rem] font-semibold leading-7 text-[#1d3c43]">
                    {faq.question}
                  </h3>
                  <span
                    className="relative mt-1.5 grid size-6 shrink-0 place-items-center rounded-full border border-[#dbe3e0] text-[#8b6b3c] transition-colors group-open:border-[#b08d57] group-open:bg-[#193f47] group-open:text-white"
                    aria-hidden="true"
                  >
                    <span className="absolute h-[1.5px] w-2.5 rounded-full bg-current" />
                    <span className="absolute h-2.5 w-[1.5px] rounded-full bg-current transition-transform duration-300 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="mt-4 text-[0.94rem] leading-7 text-[#69787a]">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 text-[0.92rem] leading-7 text-[#69787a]">
            Still unsure about something? Call{" "}
            <a
              href={siteConfig.phoneHref}
              className="font-semibold text-[#8b6b3c] underline decoration-[#d4b678] underline-offset-4 transition-colors hover:text-[#193f47]"
            >
              {siteConfig.phoneDisplay}
            </a>{" "}
            at any hour. There is no wrong time to ask.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
