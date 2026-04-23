"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatInr } from "@/lib/utils/format";
import { computeEmi } from "@/lib/calculators/emi";
import { cn } from "@/lib/utils/cn";
import type { Scooter } from "@/content/types";

const TENURES = [12, 24, 36, 48] as const;
const DEFAULT_RATE = 11.5;

export function EmiWidget({ scooter }: { scooter: Scooter }) {
  const price = scooter.priceOnRoad;
  const [downPayment, setDownPayment] = React.useState(0);
  const [tenure, setTenure] = React.useState<(typeof TENURES)[number]>(36);

  const principal = Math.max(0, price - downPayment);
  const result = React.useMemo(
    () =>
      computeEmi({
        principal,
        annualInterestPct: DEFAULT_RATE,
        tenureMonths: tenure,
      }),
    [principal, tenure],
  );

  return (
    <div className="rounded-3xl bg-[var(--color-surface-muted)] border border-[var(--color-border)] p-6 md:p-8">
      <div className="grid lg:grid-cols-[1fr_1fr] gap-6 lg:gap-10 items-start">
        <div>
          <div className="mb-6">
            <label
              htmlFor="down-payment"
              className="flex items-baseline justify-between mb-2"
            >
              <span className="text-sm font-semibold text-[var(--color-text)]">
                Down payment
              </span>
              <span className="text-base font-display font-bold text-[var(--color-brand)]">
                {formatInr(downPayment)}
              </span>
            </label>
            <input
              id="down-payment"
              type="range"
              min={0}
              max={price}
              step={2500}
              value={downPayment}
              onChange={(e) => setDownPayment(parseInt(e.target.value, 10))}
              className="w-full"
              aria-valuemin={0}
              aria-valuemax={price}
              aria-valuenow={downPayment}
            />
            <div className="flex justify-between text-xs text-[var(--color-text-subtle)] mt-1.5">
              <span>₹0</span>
              <span>{formatInr(price)}</span>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-[var(--color-text)] mb-2">
              Tenure
            </p>
            <div
              className="grid grid-cols-4 gap-2"
              role="radiogroup"
              aria-label="Loan tenure"
            >
              {TENURES.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="radio"
                  aria-checked={tenure === t}
                  onClick={() => setTenure(t)}
                  className={cn(
                    "px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2",
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

          <p className="mt-5 text-xs text-[var(--color-text-muted)]">
            Indicative rate: {DEFAULT_RATE}% p.a. Real rate depends on your
            chosen partner and profile. Approval in ~15 minutes at any store.
          </p>
        </div>

        <div className="text-center lg:text-left">
          <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-semibold mb-2">
            Your monthly EMI
          </p>
          <p
            className="text-number-display text-[var(--color-brand)] leading-none"
            aria-live="polite"
          >
            {formatInr(result.monthlyEmi)}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white border border-[var(--color-border)] p-3 text-left">
              <p className="text-xs text-[var(--color-text-subtle)]">
                Total interest
              </p>
              <p className="font-semibold text-[var(--color-text)]">
                {formatInr(result.totalInterest)}
              </p>
            </div>
            <div className="rounded-xl bg-white border border-[var(--color-border)] p-3 text-left">
              <p className="text-xs text-[var(--color-text-subtle)]">
                Total payable
              </p>
              <p className="font-semibold text-[var(--color-text)]">
                {formatInr(result.totalPayable)}
              </p>
            </div>
          </div>
          <Button asChild size="lg" className="mt-6" fullWidth>
            <Link href="/emi">Apply for EMI</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
