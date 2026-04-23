"use client";

import { Users, Store, ShieldCheck, KeyRound } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { globals } from "@/content/globals";

/**
 * Trust bar — lives in the hero overlap zone.
 *
 * Four credibility metrics with mono icons. The numeric ones count
 * up on reveal via AnimatedCounter; text-only metrics render as-is.
 */

const ITEMS: {
  icon: typeof Users;
  value: string;
  label: string;
}[] = [
  { icon: Users, value: globals.stats.happyOwners, label: "Happy Owners" },
  { icon: Store, value: globals.stats.storesOpen, label: "Mobility Centers" },
  { icon: ShieldCheck, value: "3 Years", label: "Warranty" },
  { icon: KeyRound, value: "No Licence", label: "Required" },
];

export function TrustBar() {
  return (
    <div
      className="rounded-2xl bg-white border border-[var(--color-border)] shadow-[var(--shadow-xl)]"
      role="list"
      aria-label="ElectricPe at a glance"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[var(--color-border)]">
        {ITEMS.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            role="listitem"
            className="flex items-center gap-3 md:gap-4 px-4 md:px-6 py-5 md:py-6"
          >
            <span className="inline-flex h-10 w-10 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)]">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <span className="flex flex-col">
              <AnimatedCounter
                value={value}
                className="text-xl md:text-2xl font-display font-bold text-[var(--color-text)] leading-none tracking-tight tabular-nums"
              />
              <span className="mt-1 text-[11px] md:text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-medium">
                {label}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
