"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  Zap,
  Gauge,
  Clock,
  Battery,
  Weight,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatInr } from "@/lib/utils/format";
import { Button } from "@/components/ui/button";
import type { Scooter } from "@/content/types";

/**
 * BrandVariantTabs - the entry point on every brand landing page.
 *
 * Per the client feedback (#12), clicking a brand should NOT dump the
 * customer onto the all-products page. The brand page should show the
 * available variants (e.g. Lead / Lithium) as tabs and the dynamic
 * spec panel for the selected variant - range, top speed, charging
 * time, etc. - inline, before sending the customer to the dedicated
 * variant PDP.
 *
 * Inspired by Komaki's category-navigation flow as referenced in the
 * feedback: see one brand, two chemistries, dynamic specs.
 */

const VARIANT_LABELS: Record<string, string> = {
  "lithium-ion": "Lithium-Ion",
  "lead-acid": "Lead-Acid",
  swap: "Battery Swap",
  "city-plus": "City+",
};

function labelFor(v: Scooter): string {
  return VARIANT_LABELS[v.variantSlug] ?? v.variantSlug;
}

export function BrandVariantTabs({ variants }: { variants: Scooter[] }) {
  const sorted = React.useMemo(
    () => [...variants].sort((a, b) => a.priceOnRoad - b.priceOnRoad),
    [variants],
  );

  const [activeSlug, setActiveSlug] = React.useState<string>(
    sorted[0]?.variantSlug ?? "",
  );
  const reduced = useReducedMotion();

  const active = sorted.find((v) => v.variantSlug === activeSlug) ?? sorted[0];
  if (!active) return null;

  return (
    <section
      aria-label="Choose your variant"
      className="rounded-3xl border border-[var(--color-border)] bg-white overflow-hidden"
    >
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Variants"
        className="flex flex-wrap gap-1 p-1.5 bg-[var(--color-surface-muted)] border-b border-[var(--color-border)]"
      >
        {sorted.map((v) => {
          const isActive = v.variantSlug === active.variantSlug;
          return (
            <button
              key={v.variantSlug}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`variant-panel-${v.variantSlug}`}
              id={`variant-tab-${v.variantSlug}`}
              onClick={() => setActiveSlug(v.variantSlug)}
              className={cn(
                "relative flex-1 min-w-[140px] px-4 py-3 rounded-xl text-sm md:text-base font-semibold transition-colors text-center",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2",
                isActive
                  ? "text-white"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="variant-tab-pill"
                  className="absolute inset-0 rounded-xl bg-[var(--color-brand)] shadow-[var(--shadow-xs)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 inline-flex flex-col items-center gap-0.5">
                <span>{labelFor(v)}</span>
                <span
                  className={cn(
                    "text-[10px] uppercase tracking-wider tabular-nums font-medium",
                    isActive ? "text-white/85" : "text-[var(--color-text-subtle)]",
                  )}
                >
                  {formatInr(v.priceOnRoad)}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic spec panel */}
      <div
        role="tabpanel"
        id={`variant-panel-${active.variantSlug}`}
        aria-labelledby={`variant-tab-${active.variantSlug}`}
        className="p-6 md:p-8"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active.variantSlug}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-brand)] mb-1.5">
                  {labelFor(active)} variant
                </p>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-[var(--color-text)] leading-tight">
                  {active.name}
                </h3>
                <p className="mt-2 text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed max-w-xl">
                  {active.tagline}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-subtle)] mb-0.5">
                  On-road price
                </p>
                <p className="text-2xl md:text-3xl font-display font-bold text-[var(--color-text)] tabular-nums">
                  {formatInr(active.priceOnRoad)}
                </p>
                {active.emiFrom > 0 && (
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                    or {formatInr(active.emiFrom)}/mo EMI
                  </p>
                )}
              </div>
            </div>

            {/* Dynamic spec grid - items stagger in each time the active
                variant changes, so a tab switch feels alive rather than
                a static crossfade. */}
            <motion.ul
              aria-label={`${active.name} specifications`}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.05 },
                },
              }}
              initial={reduced ? false : "hidden"}
              animate={reduced ? undefined : "visible"}
            >
              <SpecCell
                icon={Zap}
                label="Range per charge"
                value={`${active.specs.rangeKm} km`}
                reduced={!!reduced}
              />
              <SpecCell
                icon={Gauge}
                label="Top speed"
                value={`${active.specs.topSpeedKmh} km/h`}
                reduced={!!reduced}
              />
              <SpecCell
                icon={Clock}
                label="Charging time"
                value={
                  active.specs.chargeTimeHours > 0
                    ? `${active.specs.chargeTimeHours} hrs`
                    : "Swap"
                }
                reduced={!!reduced}
              />
              <SpecCell
                icon={Battery}
                label="Battery"
                value={
                  active.specs.batteryType === "lithium-ion"
                    ? "Lithium-Ion"
                    : "Lead-Acid"
                }
                reduced={!!reduced}
              />
              <SpecCell
                icon={Weight}
                label="Kerb weight"
                value={`${active.specs.weightKg} kg`}
                reduced={!!reduced}
              />
              <SpecCell
                icon={ShieldCheck}
                label="Licence"
                value="Not required"
                reduced={!!reduced}
              />
              <SpecCell
                icon={Battery}
                label="Capacity"
                value={`${active.specs.batteryCapacityKwh} kWh`}
                reduced={!!reduced}
              />
              <SpecCell
                icon={Gauge}
                label="Motor"
                value={`${active.specs.motorWattage} W`}
                reduced={!!reduced}
              />
            </motion.ul>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}
              >
                <Link
                  href={`/book-test-ride?model=${active.brand}-${active.variantSlug}`}
                >
                  Book test ride · {labelFor(active)}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={`/ev/${active.brand}/${active.variantSlug}`}>
                  See full specs & features
                </Link>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function SpecCell({
  icon: Icon,
  label,
  value,
  reduced,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  reduced: boolean;
}) {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      whileHover={
        reduced
          ? undefined
          : {
              y: -2,
              transition: { type: "spring", stiffness: 400, damping: 25 },
            }
      }
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-3.5 md:p-4 hover:border-[var(--color-brand)]/40 hover:bg-white transition-colors"
    >
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-4 w-4 text-[var(--color-brand)]" aria-hidden />
        <span className="text-[10px] md:text-[11px] uppercase tracking-wider font-medium text-[var(--color-text-subtle)]">
          {label}
        </span>
      </div>
      <p className="font-display font-bold text-base md:text-lg text-[var(--color-text)] tabular-nums leading-snug">
        {value}
      </p>
    </motion.li>
  );
}
