import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Clock3,
  Cross,
  Feather,
  Flower2,
  MapPin,
  PhoneCall,
  Snowflake,
  Tag,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageHero } from "@/components/layout/PageHero";
import { PageSchema, breadcrumbNode, faqNode } from "@/components/seo/PageSchema";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  choosingSteps,
  coffinFaqs,
  coffinInclusions,
  coffinRanges,
} from "@/data/coffins";
import { locations, siteConfig } from "@/data/site";

const PATH = "/coffin-boxes";

const TITLE = "Coffin Boxes in Wayanad — Payyampally & Chennalode";

const DESCRIPTION =
  "Coffins for sale in Wayanad at our Payyampally and Chennalode shops — plain hardwood, cross-panel with viewing glass, carved, and lined caskets. Open 24 hours, same-day delivery.";

export const metadata: Metadata = {
  title: "Coffin Boxes in Wayanad",
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  keywords: [
    "coffin shop Wayanad",
    "coffin box Wayanad",
    "coffins for sale Wayanad",
    "buy coffin Wayanad",
    "coffin price Wayanad",
    "coffin box Mananthavady",
    "coffin shop Kalpetta",
    "Christian coffins for sale Wayanad",
    "wooden coffin for sale Kerala",
    "decorated coffin for sale Wayanad",
    "coffin shop near me Wayanad",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${siteConfig.url}${PATH}`,
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/coffins/coffinbox_heavenfuneral.jpg",
        width: 1280,
        height: 960,
        alt: "Rows of polished wooden coffins inside the Heaven Funeral Services coffin shop in Wayanad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/coffins/coffinbox_heavenfuneral.jpg"],
  },
};

const inclusionIcons: LucideIcon[] = [
  Cross,
  Feather,
  Tag,
  Flower2,
  Snowflake,
  Truck,
];

export default function CoffinBoxesPage() {
  const crumbs = [
    { label: "Home", path: "/" },
    { label: "Coffin Boxes", path: PATH },
  ];

  return (
    <>
      <PageSchema
        nodes={[
          breadcrumbNode(crumbs),
          {
            "@type": "CollectionPage",
            "@id": `${siteConfig.url}${PATH}#webpage`,
            url: `${siteConfig.url}${PATH}`,
            name: TITLE,
            description: DESCRIPTION,
            inLanguage: "en-IN",
            isPartOf: { "@id": `${siteConfig.url}/#website` },
            about: { "@id": `${siteConfig.url}/#organization` },
            primaryImageOfPage: `${siteConfig.url}/images/coffins/coffinbox_heavenfuneral.jpg`,
            breadcrumb: { "@id": `${siteConfig.url}${PATH}#breadcrumb` },
          },
          {
            // A plain ItemList of the ranges — deliberately NOT typed `Product`.
            //
            // Google validates every Product node against its product-snippet
            // rules, which require `offers`, `review`, or `aggregateRating`.
            // We publish no coffin prices (the figure depends on size, wood and
            // fittings, and is given on the phone), we have no reviews to cite,
            // and inventing either would be a lie in structured data. So a
            // Product node here can only ever be reported as invalid.
            //
            // A ListItem carrying name, url, image and description says exactly
            // the same thing to a crawler, is valid, and keeps the report clean.
            // If coffin prices are ever published, switch these back to Product
            // with a real AggregateOffer and they become rich-result eligible.
            "@type": "ItemList",
            "@id": `${siteConfig.url}${PATH}#coffins`,
            name: "Coffin ranges available in Wayanad",
            description:
              "The coffin ranges kept in stock at the Payyampally and Chennalode shops.",
            numberOfItems: coffinRanges.length,
            itemListOrder: "https://schema.org/ItemListUnordered",
            itemListElement: coffinRanges.map((range, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: range.name,
              description: range.description,
              image: `${siteConfig.url}${range.image}`,
              url: `${siteConfig.url}${PATH}#${range.id}`,
            })),
          },
          faqNode(PATH, coffinFaqs),
        ]}
      />

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />

      <main id="main-content">
        <PageHero
          eyebrow="Coffins & caskets"
          title="Coffin boxes in Wayanad, kept ready at both shops."
          description="Plain hardwood through to hand-carved and fully lined — a full range on the floor at Payyampally and at Chennalode, day and night. Come and see them, or tell us the measurement on the phone and we will bring what you choose to the house."
          crumbs={crumbs.map((crumb, index) => ({
            label: crumb.label,
            href: index < crumbs.length - 1 ? crumb.path : undefined,
          }))}
          meta={[
            "Six ranges in stock",
            "Child & oversize sizes",
            "Same-day delivery across Wayanad",
            "Open 24 hours",
          ]}
          image={{
            src: "/images/coffins/coffinbox_heavenfuneral.jpg",
            alt: "Rows of polished wooden coffins with cross inlays inside the Heaven Funeral Services coffin shop in Wayanad",
          }}
        />

        {/* ——— The ranges ——————————————————————————————————————————— */}
        <section id="ranges" className="scroll-mt-24 bg-[#fbfaf7] py-24 lg:py-32">
          <div className="section-shell">
            <Reveal>
              <SectionHeading
                eyebrow="What we keep"
                title="Six ranges, and no wrong choice among them."
                description="Stock turns over constantly and finishes vary with what the workshop has on hand, so these are families of coffins rather than fixed models. Call before you travel and we will tell you exactly what is on the floor at each shop."
                align="center"
              />
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
              {coffinRanges.map((range, index) => (
                <Reveal key={range.id} delay={(index % 3) * 0.07}>
                  <article
                    id={range.id}
                    className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-[#dfe6e3] bg-white shadow-[0_14px_45px_rgba(23,58,66,0.045)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1.5 hover:border-[#cdbb98] hover:shadow-[0_24px_60px_rgba(23,58,66,0.1)]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#e7edea]">
                      <Image
                        src={range.image}
                        alt={range.alt}
                        fill
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 31vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-[#102e35]/85 via-[#102e35]/20 to-transparent"
                        aria-hidden="true"
                      />
                      {range.badge ? (
                        <span className="absolute left-4 top-4 rounded-full bg-[#d9bd83] px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#14343b]">
                          {range.badge}
                        </span>
                      ) : null}
                      <p className="absolute bottom-4 left-5 right-5 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#e6d0a3]">
                        {range.tagline}
                      </p>
                    </div>

                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <h2 className="display-font text-[1.55rem] leading-tight tracking-[-0.025em] text-[#19373e]">
                        {range.name}
                      </h2>
                      <p className="mt-3.5 text-[0.93rem] leading-7 text-[#69787a]">
                        {range.description}
                      </p>
                      <ul className="mt-6 space-y-2.5 border-t border-[#eaefec] pt-6">
                        {range.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex gap-3 text-[0.86rem] leading-6 text-[#4e6367]"
                          >
                            <Check
                              className="mt-0.5 size-4 shrink-0 text-[#b08d57]"
                              strokeWidth={2.4}
                              aria-hidden="true"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={siteConfig.phoneHref}
                        className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#8b6b3c] transition-colors hover:text-[#193f47]"
                      >
                        Ask what is in stock
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ——— Inclusions ——————————————————————————————————————————— */}
        <section className="bg-[#eef3f1] py-24 lg:py-32">
          <div className="section-shell">
            <Reveal>
              <SectionHeading
                eyebrow="Nothing sold separately"
                title="What goes out with every coffin."
                description="You are not assembling a funeral from parts. Choose the coffin and the rest follows it out of the shop on the same vehicle, at the hour the parish has set."
              />
            </Reveal>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-18 lg:grid-cols-3">
              {coffinInclusions.map((item, index) => {
                const Icon = inclusionIcons[index % inclusionIcons.length];
                return (
                  <Reveal key={item.title} delay={(index % 3) * 0.06}>
                    <div className="flex h-full gap-5 rounded-[1.25rem] border border-[#d9e3df] bg-white/70 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-[#cdbb98] hover:bg-white">
                      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#193f47] text-white">
                        <Icon className="size-5" strokeWidth={1.7} aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-semibold text-[#1d3c43]">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-[#65757a]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ——— How to choose ———————————————————————————————————————— */}
        <section className="bg-[#fbfaf7] py-24 lg:py-32">
          <div className="section-shell grid items-start gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <Reveal className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#dfe8e5] shadow-[0_32px_80px_rgba(24,55,62,0.14)]">
                <Image
                  src="/images/coffins/coffin_box.png"
                  alt="Open walnut casket with a tufted cream satin interior and chrome handles, available in Wayanad"
                  fill
                  sizes="(max-width: 1024px) 90vw, 42vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#16363d]/60 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <p className="display-font absolute bottom-8 left-8 right-8 text-2xl leading-tight text-white">
                  A plain coffin carried by six people who loved the person is
                  not a lesser funeral.
                </p>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <SectionHeading
                  eyebrow="Four decisions"
                  title="How to choose, when you have never had to before."
                  description="Most people choose a coffin once in their lives, in a hurry, in a room full of them. Taking it in this order makes the whole thing shorter and a great deal calmer."
                />
              </Reveal>

              <ol className="mt-12 space-y-3">
                {choosingSteps.map((step, index) => (
                  <Reveal key={step.title} delay={index * 0.07}>
                    <li className="group flex gap-6 rounded-2xl border border-transparent p-5 transition-all duration-300 hover:border-[#e0e6e3] hover:bg-white hover:shadow-[0_14px_40px_rgba(24,55,62,0.06)]">
                      <span className="display-font grid size-12 shrink-0 place-items-center rounded-full border border-[#ddd0b4] bg-[#f6f1e6] text-lg text-[#8b6b3c] transition-colors group-hover:border-[#b08d57] group-hover:bg-[#193f47] group-hover:text-white">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="mt-2.5 font-semibold text-[#1d3c43]">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-[0.93rem] leading-7 text-[#69787a]">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>

              <Reveal delay={0.1}>
                <div className="mt-10 rounded-[1.25rem] border border-[#e3d9c2] bg-[#f8f4ea] p-6 sm:p-7">
                  <p className="text-[0.95rem] leading-7 text-[#5c5138]">
                    We give a clear figure on the phone before anything is
                    arranged, and nothing is added to it afterwards. If a range
                    costs more than the family can carry, say so plainly —
                    there is always something appropriate at a different price,
                    and being asked does not embarrass anyone here.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ——— Freezer box cross-sell ——————————————————————————————— */}
        <section className="bg-[#14343b] py-20 text-white lg:py-24">
          <div className="section-shell grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#d4b678]" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d8c08e]">
                  Arranged on the same call
                </p>
              </div>
              <h2 className="display-font mt-5 text-balance text-[2.2rem] leading-[1.1] tracking-[-0.03em] sm:text-[2.6rem]">
                A mortuary freezer box, if people are still travelling.
              </h2>
              <p className="mt-6 max-w-xl text-[1.01rem] leading-8 text-white/65">
                If a son is flying in from the Gulf or a daughter is driving up
                from Bengaluru, the body has to be kept — and it can be kept at
                home rather than at a hospital mortuary. We deliver the unit,
                set it up on an ordinary domestic connection, and collect it
                once the rites are done. Charged by the day, with no minimum
                hire.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[#d9bd83] px-6 text-sm font-semibold text-[#14343b] transition-all hover:-translate-y-0.5 hover:bg-white"
                >
                  <PhoneCall className="size-[17px]" aria-hidden="true" />
                  Call dispatch
                </a>
                <Link
                  href="/blogs/mortuary-freezer-box-on-rent-wayanad"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition-colors hover:border-[#d4b678] hover:text-[#dec38b]"
                >
                  How the hire works
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_32px_80px_rgba(4,20,24,0.45)]">
              <Image
                src="/images/freezer/heaven_freezer.jpeg"
                alt="Steel and gold-finished mortuary freezer boxes on rent at the Heaven Funeral Services showroom in Wayanad"
                fill
                sizes="(max-width: 1024px) 92vw, 42vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* ——— FAQ ————————————————————————————————————————————————— */}
        <section className="bg-[#fbfaf7] py-24 lg:py-32">
          <div className="section-shell">
            <Reveal>
              <SectionHeading
                eyebrow="Coffin questions"
                title="What families ask us about coffins."
                description="Cost, sizes, delivery time, and what happens if nobody can be spared to come and look. Straight answers to the ones that come up on the phone every week."
              />
            </Reveal>

            <div className="mt-14 grid gap-3 lg:mt-18 lg:grid-cols-2 lg:gap-4">
              {coffinFaqs.map((faq, index) => (
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
          </div>
        </section>

        {/* ——— Visit / call ————————————————————————————————————————— */}
        <section className="bg-[#eef3f1] py-20 lg:py-24">
          <div className="section-shell">
            <Reveal>
              <SectionHeading
                eyebrow="Come and see them"
                title="Two shops, both open at any hour."
                align="center"
              />
            </Reveal>

            <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
              {locations.map((location, index) => (
                <Reveal key={location.id} delay={index * 0.08}>
                  <div className="flex h-full flex-col rounded-[1.4rem] border border-[#d9e3df] bg-white p-7 shadow-[0_14px_45px_rgba(23,58,66,0.05)]">
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#8b6b3c]">
                      {location.region}
                    </p>
                    <h3 className="display-font mt-3 text-2xl leading-tight text-[#19373e]">
                      {location.label}
                    </h3>
                    <div className="mt-4 flex items-start gap-3 text-sm leading-6 text-[#65757a]">
                      <MapPin
                        className="mt-0.5 size-4 shrink-0 text-[#b08d57]"
                        aria-hidden="true"
                      />
                      <address className="not-italic">
                        {location.streetAddress}, {location.taluk}
                        <br />
                        {location.district}, {location.addressRegion}{" "}
                        {location.postalCode}
                      </address>
                    </div>
                    <p className="mt-3 flex items-center gap-3 text-sm text-[#65757a]">
                      <Clock3
                        className="size-4 shrink-0 text-[#b08d57]"
                        aria-hidden="true"
                      />
                      {siteConfig.availability}
                    </p>
                    <p className="mt-5 border-t border-[#eaefec] pt-5 text-sm leading-6 text-[#69787a]">
                      {location.description}
                    </p>
                    <a
                      href={siteConfig.phoneHref}
                      className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#193f47] px-5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#24515a]"
                    >
                      <PhoneCall className="size-4" aria-hidden="true" />
                      {siteConfig.phoneDisplay}
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-7 text-[#69787a]">
                Cannot travel? Send a message on{" "}
                <a
                  href={siteConfig.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#8b6b3c] underline decoration-[#d4b678] underline-offset-4 transition-colors hover:text-[#193f47]"
                >
                  WhatsApp
                </a>{" "}
                and we will send photographs of what is on the floor right now,
                at either shop.
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
