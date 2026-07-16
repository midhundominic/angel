"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function VanGraphic() {
  return (
    <svg viewBox="0 0 118 58" className="h-auto w-24 sm:w-28" fill="none">
      <path
        d="M16 17c0-5.5 4.5-10 10-10h47c5.5 0 10 4.5 10 10v3h10.5c3.3 0 6.2 1.8 7.8 4.7l7.6 14.1c.7 1.3 1.1 2.8 1.1 4.3V47H10V23c0-3.3 2.7-6 6-6Z"
        fill="#F7F4ED"
      />
      <path
        d="M83 25h10.2c1.6 0 3.1.9 3.8 2.3l4.8 9.2H83V25Z"
        fill="#9BB2B5"
      />
      <path d="M25 16h47v18H25z" fill="#DCE8E6" />
      <path d="M57 16h2v18h-2z" fill="#B5C8C7" />
      <path d="M16 40h94v7H16z" fill="#1B424A" />
      <path d="M7 45h105v4H7z" fill="#B08D57" />
      <circle cx="31" cy="48" r="8" fill="#17363D" />
      <circle cx="31" cy="48" r="3" fill="#B7C5C4" />
      <circle cx="91" cy="48" r="8" fill="#17363D" />
      <circle cx="91" cy="48" r="3" fill="#B7C5C4" />
      <path d="M17 27h5M105 41h5" stroke="#D4B678" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function TransportJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const vanLeft = useTransform(scrollYProgress, [0.12, 0.88], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden border-y border-white/10 bg-[#173940] py-20 text-white sm:py-24"
      aria-label="A coordinated transport journey"
    >
      <div className="section-shell">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.23em] text-[#d7bc84]">
              One coordinated journey
            </p>
            <h2 className="display-font mt-3 max-w-2xl text-3xl tracking-[-0.03em] text-white sm:text-4xl">
              From first call to careful arrival.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/58">
            Every handoff is approached with discretion, timely updates, and respect
            for the people who place their trust in us.
          </p>
        </div>

        <div className="relative mt-16 h-28 sm:mt-20">
          <div
            className="absolute inset-x-0 top-[58px] h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 right-24 sm:right-28" aria-hidden="true">
            <motion.div
              className="absolute left-0 top-0 z-10"
              style={reduceMotion ? { left: "50%" } : { left: vanLeft }}
            >
              <VanGraphic />
            </motion.div>
          </div>

          <div className="absolute inset-x-0 top-[51px] flex justify-between" aria-hidden="true">
            {["Ready", "Coordinated", "Arrived with care"].map((label) => (
              <div key={label} className="flex flex-col items-center gap-3">
                <span className="size-3 rounded-full border-2 border-[#d4b678] bg-[#173940]" />
                <span className="hidden text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-white/45 sm:block">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
