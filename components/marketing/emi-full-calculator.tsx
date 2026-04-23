"use client";

import * as React from "react";
import { formatInr } from "@/lib/utils/format";
import { computeEmi } from "@/lib/calculators/emi";
import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/card";
import { scooters } from "@/content/scooters";
import { financePartners } from "@/content/finance-partners";

const TENURES = [12, 24, 36, 48] as const;

export function EmiFullCalculator() {
  const defaultScooter = scooters[0]!;
  const [scooterKey, setScooterKey] = React.useState(
    `${defaultScooter.brand}-${defaultScooter.variantSlug}`,
  );
  const scooter =
    scooters.find((s) => `${s.brand}-${s.variantSlug}` === scooterKey) ??
    defaultScooter;

  const [downPayment, setDownPayment] = React.useState(0);
  const [tenure, setTenure] = React.useState<(typeof TENURES)[number]>(36);
  const [partnerId, setPartnerId] = React.useState(financePartners[0]!.id);

  const partner = financePartners.find((p) => p.id === partnerId) ?? financePartners[0]!;
  const principal = Math.max(0, scooter.priceOnRoad - downPayment);

  const result = React.useMemo(
    () =>
      computeEmi({
        principal,
        annualInterestPct: partner.minInterestAnnualPct,
        tenureMonths: tenure,
      }),
    [principal, partner.minInterestAnnualPct, tenure],
  );

  return (
    <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 max-w-6xl mx-auto">
      <Card className="p-6 md:p-8">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="full-scooter"
              className="block text-sm font-semibold text-[var(--color-text)] mb-2"
            >
              Scooter
            </label>
            <select
              id="full-scooter"
              value={scooterKey}
              onChange={(e) => setScooterKey(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border-strong)] bg-white px-3 py-2.5 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2"
            >
              {scooters.map((s) => (
                <option
                  key={`${s.brand}-${s.variantSlug}`}
                  value={`${s.brand}-${s.variantSlug}`}
                >
                  {s.name} — {formatInr(s.priceOnRoad)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="full-down"
              className="flex items-baseline justify-between mb-2"
            >
              <span className="text-sm font-semibold text-[var(--color-text)]">
                Down payment
              </span>
              <span className="font-display font-bold text-[var(--color-brand)]">
                {formatInr(downPayment)}
              </span>
            </label>
            <input
              id="full-down"
              type="range"
              min={0}
              max={scooter.priceOnRoad}
              step={2500}
              value={downPayment}
              onChange={(e) => setDownPayment(parseInt(e.target.value, 10))}
              className="w-full"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-[var(--color-text)] mb-2">
              Tenure
            </p>
            <div className="grid grid-cols-4 gap-2">
              {TENURES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTenure(t)}
                  className={cn(
                    "px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors",
                    tenure === t
                      ? "bg-[var(--color-brand)] text-white"
                      : "bg-white border border-[var(--color-border-strong)] text-[var(--color-text)] hover:border-[var(--color-brand)]",
                  )}
                >
                  {t} mo
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="full-partner"
              className="block text-sm font-semibold text-[var(--color-text)] mb-2"
            >
              Finance partner
            </label>
            <select
              id="full-partner"
              value={partnerId}
              onChange={(e) => setPartnerId(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border-strong)] bg-white px-3 py-2.5 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2"
            >
              {financePartners.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — from {p.minInterestAnnualPct}% p.a.
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <div className="flex flex-col">
        <div className="rounded-3xl bg-[var(--color-brand-soft)] border border-[var(--color-brand-border)] p-8 text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-brand-pressed)] mb-2">
            Your monthly EMI
          </p>
          <p
            className="text-number-display text-[var(--color-brand-pressed)] leading-none"
            aria-live="polite"
          >
            {formatInr(result.monthlyEmi)}
          </p>
          <p className="mt-3 text-[var(--color-text-muted)]">
            on a principal of {formatInr(principal)} at {partner.minInterestAnnualPct}% p.a.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white p-3">
              <p className="text-xs text-[var(--color-text-muted)]">Total interest</p>
              <p className="font-semibold">{formatInr(result.totalInterest)}</p>
            </div>
            <div className="rounded-xl bg-white p-3">
              <p className="text-xs text-[var(--color-text-muted)]">Total payable</p>
              <p className="font-semibold">{formatInr(result.totalPayable)}</p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-[var(--color-text-muted)] text-center lg:text-left">
          Indicative calculations. Final rate and approval depend on your profile.
          Processing fees and stamp duty may apply depending on the partner.
        </p>
      </div>
    </div>
  );
}
