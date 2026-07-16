"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, PhoneCall, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navigation, siteConfig } from "@/data/site";
import { Brand } from "@/components/ui/Brand";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "border-b border-[#dfe6e3] bg-[#fbfaf7]/95 shadow-[0_10px_35px_rgba(22,53,60,0.06)] backdrop-blur-xl"
          : "bg-gradient-to-b from-[#fbfaf7]/90 to-transparent"
      }`}
    >
      <div
        className={`section-shell flex items-center justify-between transition-[height] duration-500 ${
          solid ? "h-[74px]" : "h-[88px]"
        }`}
      >
        <Brand />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-3 text-[0.82rem] font-medium text-[#435c61] transition-colors hover:bg-white/70 hover:text-[#183b43] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b08d57]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={siteConfig.phoneHref}
            className="grid size-11 place-items-center rounded-full border border-[#d8e0dd] text-[#294a51] transition-all hover:border-[#b08d57] hover:bg-white hover:text-[#896a39] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b08d57]"
            aria-label={`Call dispatch at ${siteConfig.phoneDisplay}`}
          >
            <PhoneCall className="size-[18px]" aria-hidden="true" />
          </a>
          <Link
            href="#contact"
            className="rounded-full bg-[#193f47] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(25,63,71,0.16)] transition-all hover:-translate-y-0.5 hover:bg-[#24515a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b08d57] focus-visible:ring-offset-2"
          >
            Request Transport
          </Link>
        </div>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-[#d8e0dd] bg-white/80 text-[#193f47] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b08d57] lg:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="border-t border-[#e2e8e5] bg-[#fbfaf7] px-5 pb-6 pt-3 shadow-xl lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="border-b border-[#e6ebe8] px-2 py-4 text-base font-medium text-[#294a51] last:border-0 focus-visible:outline-none focus-visible:text-[#8b6b3c]"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#cad7d4] text-sm font-semibold text-[#193f47]"
                >
                  <PhoneCall className="size-4" aria-hidden="true" />
                  Call Now
                </a>
                <Link
                  href="#contact"
                  onClick={closeMenu}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#193f47] px-4 text-center text-sm font-semibold text-white"
                >
                  Request Transport
                </Link>
              </div>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

