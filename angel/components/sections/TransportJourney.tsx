"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { HeartHandshake, PhoneCall, Route, type LucideIcon } from "lucide-react";
import { useRef, useState } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Step = {
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    label: "Ready",
    title: "Prepared before the first mile.",
    description:
      "The moment your call ends, the vehicle is staged—cleaned, equipped with cold-storage support, and checked so nothing is left to chance.",
    icon: PhoneCall,
  },
  {
    label: "Coordinated",
    title: "Guided by calm coordination.",
    description:
      "Dispatch stays in quiet contact with the family, hospital, and parish so timing, route, and every handoff remain clear along the way.",
    icon: Route,
  },
  {
    label: "Arrived with care",
    title: "Received with dignity.",
    description:
      "Arrival is unhurried and discreet. Our team assists with placement and remains present until everything is respectfully settled.",
    icon: HeartHandshake,
  },
];

/**
 * Side profile of the Heaven fleet van — white box body, tall cab, large
 * display window with green curtains, amber markers. If you export the
 * uploaded render as a transparent PNG, drop it at
 * public/images/journey/van.png and swap this SVG for a next/image.
 */
function VanGraphic() {
  return (
    <svg
      viewBox="0 0 230 120"
      className="h-auto w-36 drop-shadow-[0_18px_22px_rgba(4,16,19,0.45)] sm:w-48 lg:w-56"
      fill="none"
      aria-hidden="true"
    >
      {/* box body */}
      <path
        d="M14 26c0-4.4 3.6-8 8-8h116c4.4 0 8 3.6 8 8v66H14V26Z"
        fill="#FDFDFB"
      />
      {/* cab */}
      <path
        d="M146 30h32.5c3 0 5.8 1.5 7.5 4l14.6 21.6c1.6 2.3 2.4 5 2.4 7.8V92h-57V30Z"
        fill="#FDFDFB"
      />
      {/* cab roof blend */}
      <path d="M146 18h22c6 0 10.5 3.4 12.6 8.4l1.4 3.6h-36V18Z" fill="#F3F4F1" />
      {/* windshield */}
      <path
        d="M154 34h22.6c1.7 0 3.2.8 4.1 2.2l11 16.8h-37.7V34Z"
        fill="#25454d"
      />
      <path
        d="M155.5 35.5h20.4c1.1 0 2.2.6 2.8 1.5l9.6 14.5h-32.8v-16Z"
        fill="#3d626b"
      />
      {/* side display window with curtains */}
      <rect x="24" y="28" width="106" height="44" rx="4" fill="#152e33" />
      <rect x="26" y="30" width="102" height="40" rx="3" fill="#1d3a40" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`M${31 + i * 17} 30c2.5 6 2.5 14 0 20s-2.5 14 0 20`}
          stroke={i % 2 ? "#4c8a58" : "#5ea06b"}
          strokeWidth="7"
          strokeLinecap="round"
        />
      ))}
      <rect x="24" y="28" width="106" height="44" rx="4" stroke="#c9d2d0" strokeWidth="1.5" />
      {/* trim + skirt */}
      <path d="M14 78h189v8H14z" fill="#e8eae6" />
      <path d="M14 86h189v8H14z" fill="#1B424A" />
      <path d="M8 92h216v6H8z" fill="#B08D57" />
      {/* amber markers */}
      {[30, 66, 102].map((x) => (
        <rect key={x} x={x} y="80.5" width="9" height="3.5" rx="1.75" fill="#e8a23d" />
      ))}
      <rect x="20" y="21" width="10" height="3" rx="1.5" fill="#e8a23d" />
      <rect x="124" y="21" width="10" height="3" rx="1.5" fill="#e8a23d" />
      {/* door line + handle */}
      <path d="M146 30v62" stroke="#d5dad7" strokeWidth="1.5" />
      <rect x="150" y="60" width="12" height="3.5" rx="1.75" fill="#9fb0ae" />
      {/* headlight + bumper */}
      <path d="M199 62h-10c-1.6 0-2.8 1.6-2.3 3.1l1.6 5c.4 1.1 1.4 1.9 2.6 1.9h8.1V62Z" fill="#f0e6c8" />
      <path d="M186 92h20c2.2 0 4-1.8 4-4v-8c0-2.2-1.8-4-4-4h-2v16h-18Z" fill="#2a3335" />
      {/* wheels */}
      <circle cx="52" cy="98" r="15" fill="#10262b" />
      <circle cx="52" cy="98" r="8" fill="#3c5257" />
      <circle cx="52" cy="98" r="3.5" fill="#b7c5c4" />
      <circle cx="172" cy="98" r="15" fill="#10262b" />
      <circle cx="172" cy="98" r="8" fill="#3c5257" />
      <circle cx="172" cy="98" r="3.5" fill="#b7c5c4" />
      {/* motion whiskers */}
      <path
        d="M2 46h9M0 60h13M4 74h9"
        stroke="#d4b678"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  );
}

