"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, PhoneCall, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { navigation, siteConfig } from "@/data/site";
import { Brand } from "@/components/ui/Brand";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const [visibleSection, setVisibleSection] = useState<string | null>(null);
  const onHome = pathname === "/";

  /**
   * The ids the hash links point at, plus the hero, which "Home" stands for.
   * Read from `navigation` so a new anchor item is picked up automatically.
   */
  const sectionIds = useMemo(
    () => [
      "home",
      ...navigation
        .filter((item) => item.href.includes("#"))
        .map((item) => item.href.split("#")[1]),
    ],
    [],
  );

  /**
   * Scroll spy for the in-page links. Picks the section whose top sits closest
   * above a line just under the header — which is the one the reader is looking
   * at. Measuring position rather than walking the list in order matters,
   * because the nav lists Gallery before About while the page renders them the
   * other way round.
   */
  useEffect(() => {
    if (!onHome) return;

    const onScroll = () => {
      // Generous on purpose. A direct scroll leaves the target at ~96px, but
      // Lenis lands an anchor click nearer 290px, and a line tight enough to
      // exclude that would leave the clicked item unlit — the exact thing this
      // spy exists to show.
      const line = Math.max(200, window.innerHeight * 0.4);
      let current: string | null = null;
      let closest = -Infinity;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        const { top } = element.getBoundingClientRect();
        if (top <= line && top > closest) {
          closest = top;
          current = id;
        }
      }

      // The last section is often too short to ever cross the line, so hitting
      // the bottom of the page counts as reaching it.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) {
        const last = sectionIds
          .map((id) => document.getElementById(id))
          .filter((element): element is HTMLElement => element !== null)
          .sort((a, b) => a.offsetTop - b.offsetTop)
          .at(-1);
        if (last) current = last.id;
      }

      setVisibleSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onHome, sectionIds]);

  /**
   * On the homepage the active item is whichever section is in view; elsewhere
   * it is the route. A hash link never lights up from another page — saying
   * "Services" while the reader is on /blogs would be a lie about where they
   * are.
   */
  const isActive = (href: string) => {
    if (href.includes("#")) {
      return onHome && visibleSection === href.split("#")[1];
    }
    if (href === "/") {
      return onHome && (visibleSection === null || visibleSection === "home");
    }
    return pathname.startsWith(href);
  };

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

  /**
   * The transparent state only works over the homepage hero, which is light.
   * Every inner page opens on the deep-teal PageHero, where dark-on-dark nav
   * links are unreadable — so those routes get the solid header from the top.
   */
  const solid = scrolled || menuOpen || pathname !== "/";

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
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-full px-3.5 py-3 text-[0.82rem] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b08d57] xl:px-4 ${
                isActive(item.href)
                  ? "bg-white text-[#183b43] shadow-[0_6px_18px_rgba(22,53,60,0.08)]"
                  : "text-[#435c61] hover:bg-white/70 hover:text-[#183b43]"
              }`}
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
            href="/#contact"
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
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`border-b border-[#e6ebe8] px-2 py-4 text-base font-medium last:border-0 focus-visible:outline-none focus-visible:text-[#8b6b3c] ${
                    isActive(item.href) ? "text-[#8b6b3c]" : "text-[#294a51]"
                  }`}
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
                  href="/#contact"
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

