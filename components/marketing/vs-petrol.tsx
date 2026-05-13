"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { buildWhatsAppLink, WHATSAPP_DEFAULTS } from "@/lib/utils/whatsapp";
import { globals } from "@/content/globals";

const EASE = [0.22, 1, 0.36, 1] as const;

type Row = {
  label: string;
  ev: { mark: "check" | "dash"; text: string };
  petrol: { text: string };
};

const ROWS: Row[] = [
  {
    label: "Fuel / energy cost per month",
    ev: { mark: "check", text: "₹300–500 electricity" },
    petrol: { text: "₹2,800–4,000 petrol" },
  },
  {
    label: "Maintenance cost per year",
    ev: { mark: "check", text: "₹1,200 (single visit)" },
    petrol: { text: "₹4,000–6,000 multiple services" },
  },
  {
    label: "Driving licence",
    ev: { mark: "check", text: "Not required" },
    petrol: { text: "Required" },
  },
  {
    label: "Road noise",
    ev: { mark: "check", text: "Silent" },
    petrol: { text: "Engine + exhaust" },
  },
  {
    label: "Tailpipe CO₂ emissions",
    ev: { mark: "check", text: "Zero" },
    petrol: { text: "~1,200 kg/year" },
  },
  {
    label: "5-year running-cost savings",
    ev: { mark: "check", text: "Up to ₹1,80,000" },
    petrol: { text: "—" },
  },
];

export function VsPetrol() {
  const reduced = useReducedMotion();
  const tableRef = React.useRef<HTMLDivElement>(null);
  const tableInView = useInView(tableRef, { once: true, margin: "-60px" });

  return (
    <Section>
      <Reveal>
        <SectionHeader
          eyebrow="The honest comparison"
          title="ElectricPe vs petrol. You decide."
          description="We don't use red crosses. We use honest numbers. Judge for yourself."
        />
      </Reveal>

      <Reveal className="max-w-4xl mx-auto">
        <motion.div
          ref={tableRef}
          className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[1.5fr_1fr_1fr] rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden shadow-[var(--shadow-sm)]"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.07, delayChildren: 0.1 },
            },
          }}
          initial={reduced ? false : "hidden"}
          animate={
            !reduced && tableInView ? "visible" : reduced ? undefined : "hidden"
          }
        >
          <motion.div
            className="contents"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.4 } },
            }}
          >
            <div className="p-4 md:p-5 bg-[var(--color-surface-sunken)] border-b border-[var(--color-border)]" />
            <div className="p-4 md:p-5 bg-[var(--color-brand-soft)] border-b border-[var(--color-border)] text-center">
              <span className="font-display font-bold text-[var(--color-brand-pressed)]">
                ElectricPe
              </span>
            </div>
            <div className="p-4 md:p-5 bg-[var(--color-surface-sunken)] border-b border-[var(--color-border)] text-center">
              <span className="font-display font-bold text-[var(--color-text-muted)]">
                Petrol
              </span>
            </div>
          </motion.div>

          {ROWS.map((row, i) => (
            <motion.div
              key={row.label}
              className="contents"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { duration: 0.5, ease: EASE },
                },
              }}
            >
              <div
                className={
                  i % 2 === 0
                    ? "p-4 md:p-5 text-sm md:text-base text-[var(--color-text)] font-medium"
                    : "p-4 md:p-5 text-sm md:text-base text-[var(--color-text)] font-medium bg-[var(--color-surface-muted)]"
                }
              >
                {row.label}
              </div>
              <div
                className={
                  i % 2 === 0
                    ? "p-4 md:p-5 text-sm md:text-base text-[var(--color-brand-pressed)] flex items-center gap-2"
                    : "p-4 md:p-5 text-sm md:text-base text-[var(--color-brand-pressed)] flex items-center gap-2 bg-[var(--color-surface-muted)]"
                }
              >
                {row.ev.mark === "check" ? (
                  <Check className="h-4 w-4 shrink-0 text-[var(--color-brand)]" aria-hidden />
                ) : (
                  <Minus className="h-4 w-4 shrink-0 text-[var(--color-text-subtle)]" aria-hidden />
                )}
                <span>{row.ev.text}</span>
              </div>
              <div
                className={
                  i % 2 === 0
                    ? "p-4 md:p-5 text-sm md:text-base text-[var(--color-text-muted)]"
                    : "p-4 md:p-5 text-sm md:text-base text-[var(--color-text-muted)] bg-[var(--color-surface-muted)]"
                }
              >
                {row.petrol.text}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 text-center">
          <p className="text-[var(--color-text-muted)] mb-4">Still not sure? Talk to us.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" variant="whatsapp">
              <a
                href={buildWhatsAppLink(WHATSAPP_DEFAULTS.general, "vs-petrol section")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`tel:${globals.supportPhone}`}>Call {globals.supportPhone}</a>
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
