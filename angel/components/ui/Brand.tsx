import Image from "next/image";
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
        className={`relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-full border bg-white transition-transform duration-500 group-hover:rotate-6 ${
          inverse ? "border-white/25" : "border-[#b9955b]/35"
        }`}
        aria-hidden="true"
      >
        <Image
          src="/logo.jpeg"
          alt=""
          width={44}
          height={44}
          className="size-full scale-[1.18] object-cover"
        />
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
