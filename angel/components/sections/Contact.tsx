"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Clock3,
  MapPin,
  PhoneCall,
  Send,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";

const fieldClass =
  "mt-2 min-h-12 w-full rounded-xl border border-[#dce4e1] bg-[#fafbf9] px-4 text-[0.95rem] text-[#1d3b42] outline-none transition placeholder:text-[#9aa6a5] focus:border-[#9b793f] focus:bg-white focus:ring-4 focus:ring-[#b08d57]/10";

export function Contact() {
  const [status, setStatus] = useState("");
  const reduceMotion = useReducedMotion();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(
      "Preview only: your request has not been sent. Connect this form to your dispatch endpoint before launch.",
    );
  };

  return (
    <section id="contact" className="scroll-mt-24 bg-[#fbfaf7] py-24 lg:py-32">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Here when you need us"
            title="A clear next step, any hour of the day."
            description="For immediate coordination or a planned transfer, contact dispatch. We’ll gather the essential details and help you understand what comes next."
          />
        </Reveal>

        <div className="mt-14 grid overflow-hidden rounded-[1.8rem] border border-[#dce4e1] bg-white shadow-[0_28px_80px_rgba(24,55,62,0.1)] lg:mt-20 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal className="relative overflow-hidden bg-[#173b43] p-7 text-white sm:p-10 lg:p-12" y={0}>
            <div
              className="absolute -right-28 -top-28 size-80 rounded-full border border-white/10"
              aria-hidden="true"
            />
            <div
              className="absolute -right-14 -top-14 size-52 rounded-full border border-white/10"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#dcc58f]">
                24-hour dispatch
              </p>
              <h3 className="display-font mt-4 max-w-sm text-4xl leading-[1.08] tracking-[-0.03em]">
                Speak with a calm, responsive coordinator.
              </h3>
              <p className="mt-5 max-w-sm text-sm leading-7 text-white/62">
                If your need is time-sensitive, calling is the quickest way to begin
                coordination.
              </p>

              <motion.a
                href={siteConfig.phoneHref}
                whileHover={reduceMotion ? undefined : { x: 4 }}
                className="mt-9 flex items-center justify-between gap-4 rounded-2xl border border-white/12 bg-white/[0.07] p-5 transition-colors hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dcc58f]"
              >
                <span className="flex items-center gap-4">
                  <span className="grid size-11 place-items-center rounded-xl bg-[#dcc58f] text-[#173b43]">
                    <PhoneCall className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/45">
                      Call dispatch
                    </span>
                    <span className="mt-1 block text-base font-semibold text-white">
                      {siteConfig.phoneDisplay}
                    </span>
                  </span>
                </span>
                <ArrowUpRight className="size-5 text-[#dcc58f]" aria-hidden="true" />
              </motion.a>

              <ul className="mt-9 space-y-4 text-sm text-white/58">
                <li className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 size-4 shrink-0 text-[#dcc58f]" aria-hidden="true" />
                  {siteConfig.availability}
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-[#dcc58f]" aria-hidden="true" />
                  {siteConfig.serviceArea}
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal className="p-7 sm:p-10 lg:p-12" delay={0.08} y={0}>
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b6b3c]">
                  Request service
                </p>
                <h3 className="display-font mt-3 text-3xl tracking-[-0.025em] text-[#19373e]">
                  Tell us how we can help.
                </h3>
              </div>
              <span className="hidden size-12 place-items-center rounded-full bg-[#edf3f1] text-[#28555d] sm:grid">
                <Send className="size-5" aria-hidden="true" />
              </span>
            </div>

            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-medium text-[#29484e]">
                  Name
                  <input
                    className={fieldClass}
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Your full name"
                    required
                  />
                </label>
                <label className="text-sm font-medium text-[#29484e]">
                  Phone
                  <input
                    className={fieldClass}
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="Best number to reach you"
                    required
                  />
                </label>
              </div>
              <label className="mt-5 block text-sm font-medium text-[#29484e]">
                Email
                <input
                  className={fieldClass}
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label className="mt-5 block text-sm font-medium text-[#29484e]">
                Message
                <textarea
                  className={`${fieldClass} min-h-32 resize-y py-3`}
                  name="message"
                  placeholder="Share the pickup location, destination, and timing if known."
                  required
                />
              </label>

              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#193f47] px-6 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(25,63,71,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#24515a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b08d57] focus-visible:ring-offset-2"
                >
                  Request Immediate Service
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </button>
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-semibold text-[#35565d] transition-colors hover:text-[#8b6b3c]"
                >
                  <PhoneCall className="size-4" aria-hidden="true" />
                  Call Now
                </a>
              </div>

              <p className="mt-5 text-xs leading-5 text-[#849091]" aria-live="polite">
                {status ||
                  "For urgent requests, please call. Online messages require a connected dispatch endpoint."}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
