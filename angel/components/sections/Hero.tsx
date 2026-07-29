"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Clock3, MapPin, PhoneCall, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { siteConfig } from "@/data/site";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const trustPoints = [
  { icon: Clock3, label: "Always reachable", value: siteConfig.availability },
  { icon: MapPin, label: "Service area", value: siteConfig.serviceArea },
  { icon: Truck, label: "Ready fleet", value: "Hearse & cold-storage units on standby" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Pointer position, normalised to [-0.5, 0.5] across the art column.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [4.5, -4.5]), {
    stiffness: 120,
    damping: 18,
  });

  // Per-layer pointer drift: deeper layers move more, selling the depth.
  const driftMainX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 90,
    damping: 20,
  });
  const driftCardX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-16, 16]), {
    stiffness: 90,
    damping: 20,
  });
  const driftCrossX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-24, 24]), {
    stiffness: 90,
    damping: 20,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxMain = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const parallaxCard = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const parallaxCross = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const float = (distance: number, duration: number, delay = 0) =>
    reduceMotion
      ? undefined
      : {
          y: [0, -distance, 0],
          transition: {
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative overflow-hidden bg-[#fbfaf7]"
    >
      {/* Ambient background washes */}
      <div
        className="pointer-events-none absolute -right-52 -top-56 size-[44rem] rounded-full bg-[radial-gradient(circle,rgba(187,164,116,0.16),transparent_66%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-56 bottom-[-14rem] size-[40rem] rounded-full bg-[radial-gradient(circle,rgba(105,151,155,0.12),transparent_66%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#f2f4f0] to-transparent"
        aria-hidden="true"
      />

      <div className="section-shell relative flex min-h-[100svh] flex-col justify-center pb-20 pt-[7.5rem] lg:pb-16 lg:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
          {/* Copy column */}
          <div className="relative">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-[#b08d57]" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6b3c]">
                {siteConfig.name} · Chennalode  · Payyampally 
              </p>
            </motion.div>

            <h1 className="display-font mt-6 text-balance text-[2.7rem] leading-[1.05] tracking-[-0.035em] text-[#18343b] sm:text-6xl lg:text-[4.1rem]">
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={reduceMotion ? false : { y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
                >
                  A dignified farewell,
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-2">
                <motion.span
                  className="block"
                  initial={reduceMotion ? false : { y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
                >
                  arranged with{" "}
                  <span className="relative inline-block text-[#8b6b3c]">
                    quiet care.
                    <motion.span
                      className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-[#d4b678]/70"
                      initial={reduceMotion ? false : { scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.7, delay: 1, ease: EASE }}
                      aria-hidden="true"
                    />
                  </span>
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38, ease: EASE }}
              className="mt-7 max-w-xl text-[1.03rem] leading-8 text-[#647477]"
            >
              From our Payyampally showroom to every doorstep we reach, Heaven
              Funeral Services brings coffins, freezer units, hearse transport,
              and calm coordination together—so your family carries only the
              memories, not the logistics.
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                href="#contact"
                className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-[#193f47] px-7 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(25,63,71,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#24515a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b08d57] focus-visible:ring-offset-2"
              >
                Request Transport
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex min-h-12 items-center gap-3 rounded-full border border-[#d8e0dd] bg-white/70 px-6 py-3 text-sm font-semibold text-[#193f47] backdrop-blur-sm transition-all hover:border-[#b08d57] hover:text-[#8b6b3c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b08d57]"
              >
                <span className="relative grid size-8 place-items-center rounded-full bg-[#edf3f1] text-[#28555d]">
                  <PhoneCall className="size-4" aria-hidden="true" />
                  <span
                    className="absolute inset-0 animate-ping rounded-full bg-[#28555d]/15 motion-reduce:hidden"
                    aria-hidden="true"
                  />
                </span>
                {siteConfig.phoneDisplay}
              </a>
            </motion.div>

            <motion.dl
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.64, ease: EASE }}
              className="mt-12 grid max-w-xl gap-6 border-t border-[#e3e9e6] pt-8 sm:grid-cols-3"
            >
              {trustPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <div key={point.label} className="flex gap-3">
                    <Icon
                      className="mt-0.5 size-[18px] shrink-0 text-[#8b6b3c]"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#7b898a]">
                        {point.label}
                      </dt>
                      <dd className="mt-1 text-[0.8rem] leading-5 text-[#435c61]">
                        {point.value}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </motion.dl>
          </div>

          {/* Layered 2.5D photo composition — desktop */}
          <div
            className="relative hidden h-[600px] select-none lg:block"
            style={{ perspective: 1300 }}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPointer}
          >
            <motion.div
              className="relative size-full"
              style={
                reduceMotion
                  ? undefined
                  : { rotateX, rotateY, transformStyle: "preserve-3d" }
              }
            >
              {/* Slowly turning ornamental ring */}
              <motion.div
                className="absolute right-2 top-8 size-[480px]"
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 480 480" className="size-full">
                  <circle
                    cx="240"
                    cy="240"
                    r="236"
                    fill="none"
                    stroke="#b08d57"
                    strokeOpacity="0.35"
                    strokeWidth="1"
                    strokeDasharray="3 14"
                  />
                  <circle
                    cx="240"
                    cy="240"
                    r="198"
                    fill="none"
                    stroke="#69979b"
                    strokeOpacity="0.22"
                    strokeWidth="1"
                  />
                </svg>
              </motion.div>

              {/* Main card — storefront with branded freezer unit */}
              <motion.div
                className="absolute right-8 top-2 h-[520px] w-[392px]"
                style={reduceMotion ? undefined : { x: driftMainX, y: parallaxMain }}
                initial={reduceMotion ? false : { opacity: 0, y: 34, rotate: 1.5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.95, delay: 0.25, ease: EASE }}
              >
                <div className="relative size-full overflow-hidden rounded-[2rem] bg-[#dfe8e5] shadow-[0_42px_90px_rgba(24,55,62,0.24)] ring-1 ring-white/70">
                  <Image
                    src="/images/showroom/heaven-storefront.jpg"
                    alt="Heaven Funeral Services showroom entrance in Payyampally with a branded mobile freezer unit and coffin displays"
                    fill
                    priority
                    sizes="(max-width: 1024px) 0px, 30vw"
                    className="object-cover object-[50%_68%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12333a]/78 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-32 right-6 text-right text-white">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#e0c991]">
                      Payyampally showroom
                    </p>
                    <p className="display-font mt-2 text-xl leading-snug">
                      Everything a farewell needs, under one roof.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating card — hearse fleet */}
              <motion.div
                className="absolute bottom-10 left-0 w-[330px]"
                style={reduceMotion ? undefined : { x: driftCardX, y: parallaxCard }}
                initial={reduceMotion ? false : { opacity: 0, y: 44, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.95, delay: 0.45, ease: EASE }}
              >
                <motion.div animate={float(9, 7, 0.6)}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[1.4rem] bg-[#dfe8e5] shadow-[0_30px_70px_rgba(24,55,62,0.28)] ring-1 ring-white/70">
                    <Image
                      src="/images/showroom/heaven-hearse-exterior.jpg"
                      alt="White Heaven Funeral Services hearse van parked outside the shop"
                      fill
                      priority
                      sizes="(max-width: 1024px) 0px, 24vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12333a]/55 via-transparent to-transparent" />
                    <p className="absolute bottom-4 left-5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#ecd9a8]">
                      Hearse fleet · On call
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Small accent card — golden cross */}
              <motion.div
                className="absolute left-14 top-0 w-[148px]"
                style={reduceMotion ? undefined : { x: driftCrossX, y: parallaxCross }}
                initial={reduceMotion ? false : { opacity: 0, y: -26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.62, ease: EASE }}
              >
                <motion.div animate={float(7, 6)}>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#dfe8e5] shadow-[0_22px_50px_rgba(24,55,62,0.22)] ring-1 ring-white/70">
                    <Image
                      src="/images/showroom/heaven-golden-cross.jpg"
                      alt="Golden processional cross with white flower arrangements in the showroom"
                      fill
                      sizes="(max-width: 1024px) 0px, 11vw"
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* 24/7 badge */}
              <motion.div
                className="absolute -right-2 bottom-1"
                style={reduceMotion ? undefined : { x: driftCrossX }}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
              >
                <motion.div animate={float(6, 8, 1.2)}>
                  <div className="rounded-2xl border border-[#e6e3d6] bg-white/95 px-6 py-5 shadow-[0_22px_55px_rgba(23,58,66,0.16)] backdrop-blur-sm">
                    <p className="display-font text-3xl leading-none text-[#193f47]">
                      24/7
                    </p>
                    <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#7b898a]">
                      Dispatch availability
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Simpler composition — mobile & tablet */}
          <div className="relative lg:hidden">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="relative"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[1.6rem] bg-[#dfe8e5] shadow-[0_28px_70px_rgba(24,55,62,0.2)] ring-1 ring-white/70">
                <Image
                  src="/images/showroom/heaven-hearse-exterior.jpg"
                  alt="White Heaven Funeral Services hearse van parked outside the shop"
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 0px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12333a]/65 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#e0c991]">
                    Hearse fleet · On call
                  </p>
                  <p className="display-font mt-1.5 text-lg leading-snug">
                    Everything a farewell needs, under one roof.
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 right-4 rounded-2xl border border-[#e6e3d6] bg-white px-5 py-4 shadow-[0_18px_45px_rgba(23,58,66,0.14)]">
                <p className="display-font text-2xl leading-none text-[#193f47]">
                  24/7
                </p>
                <p className="mt-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-[#7b898a]">
                  Dispatch availability
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center lg:flex"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-2 text-[#7b898a]">
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.24em]">
              Scroll
            </span>
            <span className="relative h-9 w-[22px] rounded-full border border-[#c9d4d0]">
              <motion.span
                className="absolute left-1/2 top-1.5 size-1.5 -translate-x-1/2 rounded-full bg-[#b08d57]"
                animate={reduceMotion ? undefined : { y: [0, 14, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
