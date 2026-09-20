import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MessageCircle,
  PhoneCall,
  Quote,
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageSchema, breadcrumbNode } from "@/components/seo/PageSchema";
import { Reveal } from "@/components/ui/Reveal";
import { blogPosts, formatPostDate, getPost, relatedPosts } from "@/data/blog";
import { siteConfig } from "@/data/site";

type PageProps = { params: Promise<{ slug: string }> };

/** Every post is known at build time, so all of them prerender as static HTML. */
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };

  const url = `${siteConfig.url}/blogs/${post.slug}`;

  return {
    title: post.metaTitle,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      locale: "en_IN",
      siteName: siteConfig.name,
      publishedTime: post.date,
      authors: [siteConfig.name],
      images: [{ url: post.cover.src, alt: post.cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.cover.src],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = relatedPosts(post.slug);
  const crumbs = [
    { label: "Home", path: "/" },
    { label: "Blog", path: "/blogs" },
    { label: post.title, path: `/blogs/${post.slug}` },
  ];

  return (
    <>
      <PageSchema
        nodes={[
          breadcrumbNode(crumbs),
          {
            "@type": "BlogPosting",
            "@id": `${siteConfig.url}/blogs/${post.slug}#article`,
            headline: post.title,
            alternativeHeadline: post.metaTitle,
            description: post.description,
            url: `${siteConfig.url}/blogs/${post.slug}`,
            mainEntityOfPage: `${siteConfig.url}/blogs/${post.slug}`,
            datePublished: post.date,
            dateModified: post.date,
            inLanguage: "en-IN",
            keywords: post.keywords.join(", "),
            articleSection: post.category,
            wordCount: post.sections.reduce(
              (total, section) =>
                total +
                [...(section.paragraphs ?? []), ...(section.list ?? [])]
                  .join(" ")
                  .split(/\s+/).length,
              0,
            ),
            image: {
              "@type": "ImageObject",
              url: `${siteConfig.url}${post.cover.src}`,
              caption: post.cover.alt,
            },
            author: { "@id": `${siteConfig.url}/#organization` },
            publisher: { "@id": `${siteConfig.url}/#organization` },
            isPartOf: { "@id": `${siteConfig.url}/blogs#blog` },
            about: { "@id": `${siteConfig.url}/#organization` },
            breadcrumb: { "@id": `${siteConfig.url}/blogs/${post.slug}#breadcrumb` },
          },
        ]}
      />

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />

      <main id="main-content">
        {/* ——— Article masthead ————————————————————————————————————— */}
        <header className="bg-[#14343b] pt-[104px] text-white lg:pt-[120px]">
          <div className="section-shell py-12 lg:py-16">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/50">
                <li>
                  <Link href="/" className="transition-colors hover:text-[#dec38b]">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/30">
                  /
                </li>
                <li>
                  <Link href="/blogs" className="transition-colors hover:text-[#dec38b]">
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/30">
                  /
                </li>
                <li aria-current="page" className="max-w-full truncate text-white/75">
                  {post.title}
                </li>
              </ol>
            </nav>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-[#d8c08e]">
              {post.category}
            </p>
            <h1 className="display-font mt-4 max-w-4xl text-balance text-[2.35rem] leading-[1.08] tracking-[-0.035em] sm:text-[2.9rem] lg:text-[3.3rem]">
              {post.title}
            </h1>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-8 text-white/65">
              {post.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.8rem] text-white/50">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="size-4 text-[#dec38b]" aria-hidden="true" />
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="size-4 text-[#dec38b]" aria-hidden="true" />
                {post.readingMinutes} min read
              </span>
              <span className="inline-flex items-center gap-2">
                <MessageCircle className="size-4 text-[#dec38b]" aria-hidden="true" />
                {siteConfig.name}
              </span>
            </div>
          </div>

          <div className="section-shell">
            {/* A 21:9 slice out of a 9:20 phone photograph is mostly tarmac,
                so tall originals get a squarer frame and a crop biased just
                below centre — where the vehicle and the signboard sit in all
                three of them. */}
            <div
              className={`relative overflow-hidden rounded-t-[1.75rem] border border-b-0 border-white/10 ${
                post.cover.portrait
                  ? "aspect-[4/3] sm:aspect-[16/9]"
                  : "aspect-[16/9] sm:aspect-[21/9]"
              }`}
            >
              <Image
                src={post.cover.src}
                alt={post.cover.alt}
                fill
                priority
                sizes="(max-width: 1280px) 96vw, 78rem"
                className={`object-cover ${
                  post.cover.portrait ? "object-[center_55%]" : ""
                }`}
              />
            </div>
          </div>
        </header>

        {/* ——— Body ———————————————————————————————————————————————— */}
        <div className="bg-[#fbfaf7] pb-24 pt-16 lg:pb-32 lg:pt-20">
          <div className="section-shell grid gap-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
            <article className="max-w-[44rem]">
              {post.sections.map((section, index) => (
                <Reveal key={section.heading ?? `section-${index}`} y={16}>
                  <section className={index === 0 ? "" : "mt-12"}>
                    {section.heading ? (
                      <h2 className="display-font text-balance text-[1.7rem] leading-[1.2] tracking-[-0.025em] text-[#19373e] sm:text-[1.95rem]">
                        {section.heading}
                      </h2>
                    ) : null}

                    {section.paragraphs?.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 48)}
                        className={`text-[1.05rem] leading-[1.95] text-[#4f6266] ${
                          section.heading ? "mt-5" : "mt-0 first:mt-0"
                        } [&+p]:mt-5`}
                      >
                        {paragraph}
                      </p>
                    ))}

                    {section.list?.length ? (
                      <ul className="mt-6 space-y-3.5">
                        {section.list.map((item) => (
                          <li
                            key={item.slice(0, 48)}
                            className="flex gap-4 text-[1rem] leading-[1.8] text-[#4f6266]"
                          >
                            <span
                              className="mt-[0.72rem] size-1.5 shrink-0 rounded-full bg-[#b08d57]"
                              aria-hidden="true"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {section.callout ? (
                      <aside className="mt-8 flex gap-5 rounded-[1.25rem] border border-[#e3d9c2] bg-[#f8f4ea] p-6 sm:p-7">
                        <Quote
                          className="size-6 shrink-0 text-[#b08d57]"
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                        <p className="text-[0.98rem] leading-8 text-[#5c5138]">
                          {section.callout}
                        </p>
                      </aside>
                    ) : null}
                  </section>
                </Reveal>
              ))}

              <div className="mt-14 border-t border-[#e3eae7] pt-8">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#8b6b3c] transition-colors hover:text-[#193f47]"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  All articles
                </Link>
              </div>
            </article>

            {/* ——— Sidebar ————————————————————————————————————————— */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[1.4rem] border border-[#dfe6e3] bg-white p-7 shadow-[0_14px_45px_rgba(23,58,66,0.05)]">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#8b6b3c]">
                  Need help now
                </p>
                <p className="display-font mt-3 text-[1.5rem] leading-tight text-[#19373e]">
                  Someone answers, at any hour.
                </p>
                <p className="mt-4 text-sm leading-7 text-[#69787a]">
                  Coffins, mortuary freezer boxes, hearse vans, and long-distance
                  transport — from our shops at Payyampally and Chennalode,
                  24 hours a day.
                </p>
                <div className="mt-6 space-y-2.5">
                  {siteConfig.phoneNumbers.map((phone, index) => (
                    <a
                      key={phone.href}
                      href={phone.href}
                      className={`flex min-h-11 items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                        index === 0
                          ? "bg-[#193f47] text-white hover:bg-[#24515a]"
                          : "border border-[#d9e3df] text-[#294a51] hover:border-[#b08d57]"
                      }`}
                    >
                      <PhoneCall className="size-4" aria-hidden="true" />
                      {phone.display}
                    </a>
                  ))}
                  <a
                    href={siteConfig.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#d9e3df] text-sm font-semibold text-[#294a51] transition-all hover:-translate-y-0.5 hover:border-[#b08d57]"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    WhatsApp
                  </a>
                </div>
              </div>

              <div className="mt-4 overflow-hidden rounded-[1.4rem] border border-[#dfe6e3] bg-white shadow-[0_14px_45px_rgba(23,58,66,0.05)]">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/images/showroom/heaven-coffin-racks.jpg"
                    alt="Racks of handcrafted wooden and decorated coffins for sale in Wayanad"
                    fill
                    sizes="20rem"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="display-font text-[1.3rem] leading-tight text-[#19373e]">
                    Coffin boxes in Wayanad
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-[#69787a]">
                    Six ranges on the floor at both shops, with child and
                    oversize sizes and same-day delivery across the district.
                  </p>
                  <Link
                    href="/coffin-boxes"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#8b6b3c] transition-colors hover:text-[#193f47]"
                  >
                    See the range
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* ——— Related ————————————————————————————————————————————— */}
        {related.length ? (
          <section className="bg-[#eef3f1] py-20 lg:py-24">
            <div className="section-shell">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-[#b08d57]" aria-hidden="true" />
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6b3c]">
                      Keep reading
                    </p>
                  </div>
                  <h2 className="display-font mt-4 text-[2rem] leading-tight tracking-[-0.03em] text-[#18343b]">
                    Other articles
                  </h2>
                </div>
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#8b6b3c] transition-colors hover:text-[#193f47]"
                >
                  View all
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blogs/${item.slug}`}
                    className="group flex gap-5 overflow-hidden rounded-[1.3rem] border border-[#d9e3df] bg-white p-4 shadow-[0_12px_40px_rgba(23,58,66,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#cdbb98] hover:shadow-[0_20px_55px_rgba(23,58,66,0.1)]"
                  >
                    <div className="relative size-24 shrink-0 overflow-hidden rounded-[0.9rem] bg-[#e7edea] sm:size-28">
                      <Image
                        src={item.cover.src}
                        alt={item.cover.alt}
                        fill
                        sizes="7rem"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0 py-1">
                      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#8b6b3c]">
                        {item.category}
                      </p>
                      <h3 className="display-font mt-2 text-[1.2rem] leading-[1.25] text-[#19373e] transition-colors group-hover:text-[#8b6b3c]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[0.72rem] text-[#93a1a1]">
                        {formatPostDate(item.date)} · {item.readingMinutes} min read
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <Footer />
    </>
  );
}
