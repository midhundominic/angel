"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryImages } from "@/data/site";

const galleryLayout = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
  "md:col-span-7",
  "md:col-span-5",
];

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const closeLightbox = () => {
    setSelectedIndex(null);
    window.requestAnimationFrame(() => previousFocusRef.current?.focus());
  };

  const showPrevious = () => {
    setSelectedIndex((index) =>
      index === null ? 0 : (index - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  const showNext = () => {
    setSelectedIndex((index) =>
      index === null ? 0 : (index + 1) % galleryImages.length,
    );
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
  }, [selectedIndex]);

  const selectedImage =
    selectedIndex === null ? null : galleryImages[selectedIndex];

  return (
    <section id="gallery" className="scroll-mt-24 bg-[#eef3f1] py-24 lg:py-32">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="A closer look"
            title="Our vehicle, prepared with care."
            description="A closer look at the purpose-built vehicle used by Heaven Funeral Services for dignified, private, and carefully coordinated transport."
            align="center"
          />
        </Reveal>

        <div className="mt-14 grid gap-4 md:auto-rows-[260px] md:grid-cols-12 lg:mt-20">
          {galleryImages.map((image, index) => (
            <Reveal
              key={image.src}
              className={`min-h-[290px] ${galleryLayout[index]}`}
              delay={(index % 3) * 0.06}
            >
              <motion.button
                type="button"
                onClick={(event) => {
                  previousFocusRef.current = event.currentTarget;
                  setSelectedIndex(index);
                }}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                className="group relative size-full overflow-hidden rounded-[1.35rem] bg-[#cfdad7] text-left shadow-[0_14px_45px_rgba(23,58,66,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b793f] focus-visible:ring-offset-4 focus-visible:ring-offset-[#eef3f1]"
                aria-label={`Open image: ${image.title}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={
                    index === 0 || index === 4 || index === 5
                      ? "(max-width: 768px) 92vw, 70vw"
                      : "(max-width: 768px) 92vw, 42vw"
                  }
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.055]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102e35]/85 via-[#102e35]/5 to-transparent transition-colors group-hover:from-[#102e35]/92" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 sm:p-7">
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#dcc58f]">
                      {image.category}
                    </p>
                    <h3 className="display-font mt-2 text-2xl leading-tight text-white">
                      {image.title}
                    </h3>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all group-hover:scale-105 group-hover:bg-white group-hover:text-[#193f47]">
                    <Expand className="size-[18px]" aria-hidden="true" />
                  </span>
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-xs leading-6 text-[#7a8889]">
            Real service photography of the Heaven Funeral Services vehicle in
            Payyampally and Chennalode.
          </p>
        </Reveal>
      </div>

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
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#07191d]/92 p-4 backdrop-blur-md sm:p-8"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeLightbox();
            }}
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-[min(82vh,850px)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#102d34] shadow-2xl"
            >
              <div className="relative min-h-0 flex-1">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  sizes="95vw"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex items-center justify-between gap-5 border-t border-white/10 px-5 py-4 text-white sm:px-7">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{selectedImage.title}</p>
                  <p className="mt-1 text-xs text-white/45">
                    {selectedImage.category}
                  </p>
                </div>
                <p className="shrink-0 text-xs text-white/45">
                  {selectedIndex + 1} / {galleryImages.length}
                </p>
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
