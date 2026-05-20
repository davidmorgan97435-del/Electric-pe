"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Users, Store, Wallet, KeyRound } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { globals } from "@/content/globals";

/**
 * Trust bar - lives in the hero overlap zone.
 *
 * Four credibility metrics with mono icons. The numeric ones count up on
 * reveal via AnimatedCounter; text-only metrics render as-is. The row
 * stagger-reveals on scroll so the eye reads it left-to-right.
 *
 * Layout note (client feedback #6): values like "10,000+" and labels like
 * "Mobility Centers" were getting clipped on narrow viewports. The cells
 * now stack icon-above-text and let the value sit on its own line with
 * whitespace-nowrap so the digit string never truncates, and the grid
 * switches from 2-up to 4-up at sm: rather than md: to fit phablets too.
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
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[var(--color-border)]">
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
                : {
                    y: -2,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                    },
                  }
            }
            className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 md:gap-4 px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 text-center sm:text-left min-w-0"
          >
            <motion.span
              whileHover={
                reduced
                  ? undefined
                  : {
                      scale: 1.08,
                      rotate: -4,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 18,
                      },
                    }
              }
              className="inline-flex h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)]"
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
            </motion.span>
            <span className="flex flex-col min-w-0">
              <AnimatedCounter
                value={value}
                className="text-lg sm:text-xl md:text-2xl font-display font-bold text-[var(--color-text)] leading-tight tracking-tight tabular-nums whitespace-nowrap"
              />
              <span className="mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] md:text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-medium whitespace-nowrap">
                {label}
              </span>
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
