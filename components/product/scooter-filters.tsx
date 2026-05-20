"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import type { BrandSlug, UseCase } from "@/content/types";

type SortKey = "price-asc" | "price-desc" | "range-desc";

const BRAND_OPTIONS: { slug: BrandSlug; label: string }[] = [
  { slug: "xypro", label: "Xypro" },
  { slug: "jett", label: "Jett" },
  { slug: "4all", label: "4ALL" },
];

const USE_OPTIONS: { slug: UseCase; label: string }[] = [
  { slug: "commute", label: "Commute" },
  { slug: "delivery", label: "Delivery" },
  { slug: "student", label: "Student" },
  { slug: "family", label: "Family" },
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "price-asc", label: "Price: Low to high" },
  { value: "price-desc", label: "Price: High to low" },
  { value: "range-desc", label: "Range: Longest first" },
];

export function ScooterFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const brand = searchParams.get("brand") ?? "";
  const useCase = searchParams.get("use") ?? "";
  const sort = (searchParams.get("sort") as SortKey | null) ?? "";

  const updateParam = React.useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(searchParams.toString());
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      const qs = next.toString();
      router.replace(qs ? `/ev?${qs}` : "/ev", { scroll: false });
    },
    [router, searchParams],
  );

  const reset = () => router.replace("/ev", { scroll: false });
  const hasFilters = Boolean(brand || useCase || sort);

  return (
    <div
      className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 md:p-5 shadow-[var(--shadow-xs)]"
      aria-label="Scooter filters"
    >
      <div className="flex flex-col gap-5">
        <FilterGroup
          legend="Brand"
          options={[{ slug: "", label: "All brands" }, ...BRAND_OPTIONS]}
          value={brand}
          onChange={(v) => updateParam("brand", v)}
          name="brand"
        />

        <FilterGroup
          legend="Use-case"
          options={[{ slug: "", label: "Any" }, ...USE_OPTIONS]}
          value={useCase}
          onChange={(v) => updateParam("use", v)}
          name="use"
        />

        <div>
          <label
            htmlFor="scooter-sort"
            className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2"
          >
            Sort by
          </label>
          <select
            id="scooter-sort"
            value={sort}
            onChange={(e) => updateParam("sort", e.target.value)}
            className={cn(
              "h-11 w-full rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 text-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2",
              "hover:border-[var(--color-neutral-400)]",
            )}
          >
            <option value="">Recommended</option>
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={reset}
            className={cn(
              "self-start text-sm font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] rounded-sm",
            )}
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  legend,
  options,
  value,
  onChange,
  name,
}: {
  legend: string;
  options: { slug: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  name: string;
}) {
  return (
    <fieldset>
      <legend className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={legend}>
        {options.map((o) => {
          const active = value === o.slug;
          return (
            <label
              key={`${name}-${o.slug || "any"}`}
              className={cn(
                "cursor-pointer select-none px-3.5 py-2 rounded-full text-sm font-semibold transition-colors",
                "border focus-within:ring-2 focus-within:ring-[var(--color-ring)] focus-within:ring-offset-2",
                active
                  ? "bg-[var(--color-brand)] text-white border-[var(--color-brand)] shadow-[var(--shadow-xs)]"
                  : "bg-[var(--color-surface)] text-[var(--color-text)] border-[var(--color-border)] hover:border-[var(--color-brand)]",
              )}
            >
              <input
                type="radio"
                name={name}
                value={o.slug}
                checked={active}
                onChange={() => onChange(o.slug)}
                className="sr-only"
              />
              {o.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
