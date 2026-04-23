"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatInr, formatNumber } from "@/lib/utils/format";
import { computeSavings } from "@/lib/calculators/savings";
import type { Scooter } from "@/content/types";

export function PdpSavingsMini({ scooter }: { scooter: Scooter }) {
  const [kmPerDay, setKmPerDay] = React.useState(25);

  const result = React.useMemo(
    () =>
      computeSavings({
        kmPerDay,
        currentMileage: 45,
        fuelPrice: 103,
        fuelType: "petrol",
        scooterWhPerKm: 18,
        electricityRate: 7.5,
        evOnRoadPrice: scooter.priceOnRoad,
      }),
    [kmPerDay, scooter.priceOnRoad],
  );

  return (
    <div className="rounded-3xl bg-[var(--color-brand-soft)] border border-[var(--color-brand-border)] p-6 md:p-8">
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-6 md:gap-10 items-center">
        <div>
          <p className="text-eyebrow mb-2">Your monthly savings</p>
          <p className="text-number-display text-[var(--color-brand-pressed)] leading-none">
            {formatInr(result.monthlySavingsInr)}
          </p>
          <p className="mt-1 text-[var(--color-text-muted)]">
            vs a petrol scooter · {formatNumber(result.co2SavedKgPerYear)} kg CO₂
            saved per year
          </p>
        </div>
        <div>
          <label
            htmlFor="pdp-km"
            className="flex items-baseline justify-between mb-2"
          >
            <span className="text-sm font-semibold text-[var(--color-text)]">
              How many km do you ride per day?
            </span>
            <span className="font-display font-bold text-[var(--color-brand-pressed)]">
              {kmPerDay} km
            </span>
          </label>
          <input
            id="pdp-km"
            type="range"
            min={5}
            max={80}
            step={1}
            value={kmPerDay}
            onChange={(e) => setKmPerDay(parseInt(e.target.value, 10))}
            className="w-full"
            aria-valuemin={5}
            aria-valuemax={80}
            aria-valuenow={kmPerDay}
          />
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <Button asChild fullWidth>
              <Link
                href={`/book-test-ride?model=${scooter.brand}-${scooter.variantSlug}`}
              >
                Book a test ride
              </Link>
            </Button>
            <Button asChild variant="outline" fullWidth>
              <Link href="/savings">Detailed report</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
