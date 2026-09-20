import { ChevronRight, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export type Crumb = { label: string; href?: string };

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  crumbs: Crumb[];
  image: { src: string; alt: string };
  /** Small fact chips under the copy, e.g. "Two shops · Wayanad". */
  meta?: string[];
  children?: React.ReactNode;
};

/**
 * The masthead for inner pages. Deep teal so the fixed header reads as solid
 * over it from the first pixel of scroll, and a single h1 — the pages below
 * never render another one.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  image,
  meta,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#14343b] pt-[104px] text-white lg:pt-[120px]">
      <div
        className="pointer-events-none absolute -left-40 top-10 size-[30rem] rounded-full bg-[radial-gradient(circle,rgba(176,141,87,0.18),transparent_68%)]"
        aria-hidden="true"
      />
      <div className="section-shell relative grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
        <div>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/50">
              {crumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="rounded transition-colors hover:text-[#dec38b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4b678]"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white/80">
                      {crumb.label}
                    </span>
                  )}
                  {index < crumbs.length - 1 ? (
                    <ChevronRight className="size-3.5 text-white/30" aria-hidden="true" />
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-7 flex items-center gap-3">
            <span className="h-px w-8 bg-[#d4b678]" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d8c08e]">
              {eyebrow}
            </p>
          </div>

          <h1 className="display-font mt-5 text-balance text-[2.5rem] leading-[1.06] tracking-[-0.035em] sm:text-5xl lg:text-[3.35rem]">
            {title}
          </h1>

          <p className="mt-6 max-w-xl text-[1.03rem] leading-8 text-white/65">
            {description}
          </p>

          {meta?.length ? (
            <ul className="mt-8 flex flex-wrap gap-2">
              {meta.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-medium text-white/70"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[#d9bd83] px-6 text-sm font-semibold text-[#14343b] shadow-[0_14px_34px_rgba(217,189,131,0.22)] transition-all hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4b678] focus-visible:ring-offset-2 focus-visible:ring-offset-[#14343b]"
            >
              <PhoneCall className="size-[17px]" aria-hidden="true" />
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition-colors hover:border-[#d4b678] hover:text-[#dec38b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4b678]"
            >
              Message on WhatsApp
            </a>
          </div>

          {children}
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_32px_80px_rgba(4,20,24,0.45)] lg:aspect-[5/4]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 92vw, 46vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#0b2329]/55 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
          <div className="absolute -bottom-5 left-5 rounded-2xl border border-white/10 bg-[#0f2b31] px-5 py-4 shadow-[0_20px_45px_rgba(4,20,24,0.4)] sm:left-8">
            <p className="display-font text-2xl leading-none text-white">24/7</p>
            <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#dec38b]">
              Both shops, every day
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
