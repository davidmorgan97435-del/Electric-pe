"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Users, Store, Wallet, KeyRound } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { globals } from "@/content/globals";

/**
 * Trust bar — lives in the hero overlap zone.
 *
 * Four credibility metrics with mono icons. The numeric ones count
 * up on reveal via AnimatedCounter; text-only metrics render as-is.
 * The whole row stagger-reveals when it scrolls into view — each cell
 * fades up with an 80ms offset so the eye reads them left-to-right.
 *
 * Per the client feedback, the previous "3 Years Warranty" cell was
 * inaccurate (warranty varies by component) and is replaced with
 * "Low Running Cost" — a value prop that holds true across every SKU.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const ITEMS: {
  icon: typeof Users;
  value: string;
  label: string;
}[] = [
  { icon: Users, value: globals.stats.happyOwners, label: "Happy Owners" },
  { icon: Store, value: globals.stats.storesOpen, label: "Mobility Centers" },
  { icon: KeyRound, value: "No Licence", label: "Required" },
  { icon: Wallet, value: "Low", label: "Running Cost" },
];

export function TrustBar() {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl bg-white border border-[var(--color-border)] shadow-[var(--shadow-xl)]"
      role="list"
      aria-label="ElectricPe at a glance"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.08, delayChildren: 0.1 },
        },
      }}
      initial={reduced ? false : "hidden"}
      animate={!reduced && inView ? "visible" : reduced ? undefined : "hidden"}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[var(--color-border)]">
        {ITEMS.map(({ icon: Icon, value, label }) => (
          <motion.div
            key={label}
            role="listitem"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: EASE },
              },
            }}
            whileHover={
              reduced
                ? undefined
                : { y: -2, transition: { type: "spring", stiffness: 400, damping: 25 } }
            }
            className="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-5 md:py-6"
          >
            <motion.span
              whileHover={
                reduced
                  ? undefined
                  : { scale: 1.08, rotate: -4, transition: { type: "spring", stiffness: 400, damping: 18 } }
              }
              className="inline-flex h-10 w-10 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)]"
            >
              <Icon className="h-5 w-5" aria-hidden />
            </motion.span>
            <span className="flex flex-col">
              <AnimatedCounter
                value={value}
                className="text-xl md:text-2xl font-display font-bold text-[var(--color-text)] leading-none tracking-tight tabular-nums"
              />
              <span className="mt-1 text-[11px] md:text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-medium">
                {label}
              </span>
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
