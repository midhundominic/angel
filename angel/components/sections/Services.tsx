"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Church,
  ClipboardCheck,
  Clock3,
  Cross,
  Flower2,
  // Plane, // used by the commented-out "Airport Transfers" service below
  ArrowUpRight,
  Route,
  Snowflake,
  Truck,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

// Titles are worded the way families in Wayanad actually search — "dead body
// transport", "freezer box", "hearse van" — rather than in funeral-trade
// language. See data/seo.ts for the reasoning behind the term choices.
const services: Service[] = [
  {
    title: "Funeral Arrangements",
    description:
      "Our main work. Coffins, processional crosses, candles, and flowers, with the parish priest and the church kept in step on timings from the first call onwards.",
    icon: Cross,
  },
  {
    title: "24/7 Dead Body Transport",
    description:
      "Call at any hour, any day. A vehicle is dispatched from Payyampally or Chennalode to hospitals, homes, and mortuaries across Wayanad, with no wait for office hours.",
    icon: Clock3,
  },
  {
    title: "Hearse Van Service",
    description:
      "Our own enclosed hearse vans carry the departed from hospital or home to the church, temple, or burial ground — privately and without hurry.",
    icon: Truck,
  },
  {
    title: "Mortuary Freezer Box on Rent",
    description:
      "Mobile freezer boxes delivered to the house, parish hall, or hospital anywhere in Wayanad, set up by our team and collected once the rites are done.",
    icon: Snowflake,
  },
  {
    title: "Coffins, Crosses & Flowers",
    description:
      "A full range of coffins on display at both shops — plain handcrafted wood to decorated finishes — along with processional crosses, candles, and floral arrangements.",
    icon: Flower2,
  },
  {
    title: "Church & Parish Coordination",
    description:
      "We speak to the parish office and the cemetery directly, so the body arrives when the service is ready to begin and the family is not left chasing arrangements.",
    icon: Church,
  },
  // Airport Transfers — not offered at the moment. Restore this entry (and the
  // `Plane` icon import above) when the service becomes available again.
  // {
  //   title: "Airport Transfers",
  //   description:
  //     "Planned airport pickup and handoff with clear communication at each stage of the journey.",
  //   icon: Plane,
  // },
  {
    title: "Long Distance Transport",
    description:
      "Journeys beyond the district — Kannur, Kozhikode, Bengaluru, Karnataka, Tamil Nadu — planned end to end, with the family kept updated along the route.",
    icon: Route,
  },
  {
    title: "Handling & Documentation",
    description:
      "Respectful handling plus the transfer paperwork and permits a journey across district or state lines requires, arranged from pickup through arrival.",
    icon: ClipboardCheck,
  },
];

export function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="scroll-mt-24 overflow-hidden bg-[#f8f8f4] py-24 lg:py-32"
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
            title="Everything a funeral needs, from two shops in Wayanad."
            description="Coffins, crosses, freezer boxes, hearse vans, and long-distance transport — kept ready at Payyampally and Chennalode, and dispatched across the district around the clock. One call, and the arrangements begin."
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

        {/* Internal links to the two standalone pages. Both are real routes with
            their own metadata and structured data, and this is the only place
            on the homepage that points at them — so it earns its keep. */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-12 grid gap-4 sm:grid-cols-2"
        >
          {[
            {
              href: "/coffin-boxes",
              eyebrow: "Coffins & caskets",
              title: "See the full coffin range",
              copy: "Six ranges on the floor at both shops — plain hardwood, cross-panel with viewing glass, carved, and fully lined caskets.",
            },
            {
              href: "/blogs",
              eyebrow: "Guides & notes",
              title: "Read before you need to ask",
              copy: "What to do in the first hour, how freezer box hire works, choosing a coffin, and bringing someone home from another state.",
            },
          ].map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex items-start justify-between gap-6 rounded-[1.4rem] border border-[#dfe6e3] bg-white p-7 shadow-[0_14px_45px_rgba(23,58,66,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-[#cdbb98] hover:shadow-[0_22px_55px_rgba(23,58,66,0.1)] sm:p-8"
            >
              <div>
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-[#8b6b3c]">
                  {card.eyebrow}
                </p>
                <h3 className="display-font mt-3 text-[1.5rem] leading-tight tracking-[-0.025em] text-[#19373e]">
                  {card.title}
                </h3>
                <p className="mt-3 max-w-md text-[0.9rem] leading-7 text-[#69787a]">
                  {card.copy}
                </p>
              </div>
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-[#e0e6e3] text-[#8b6b3c] transition-all duration-300 group-hover:border-[#b08d57] group-hover:bg-[#193f47] group-hover:text-white">
                <ArrowUpRight className="size-[18px]" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
