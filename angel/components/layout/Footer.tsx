import { ArrowUpRight, Clock3, MapPin, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Brand } from "@/components/ui/Brand";
import { navigation, siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-[#14343b] text-white">
      <div className="section-shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.35fr_0.65fr_0.9fr] lg:gap-16 lg:py-20">
        <div>
          <Brand inverse />
          <p className="mt-6 max-w-md text-sm leading-7 text-white/58">
            Calm, professional decedent transport coordination for care teams,
            funeral professionals, and families—handled with dignity at every step.
          </p>
          <Link
            href="#contact"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#dec38b] transition-colors hover:text-white"
          >
            Request transport
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#dec38b]">
            Quick links
          </h2>
          <nav className="mt-5 flex flex-col gap-3" aria-label="Footer navigation">
            {navigation.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-fit text-sm text-white/62 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#dec38b]">
            Dispatch
          </h2>
          <ul className="mt-5 space-y-4 text-sm text-white/62">
            <li>
              <a
                href={siteConfig.phoneHref}
                className="flex items-start gap-3 transition-colors hover:text-white"
              >
                <PhoneCall className="mt-0.5 size-4 shrink-0 text-[#dec38b]" aria-hidden="true" />
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock3 className="mt-0.5 size-4 shrink-0 text-[#dec38b]" aria-hidden="true" />
              {siteConfig.availability}
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#dec38b]" aria-hidden="true" />
              {siteConfig.serviceArea}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section-shell flex flex-col gap-3 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Respect. Discretion. Care.</p>
        </div>
      </div>
    </footer>
  );
}
