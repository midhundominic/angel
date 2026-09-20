"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryImages } from "@/data/site";

/**
 * Filter chips are derived from `group` in data/site.ts in first-seen order, so
 * adding a photograph with a new group adds a chip without touching this file.
 *
 * The grid is a dense mosaic: portrait originals take a taller tile, landscape
 * ones a shorter one, and the first tile of whatever is showing is promoted to
 * a wide feature. `grid-flow-dense` backfills the gaps that leaves.
 */
const GROUPS = ["All", ...Array.from(new Set(galleryImages.map((i) => i.group)))];

export function Gallery() {
  const [activeGroup, setActiveGroup] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const visible = useMemo(
    () =>
      activeGroup === "All"
        ? galleryImages
        : galleryImages.filter((image) => image.group === activeGroup),
    [activeGroup],
  );

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    window.requestAnimationFrame(() => previousFocusRef.current?.focus());
  }, []);

  const showPrevious = useCallback(() => {
    setSelectedIndex((index) =>
      index === null ? 0 : (index - 1 + visible.length) % visible.length,
    );
  }, [visible.length]);

  const showNext = useCallback(() => {
    setSelectedIndex((index) =>
      index === null ? 0 : (index + 1) % visible.length,
    );
  }, [visible.length]);

  // Closing the lightbox alongside the filter change matters: the selected
  // index points into `visible`, and a shorter list would leave it dangling.
  const selectGroup = (group: string) => {
    setActiveGroup(group);
    setSelectedIndex(null);
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedIndex, closeLightbox, showPrevious, showNext]);

  const selectedImage = selectedIndex === null ? null : visible[selectedIndex];

  return (
    <section id="gallery" className="scroll-mt-24 bg-[#eef3f1] py-24 lg:py-32">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="A closer look"
            title="Our coffins, freezer boxes, shops and fleet."
            description="Real photography from the Heaven Funeral Services shops at Payyampally and Chennalode — the coffins and crosses we keep in stock, the mortuary freezer boxes that go out on rent, and the purpose-built vehicles we use for dignified transport across Wayanad."
            align="center"
          />
        </Reveal>

        {/* ——— Filters ————————————————————————————————————————————— */}
        <Reveal delay={0.08}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {GROUPS.map((group) => {
              const isActive = group === activeGroup;
              const count =
                group === "All"
                  ? galleryImages.length
                  : galleryImages.filter((image) => image.group === group).length;
              return (
                <button
                  key={group}
                  type="button"
                  onClick={() => selectGroup(group)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[0.82rem] font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b08d57] focus-visible:ring-offset-2 focus-visible:ring-offset-[#eef3f1] sm:px-5 ${
                    isActive
                      ? "border-[#193f47] bg-[#193f47] text-white shadow-[0_10px_26px_rgba(25,63,71,0.18)]"
                      : "border-[#cfdad7] bg-white/70 text-[#4e6367] hover:border-[#cdbb98] hover:bg-white"
                  }`}
                >
                  {group}
                  <span
                    className={`text-[0.7rem] tabular-nums ${
                      isActive ? "text-[#dec38b]" : "text-[#9aa8a7]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ——— Mosaic —————————————————————————————————————————————— */}
        <motion.div
          layout={!reduceMotion}
          className="mt-10 grid auto-rows-[92px] grid-flow-row-dense grid-cols-2 gap-3 sm:auto-rows-[105px] sm:grid-cols-3 sm:gap-4 lg:auto-rows-[118px] lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((image, index) => {
              const feature = index === 0;
              const span = feature
                ? "row-span-3 sm:col-span-2 sm:row-span-4"
                : image.portrait
                  ? "row-span-4"
                  : "row-span-3";

              return (
                <motion.button
                  key={image.src}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.42,
                    delay: reduceMotion ? 0 : Math.min(index, 8) * 0.035,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  type="button"
                  onClick={(event) => {
                    previousFocusRef.current = event.currentTarget;
                    setSelectedIndex(index);
                  }}
                  className={`group relative overflow-hidden rounded-[1.1rem] bg-[#cfdad7] text-left shadow-[0_14px_45px_rgba(23,58,66,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b793f] focus-visible:ring-offset-4 focus-visible:ring-offset-[#eef3f1] sm:rounded-[1.35rem] ${span}`}
                  aria-label={`Open image: ${image.title}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={
                      feature
                        ? "(max-width: 640px) 92vw, (max-width: 1024px) 64vw, 46vw"
                        : "(max-width: 640px) 46vw, (max-width: 1024px) 32vw, 24vw"
                    }
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102e35]/88 via-[#102e35]/10 to-transparent transition-colors duration-300 group-hover:from-[#102e35]/94" />

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                    <div className="min-w-0">
                      <p className="truncate text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#dcc58f] sm:text-[0.64rem]">
                        {image.category}
                      </p>
                      <h3
                        className={`display-font mt-1.5 leading-tight text-white ${
                          feature ? "text-xl sm:text-2xl" : "text-[1.02rem] sm:text-lg"
                        }`}
                      >
                        {image.title}
                      </h3>
                    </div>
                    <span className="hidden size-10 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:bg-white group-hover:text-[#193f47] sm:grid">
                      <Expand className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-xs leading-6 text-[#7a8889]">
            Showing {visible.length} of {galleryImages.length} photographs
            {activeGroup === "All" ? "" : ` in ${activeGroup.toLowerCase()}`}.
            Every image is our own — the shops, stock, and vehicles at
            Payyampally and Chennalode in Wayanad.
          </p>
        </Reveal>
      </div>

      {/* ——— Lightbox —————————————————————————————————————————————— */}
      <AnimatePresence>
        {selectedImage && selectedIndex !== null ? (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Gallery preview: ${selectedImage.title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.24 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#07191d]/94 p-3 backdrop-blur-md sm:p-8"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeLightbox();
            }}
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-[min(88vh,900px)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#102d34] shadow-2xl"
            >
              <div className="relative min-h-0 flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage.src}
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.2 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={selectedImage.src}
                      alt={selectedImage.alt}
                      fill
                      sizes="95vw"
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="border-t border-white/10 px-4 py-3.5 text-white sm:px-6">
                <div className="flex items-center justify-between gap-5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {selectedImage.title}
                    </p>
                    <p className="mt-1 truncate text-xs text-white/45">
                      {selectedImage.category} · {selectedImage.group}
                    </p>
                  </div>
                  <p className="shrink-0 text-xs tabular-nums text-white/45">
                    {selectedIndex + 1} / {visible.length}
                  </p>
                </div>

                {/* Thumbnail strip — jumps straight to an image instead of
                    stepping through a filter's worth of arrow presses. */}
                <div className="mt-3 hidden gap-2 overflow-x-auto pb-1 sm:flex">
                  {visible.map((thumb, thumbIndex) => (
                    <button
                      key={thumb.src}
                      type="button"
                      onClick={() => setSelectedIndex(thumbIndex)}
                      aria-label={`Show ${thumb.title}`}
                      aria-current={thumbIndex === selectedIndex}
                      className={`relative size-14 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4b678] ${
                        thumbIndex === selectedIndex
                          ? "border-[#d4b678] opacity-100"
                          : "border-white/10 opacity-45 hover:opacity-80"
                      }`}
                    >
                      <Image
                        src={thumb.src}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeLightbox}
                className="absolute right-3 top-3 grid size-11 place-items-center rounded-full border border-white/15 bg-[#0c242a]/70 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-[#173940] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4b678]"
                aria-label="Close gallery preview"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-[#0c242a]/70 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-[#173940] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4b678] sm:left-5"
                aria-label="Show previous image"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={showNext}
                className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-[#0c242a]/70 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-[#173940] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4b678] sm:right-5"
                aria-label="Show next image"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
