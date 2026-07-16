import Image from "next/image";
import { BadgeCheck, HeartHandshake, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const values = [
  {
    icon: ShieldCheck,
    title: "Professional by practice",
    description: "Prepared, discreet, and attentive to the details of every handoff.",
  },
  {
    icon: HeartHandshake,
    title: "Compassion in every detail",
    description: "Careful communication and a respectful presence at sensitive moments.",
  },
  {
    icon: BadgeCheck,
    title: "Experience you can rely on",
    description: "Calm coordination shaped around the needs of each transfer partner.",
  },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-[#fbfaf7] py-24 lg:py-32">
      <div className="section-shell grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
        <Reveal className="relative mx-auto w-full max-w-[620px] lg:mx-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#dfe8e5] shadow-[0_32px_80px_rgba(24,55,62,0.14)] sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/images/gallery/web/heaven-vehicle-angle.jpg"
              alt="Heaven Funeral Services transport vehicle prepared for service"
              fill
              sizes="(max-width: 1024px) 90vw, 42vw"
              className="object-cover transition-transform duration-1000 hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#16363d]/55 via-transparent to-transparent" />
            <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between gap-6 text-white sm:bottom-9 sm:left-9 sm:right-9">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e0c991]">
                  Quiet confidence
                </p>
                <p className="display-font mt-2 max-w-xs text-2xl leading-tight">
                  Care that remains steady through every mile.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-7 -right-2 rounded-2xl border border-[#e1e7e4] bg-white px-6 py-5 shadow-[0_20px_50px_rgba(23,58,66,0.12)] sm:right-8">
            <p className="display-font text-3xl leading-none text-[#193f47]">24/7</p>
            <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#7b898a]">
              Dispatch availability
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading
              eyebrow="About Heaven"
              title="A steady presence when certainty matters most."
              description="When families and care teams need a dependable partner, our transport professionals bring discretion, compassion, and clear communication to every transfer."
            />
          </Reveal>

          <div className="mt-10 space-y-3">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Reveal key={value.title} delay={index * 0.08}>
                  <div className="group flex gap-5 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-[#e0e6e3] hover:bg-white hover:shadow-[0_14px_40px_rgba(24,55,62,0.06)] sm:p-5">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#edf3f1] text-[#28555d] transition-colors group-hover:bg-[#193f47] group-hover:text-white">
                      <Icon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-[#1d3c43]">{value.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#6a797b]">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