export function TransportJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const vanLeft = useTransform(scrollYProgress, [0.04, 0.96], ["0%", "100%"]);
  const roadProgress = useTransform(scrollYProgress, [0.04, 0.96], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = value < 1 / 3 ? 0 : value < 2 / 3 ? 1 : 2;
    if (next !== activeStep) setActiveStep(next);
  });

  const step = steps[activeStep];
  const StepIcon = step.icon;

  return (
    <section
      ref={sectionRef}
      aria-label="A coordinated transport journey"
      className={reduceMotion ? "" : "relative h-[320vh]"}
    >
      <div
        className={`overflow-hidden border-y border-white/10 bg-[#173940] text-white ${
          reduceMotion
            ? "py-24 sm:py-32"
            : "sticky top-0 flex min-h-[100svh] flex-col justify-center py-24"
        }`}
      >
        {/* ambient washes */}
        <div
          className="pointer-events-none absolute -left-40 top-[-12rem] size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(212,182,120,0.1),transparent_66%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-48 bottom-[-14rem] size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),transparent_66%)]"
          aria-hidden="true"
        />

        <div className="section-shell relative w-full">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.23em] text-[#d7bc84]">
                One coordinated journey
              </p>
              <h2 className="display-font mt-4 max-w-2xl text-4xl tracking-[-0.03em] text-white sm:text-5xl">
                From first call to careful arrival.
              </h2>
            </div>
            <p
              className="text-sm font-semibold tabular-nums tracking-[0.2em] text-white/40"
              aria-hidden="true"
            >
              0{activeStep + 1} / 0{steps.length}
            </p>
          </div>

          {/* road + van */}
          <div className="relative mt-20 h-40 sm:mt-24 sm:h-48">
            <div
              className="absolute inset-x-0 top-[104px] h-px bg-white/20 sm:top-[128px]"
              aria-hidden="true"
            />
            <motion.div
              className="absolute inset-x-0 top-[104px] h-[2px] origin-left bg-gradient-to-r from-[#b08d57] via-[#d4b678] to-[#d4b678] sm:top-[128px]"
              style={reduceMotion ? { scaleX: 1 } : { scaleX: roadProgress }}
              aria-hidden="true"
            />

            <div
              className="absolute inset-y-0 left-0 right-36 sm:right-48 lg:right-56"
              aria-hidden="true"
            >
              <motion.div
                className="absolute top-0"
                style={reduceMotion ? { left: "50%" } : { left: vanLeft }}
              >
                <VanGraphic />
              </motion.div>
            </div>

            <div
              className="absolute inset-x-0 top-[97px] flex justify-between sm:top-[121px]"
              aria-hidden="true"
            >
              {steps.map((item, index) => {
                const reached = reduceMotion || index <= activeStep;
                return (
                  <div key={item.label} className="flex flex-col items-center gap-3">
                    <span
                      className={`size-3.5 rounded-full border-2 transition-all duration-500 ${
                        reached
                          ? "border-[#d4b678] bg-[#d4b678] shadow-[0_0_0_6px_rgba(212,182,120,0.18)]"
                          : "border-white/35 bg-[#173940]"
                      }`}
                    />
                    <span
                      className={`text-[0.6rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-500 sm:text-[0.66rem] ${
                        reached ? "text-[#d7bc84]" : "text-white/40"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* step narrative */}
          {reduceMotion ? (
            <div className="mt-16 grid gap-10 sm:grid-cols-3">
              {steps.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label}>
                    <span className="grid size-12 place-items-center rounded-xl bg-white/10 text-[#d4b678]">
                      <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <h3 className="display-font mt-5 text-2xl tracking-[-0.02em] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-7 text-white/58">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-14 min-h-[13rem] sm:mt-16 sm:min-h-[11rem]" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="grid items-start gap-6 sm:grid-cols-[auto_1fr] sm:gap-8"
                >
                  <span className="grid size-14 place-items-center rounded-2xl bg-white/10 text-[#d4b678] ring-1 ring-white/15">
                    <StepIcon className="size-6" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="display-font max-w-2xl text-3xl leading-[1.12] tracking-[-0.025em] text-white sm:text-4xl">
                      {step.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-[0.98rem] leading-8 text-white/62">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
