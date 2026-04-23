"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { formatInr } from "@/lib/utils/format";
import type { Scooter } from "@/content/types";

export function VariantSelector({
  variants,
  activeVariantSlug,
}: {
  variants: Scooter[];
  activeVariantSlug: string;
}) {
  if (variants.length < 2) return null;

  return (
    <section
      className="py-10 md:py-12"
      aria-label="Variant selector"
    >
      <div className="container-page">
        <h2 className="text-h3 mb-4">Choose your variant</h2>
        <div
          role="tablist"
          aria-label="Variants"
          className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0"
        >
          {variants.map((v) => {
            const active = v.variantSlug === activeVariantSlug;
            return (
              <Link
                key={v.variantSlug}
                role="tab"
                aria-selected={active}
                href={`/ev/${v.brand}/${v.variantSlug}`}
                scroll={false}
                className={cn(
                  "shrink-0 rounded-2xl border px-5 py-4 text-left transition-all min-w-[220px]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2",
                  active
                    ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] shadow-[var(--shadow-brand)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-brand)]",
                )}
              >
                <p
                  className={cn(
                    "text-xs font-semibold uppercase tracking-wider mb-1",
                    active
                      ? "text-[var(--color-brand-pressed)]"
                      : "text-[var(--color-text-muted)]",
                  )}
                >
                  {v.specs.batteryType === "lithium-ion"
                    ? "Lithium Ion"
                    : v.specs.batteryType === "lead-acid"
                      ? "Lead Acid"
                      : v.variantSlug}
                </p>
                <p className="font-display font-bold text-[var(--color-text)]">
                  {v.name}
                </p>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  {v.specs.rangeKm} km range · {formatInr(v.priceOnRoad)}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
