"use client";

import * as React from "react";
import { Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { formatInr, formatNumber } from "@/lib/utils/format";
import { computeSavings, type FuelType } from "@/lib/calculators/savings";
import { scooters } from "@/content/scooters";

export function SavingsFullCalculator() {
  const defaultScooter = scooters[0]!;
  const [scooterKey, setScooterKey] = React.useState(
    `${defaultScooter.brand}-${defaultScooter.variantSlug}`,
  );
  const scooter =
    scooters.find((s) => `${s.brand}-${s.variantSlug}` === scooterKey) ??
    defaultScooter;

  const [kmPerDay, setKmPerDay] = React.useState(25);
  const [fuelType, setFuelType] = React.useState<FuelType>("petrol");
  const [mileage, setMileage] = React.useState(45);
  const [fuelPrice, setFuelPrice] = React.useState(103);
  const [electricityRate, setElectricityRate] = React.useState(7.5);

  const result = React.useMemo(
    () =>
      computeSavings({
        kmPerDay,
        currentMileage: mileage,
        fuelPrice,
        fuelType,
        scooterWhPerKm: 18,
        electricityRate,
        evOnRoadPrice: scooter.priceOnRoad,
      }),
    [kmPerDay, fuelType, mileage, fuelPrice, electricityRate, scooter.priceOnRoad],
  );

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My ElectricPe savings",
          text: `I'll save ${formatInr(result.monthlySavingsInr)} per month by switching to an ElectricPe scooter.`,
          url,
        });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-12 max-w-6xl mx-auto">
      {/* Inputs */}
      <Card className="p-6 md:p-8 space-y-6">
        <div>
          <label htmlFor="s-scooter" className="block text-sm font-semibold mb-2">
            Which scooter?
          </label>
          <select
            id="s-scooter"
            value={scooterKey}
            onChange={(e) => setScooterKey(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border-strong)] bg-white px-3 py-2.5 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2"
          >
            {scooters.map((s) => (
              <option
                key={`${s.brand}-${s.variantSlug}`}
                value={`${s.brand}-${s.variantSlug}`}
              >
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="s-km" className="flex items-baseline justify-between mb-2">
            <span className="text-sm font-semibold">Daily distance</span>
            <span className="font-display font-bold text-[var(--color-brand)]">
              {kmPerDay} km
            </span>
          </label>
          <input
            id="s-km"
            type="range"
            min={5}
            max={100}
            step={1}
            value={kmPerDay}
            onChange={(e) => setKmPerDay(parseInt(e.target.value, 10))}
            className="w-full"
          />
        </div>

        <div>
          <p className="text-sm font-semibold mb-2">Current fuel</p>
          <div className="grid grid-cols-3 gap-2">
            {(["petrol", "cng", "diesel"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFuelType(f)}
                className={cn(
                  "px-3 py-2.5 rounded-lg text-sm font-semibold capitalize transition-colors",
                  fuelType === f
                    ? "bg-[var(--color-brand)] text-white"
                    : "bg-white border border-[var(--color-border-strong)] hover:border-[var(--color-brand)]",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="s-mileage" className="block text-sm font-semibold mb-2">
              Current mileage (km/L)
            </label>
            <Input
              id="s-mileage"
              type="number"
              inputMode="numeric"
              value={mileage}
              onChange={(e) => setMileage(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div>
            <label htmlFor="s-fuel" className="block text-sm font-semibold mb-2">
              Fuel price (₹/L)
            </label>
            <Input
              id="s-fuel"
              type="number"
              inputMode="numeric"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="s-elec" className="block text-sm font-semibold mb-2">
              Electricity rate (₹/kWh)
            </label>
            <Input
              id="s-elec"
              type="number"
              inputMode="decimal"
              value={electricityRate}
              step={0.5}
              onChange={(e) => setElectricityRate(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
      </Card>

      {/* Outputs */}
      <div className="flex flex-col gap-4">
        <div className="rounded-3xl bg-[var(--color-brand-soft)] border border-[var(--color-brand-border)] p-6 md:p-8 text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-brand-pressed)] mb-2">
            You'll save
          </p>
          <p
            className="text-number-display text-[var(--color-brand-pressed)] leading-none"
            aria-live="polite"
          >
            {formatInr(result.monthlySavingsInr)}
          </p>
          <p className="mt-2 text-[var(--color-text-muted)]">every month on fuel</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Yearly" value={formatInr(result.annualSavingsInr)} />
          <Stat label="5-year" value={formatInr(result.fiveYearSavingsInr)} />
          <Stat
            label="Payback"
            value={result.paybackMonths ? `${result.paybackMonths} mo` : "-"}
          />
          <Stat
            label="CO₂ saved/yr"
            value={`${formatNumber(result.co2SavedKgPerYear)} kg`}
          />
        </div>

        <Card className="p-5 md:p-6">
          <p className="text-sm font-semibold mb-3">5-year breakdown</p>
          <div className="space-y-2 text-sm">
            <Row
              label="Petrol fuel cost over 5 years"
              value={formatInr(result.currentFuelMonthlyInr * 12 * 5)}
            />
            <Row
              label="EV electricity cost over 5 years"
              value={formatInr(result.evElectricityMonthlyInr * 12 * 5)}
            />
            <Row
              label="Scooter on-road price"
              value={formatInr(scooter.priceOnRoad)}
            />
            <Row
              label="Net 5-year saving"
              value={formatInr(result.fiveYearSavingsInr - scooter.priceOnRoad)}
              accent
            />
          </div>
        </Card>

        <Button
          onClick={share}
          variant="outline"
          size="lg"
          leadingIcon={<Share2 className="h-4 w-4" aria-hidden />}
        >
          Share my savings
        </Button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-4">
      <p className="text-xs text-[var(--color-text-subtle)] uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="font-display font-bold text-[var(--color-text)]">{value}</p>
    </Card>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between py-1.5 border-b border-dashed border-[var(--color-border)] last:border-b-0",
        accent ? "pt-3 border-t border-solid border-[var(--color-border)]" : "",
      )}
    >
      <span className="text-[var(--color-text-muted)]">{label}</span>
      <span
        className={cn(
          "font-semibold",
          accent ? "text-[var(--color-brand)]" : "text-[var(--color-text)]",
        )}
      >
        {value}
      </span>
    </div>
  );
}
