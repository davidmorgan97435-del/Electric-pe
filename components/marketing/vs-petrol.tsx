"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Fuel,
  Wrench,
  KeyRound,
  Volume2,
  Leaf,
  TrendingDown,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { buildWhatsAppLink, WHATSAPP_DEFAULTS } from "@/lib/utils/whatsapp";
import { globals } from "@/content/globals";

const EASE = [0.22, 1, 0.36, 1] as const;

type Row = {
  icon: LucideIcon;
  label: string;
  ev: string;
  petrol: string;
  highlight?: boolean;
};

const ROWS: Row[] = [
  {
    icon: Fuel,
    label: "Fuel / energy cost per month",
    ev: "₹300–500 electricity",
    petrol: "₹2,800–4,000 petrol",
  },
  {
    icon: Wrench,
    label: "Maintenance cost per year",
    ev: "₹1,200 (single visit)",
    petrol: "₹4,000–6,000 multiple services",
  },
  {
    icon: KeyRound,
    label: "Driving licence",
    ev: "Not required",
    petrol: "Required",
  },
  {
    icon: Volume2,
    label: "Road noise",
    ev: "Silent ride",
    petrol: "Engine + exhaust",
  },
  {
    icon: Leaf,
    label: "Tailpipe CO₂ emissions",
    ev: "Zero",
    petrol: "~1,200 kg / year",
  },
  {
    icon: TrendingDown,
    label: "5-year running-cost savings",
    ev: "Up to ₹1,80,000",
    petrol: "—",
    highlight: true,
  },
];

export function VsPetrol() {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Section className="bg-[var(--color-surface-muted)]">
      <Reveal>
        <SectionHeader
          eyebrow="The honest comparison"
          title={
            <>
              <span className="text-[var(--color-brand)]">EV</span>{" "}
              <span className="text-[var(--color-text-subtle)] font-normal">
                vs
              </span>{" "}
              Petrol.
            </>
          }
          description="We don't use red crosses. We use honest numbers. Judge for yourself."
        />
      </Reveal>

      <Reveal className="max-w-5xl mx-auto" delay={80}>
        {/* Hero savings strip — sets the punchline up front. */}
        <motion.div
          ref={ref}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={
            !reduced && inView ? { opacity: 1, y: 0 } : reduced ? undefined : undefined
          }
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-8 md:mb-10 rounded-3xl border border-[var(--color-brand-border)] bg-gradient-to-br from-[var(--color-brand-soft)] via-white to-white p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-[var(--shadow-sm)]"
        >
          <div className="flex items-start md:items-center gap-4">
            <div className="inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-[var(--color-brand)] text-white shrink-0">
              <Zap className="h-6 w-6 md:h-7 md:w-7" aria-hidden />
            </div>
            <div>
              <p className="text-[11px] md:text-xs uppercase tracking-[0.2em] text-[var(--color-brand-pressed)] font-semibold mb-1">
                Average rider, 5 years
              </p>
              <p className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-[var(--color-text)] tabular-nums leading-tight">
                Save up to{" "}
                <span className="text-[var(--color-brand)]">₹1,80,000</span>
              </p>
            </div>
          </div>
          <p className="text-sm md:text-base text-[var(--color-text-muted)] md:max-w-xs">
            Fuel + maintenance + service combined. The same daily commute,
            half the running cost.
          </p>
        </motion.div>

        {/* Comparison grid — header + rows, animated in. */}
        <motion.div
          className="rounded-3xl border border-[var(--color-border)] bg-white overflow-hidden shadow-[var(--shadow-sm)]"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.07, delayChildren: 0.2 },
            },
          }}
          initial={reduced ? false : "hidden"}
          animate={
            !reduced && inView ? "visible" : reduced ? undefined : "hidden"
          }
        >
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_1fr_1fr] md:grid-cols-[1.4fr_1fr_1fr] border-b border-[var(--color-border)] bg-[var(--color-surface-sunken)]">
            <div className="px-4 md:px-6 py-4 text-xs md:text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Cost / impact
            </div>
            <div className="px-4 md:px-6 py-4 text-center bg-[var(--color-brand-soft)] border-l border-[var(--color-brand-border)]">
              <span className="font-display font-bold text-base md:text-lg text-[var(--color-brand-pressed)]">
                EV
              </span>
            </div>
            <div className="px-4 md:px-6 py-4 text-center border-l border-[var(--color-border)]">
              <span className="font-display font-bold text-base md:text-lg text-[var(--color-text-muted)]">
                Petrol
              </span>
            </div>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => {
            const Icon = row.icon;
            return (
              <motion.div
                key={row.label}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: EASE },
                  },
                }}
                className={
                  "grid grid-cols-[1fr_1fr_1fr] md:grid-cols-[1.4fr_1fr_1fr] " +
                  (i < ROWS.length - 1
                    ? "border-b border-[var(--color-border)]"
                    : "")
                }
              >
                <div className="px-4 md:px-6 py-4 md:py-5 flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-lg bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] shrink-0">
                    <Icon className="h-4 w-4 md:h-[18px] md:w-[18px]" aria-hidden />
                  </span>
                  <span className="text-sm md:text-base text-[var(--color-text)] font-medium leading-snug">
                    {row.label}
                  </span>
                </div>
                <div
                  className={
                    "px-4 md:px-6 py-4 md:py-5 text-center bg-[var(--color-brand-soft)] border-l border-[var(--color-brand-border)] " +
                    (row.highlight
                      ? "text-base md:text-lg font-display font-bold text-[var(--color-brand-pressed)] tabular-nums"
                      : "text-sm md:text-base text-[var(--color-brand-pressed)] font-semibold")
                  }
                >
                  {row.ev}
                </div>
                <div
                  className={
                    "px-4 md:px-6 py-4 md:py-5 text-center border-l border-[var(--color-border)] " +
                    (row.highlight
                      ? "text-base md:text-lg text-[var(--color-text-subtle)] tabular-nums"
                      : "text-sm md:text-base text-[var(--color-text-muted)]")
                  }
                >
                  {row.petrol}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer CTA */}
        <div className="mt-10 text-center">
          <p className="text-[var(--color-text-muted)] mb-4">
            Still not sure? Talk to us.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" variant="whatsapp">
              <a
                href={buildWhatsAppLink(
                  WHATSAPP_DEFAULTS.general,
                  "vs-petrol section",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`tel:${globals.supportPhone}`}>
                Call {globals.supportPhone}
              </a>
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
