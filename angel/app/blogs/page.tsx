import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, PhoneCall } from "lucide-react";
import { BlogList } from "@/components/blog/BlogList";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageHero } from "@/components/layout/PageHero";
import { PageSchema, breadcrumbNode } from "@/components/seo/PageSchema";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { blogPosts, formatPostDate } from "@/data/blog";
import { siteConfig } from "@/data/site";

const PATH = "/blogs";

const TITLE = "Funeral Service Guides & Our Work in Wayanad";

const DESCRIPTION =
  "Plain guides from Heaven Funeral Services in Wayanad — what to do in the first hour after a death, freezer box hire, choosing a coffin, and long-distance transport home.";

export const metadata: Metadata = {
  title: "Blog — Funeral Guides for Wayanad",
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  keywords: [
    "funeral services Wayanad blog",
    "what to do after a death in Kerala",
    "dead body freezer box Wayanad",
    "coffin shop Wayanad",
    "hearse van Wayanad",
    "long distance dead body transport Kerala",
    "Christian funeral services Wayanad",
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
        url: "/images/blog/funeral-ceremony.jpeg",
        width: 1600,
        height: 721,
        alt: "Heaven Funeral Services hearse van outside a parish church in Wayanad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/blog/funeral-ceremony.jpeg"],
  },
};

export default function BlogIndexPage() {
  const crumbs = [
    { label: "Home", path: "/" },
    { label: "Blog", path: PATH },
  ];
  const featured = blogPosts[0];

  return (
    <>
      <PageSchema
        nodes={[
          breadcrumbNode(crumbs),
          {
            "@type": "Blog",
            "@id": `${siteConfig.url}${PATH}#blog`,
            url: `${siteConfig.url}${PATH}`,
            name: TITLE,
            description: DESCRIPTION,
            inLanguage: "en-IN",
            isPartOf: { "@id": `${siteConfig.url}/#website` },
            publisher: { "@id": `${siteConfig.url}/#organization` },
            breadcrumb: { "@id": `${siteConfig.url}${PATH}#breadcrumb` },
            blogPost: blogPosts.map((post) => ({
              "@type": "BlogPosting",
              "@id": `${siteConfig.url}${PATH}/${post.slug}#article`,
              headline: post.title,
              description: post.description,
              url: `${siteConfig.url}${PATH}/${post.slug}`,
              datePublished: post.date,
              image: `${siteConfig.url}${post.cover.src}`,
              author: { "@id": `${siteConfig.url}/#organization` },
            })),
          },
        ]}
      />

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />

      <main id="main-content">
        <PageHero
          eyebrow="Notes & guides"
          title="What we have learned, written down plainly."
          description="Most people arrange a funeral once or twice in a lifetime, at the worst possible moment, with no idea of the order things happen in. These are the answers we give on the phone every week — set down here so you can read them before you have to ask."
          crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
          meta={[
            `${blogPosts.length} articles`,
            "Written for Wayanad",
            "No jargon",
          ]}
          image={{
            src: "/images/blog/funeral-ceremony.jpeg",
            alt: "Heaven Funeral Services hearse van at a parish church in Wayanad during a Christian funeral service",
          }}
        />

        {/* ——— Featured ———————————————————————————————————————————— */}
        <section className="bg-[#fbfaf7] py-20 lg:py-28">
          <div className="section-shell">
            <Reveal>
              <Link
                href={`/blogs/${featured.slug}`}
                className="group grid overflow-hidden rounded-[1.75rem] border border-[#dfe6e3] bg-white shadow-[0_18px_55px_rgba(23,58,66,0.06)] transition-[border-color,box-shadow] duration-300 hover:border-[#cdbb98] hover:shadow-[0_28px_70px_rgba(23,58,66,0.12)] lg:grid-cols-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#e7edea] lg:aspect-auto lg:min-h-[420px]">
                  <Image
                    src={featured.cover.src}
                    alt={featured.cover.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 92vw, 46vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-[#d9bd83] px-3.5 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#14343b]">
                    Latest
                  </span>
                </div>

                <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                  <div className="flex items-center gap-3 text-[0.72rem] text-[#93a1a1]">
                    <span className="font-semibold uppercase tracking-[0.16em] text-[#8b6b3c]">
                      {featured.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={featured.date}>
                      {formatPostDate(featured.date)}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="size-3.5" aria-hidden="true" />
                      {featured.readingMinutes} min
                    </span>
                  </div>

                  <h2 className="display-font mt-5 text-balance text-[2rem] leading-[1.12] tracking-[-0.03em] text-[#19373e] transition-colors group-hover:text-[#8b6b3c] sm:text-[2.35rem]">
                    {featured.title}
                  </h2>
                  <p className="mt-5 text-[1rem] leading-8 text-[#69787a]">
                    {featured.excerpt}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#8b6b3c]">
                    Read the article
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ——— All posts ——————————————————————————————————————————— */}
        <section className="bg-[#eef3f1] py-20 lg:py-28">
          <div className="section-shell">
            <Reveal>
              <SectionHeading
                eyebrow="Everything we have written"
                title="Guides for families, and notes on the work."
                description="Two kinds of piece: practical answers to what people search for at two in the morning, and accounts of how the work actually runs at the parishes we serve."
                align="center"
              />
            </Reveal>

            <BlogList />
          </div>
        </section>

        {/* ——— CTA —————————————————————————————————————————————————— */}
        <section className="bg-[#14343b] py-20 text-white lg:py-24">
          <div className="section-shell text-center">
            <h2 className="display-font mx-auto max-w-2xl text-balance text-[2.1rem] leading-[1.12] tracking-[-0.03em] sm:text-[2.5rem]">
              If you are reading this because it has already happened — call us.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[1.01rem] leading-8 text-white/65">
              Someone answers at every hour of every day, including Sundays and
              festival days. You do not need to have decided anything before
              you ring.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[#d9bd83] px-6 text-sm font-semibold text-[#14343b] transition-all hover:-translate-y-0.5 hover:bg-white"
              >
                <PhoneCall className="size-[17px]" aria-hidden="true" />
                {siteConfig.phoneDisplay}
              </a>
              <Link
                href="/coffin-boxes"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition-colors hover:border-[#d4b678] hover:text-[#dec38b]"
              >
                See the coffin range
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
