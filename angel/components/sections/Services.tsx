"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Building2,
  ClipboardCheck,
  Clock3,
  Plane,
  Route,
  Snowflake,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const services: Service[] = [
  {
    title: "24/7 Decedent Transport",
    description:
      "Round-the-clock dispatch coordination for timely, dignified transfers whenever care is needed.",
    icon: Clock3,
  },
  {
    title: "Hospital to Mortuary",
    description:
      "Careful coordination with hospitals, care facilities, funeral homes, and mortuary teams.",
    icon: Building2,
  },
  {
    title: "Airport Transfers",
    description:
      "Planned airport pickup and handoff with clear communication at each stage of the journey.",
    icon: Plane,
  },
  {
    title: "Long Distance Transport",
    description:
      "Dependable regional and interstate coordination for longer journeys and scheduled transfers.",
    icon: Route,
  },
  {
    title: "Refrigerated Vehicles",
    description:
      "Clean, temperature-controlled transport options prepared for secure and respectful care.",
    icon: Snowflake,
  },
  {
    title: "Handling & Documentation",
    description:
      "Professional handling and organized transfer documentation from pickup through arrival.",
    icon: ClipboardCheck,
  },
];

export function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="scroll-mt-24 overflow-hidden bg-[#f8f8f4] pb-24 pt-40 sm:pt-44 lg:pb-32 lg:pt-48"
    >
      <div className="section-shell relative">
        <div
          className="pointer-events-none absolute -right-44 -top-48 size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(187,164,116,0.13),transparent_68%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-40 top-60 size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(105,151,155,0.09),transparent_68%)]"
          aria-hidden="true"
        />

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <SectionHeading
            eyebrow="Care at every mile"
            title="Respectful transport, coordinated around the clock."
            description="When timing matters and details carry weight, our role is simple: bring calm coordination, professional care, and clear communication to every transfer."
            level="h1"
          />
          <div className="flex max-w-sm items-center gap-4 rounded-2xl border border-[#dce4e1] bg-white/70 p-4 shadow-[0_12px_40px_rgba(27,58,65,0.05)] backdrop-blur-sm">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#193f47] text-white">
              <Clock3 className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#18343b]">24-hour coordination</p>
              <p className="mt-1 text-xs leading-5 text-[#6b797b]">
                A calm, responsive point of contact—day or night.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } },
          }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                variants={{
                  hidden: reduceMotion ? {} : { opacity: 0, y: 24 },
                  visible: reduceMotion
                    ? {}
                    : {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                      },
                }}
                whileHover={reduceMotion ? undefined : { y: -6 }}
                transition={{ duration: 0.25 }}
                className="group relative min-h-[280px] overflow-hidden rounded-[1.4rem] border border-[#dfe6e3] bg-white p-7 shadow-[0_14px_45px_rgba(23,58,66,0.045)] transition-[border-color,box-shadow] duration-300 hover:border-[#cdbb98] hover:shadow-[0_22px_55px_rgba(23,58,66,0.1)] sm:p-8"
              >
                <div className="absolute right-6 top-5 text-[0.68rem] font-semibold tracking-[0.2em] text-[#a9b4b2]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="grid size-14 place-items-center rounded-2xl bg-[#edf3f1] text-[#2c5961] transition-all duration-300 group-hover:bg-[#193f47] group-hover:text-white">
                  <Icon className="size-6" strokeWidth={1.7} aria-hidden="true" />
                </div>
                <h3 className="display-font mt-8 text-[1.6rem] leading-tight tracking-[-0.025em] text-[#19373e]">
                  {service.title}
                </h3>
                <p className="mt-4 text-[0.94rem] leading-7 text-[#69787a]">
                  {service.description}
                </p>
                <span
                  className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#b08d57] transition-all duration-500 group-hover:w-full"
                  aria-hidden="true"
                />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
