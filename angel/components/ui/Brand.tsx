import Link from "next/link";
import { siteConfig } from "@/data/site";

type BrandProps = {
  inverse?: boolean;
};

export function Brand({ inverse = false }: BrandProps) {
  return (
    <Link
      href="#home"
      className="group inline-flex items-center gap-3 rounded-full focus-visible:outline-none"
      aria-label={`${siteConfig.name}, home`}
    >
      <span
        className={`grid size-11 place-items-center rounded-full border transition-transform duration-500 group-hover:rotate-6 ${
          inverse
            ? "border-white/25 bg-white/10 text-[#d4b678]"
            : "border-[#b9955b]/35 bg-[#f4eee2] text-[#896a39]"
        }`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 32 32" className="size-6" fill="none">
          <path
            d="M10 8v16M22 8v16M10 16h12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.5 11.5c3.2.2 5.5 1.3 7 3.4M26.5 11.5c-3.2.2-5.5 1.3-7 3.4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="leading-none">
        <span
          className={`display-font block text-[1.35rem] tracking-[-0.02em] ${
            inverse ? "text-white" : "text-[#19383f]"
          }`}
        >
          {siteConfig.shortName}
        </span>
        <span
          className={`mt-1 block text-[0.57rem] font-semibold uppercase tracking-[0.23em] ${
            inverse ? "text-white/55" : "text-[#687b7e]"
          }`}
        >
          {siteConfig.descriptor}
        </span>
      </span>
    </Link>
  );
}
