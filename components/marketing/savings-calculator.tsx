"use client";

import * as React from "react";
import Link from "next/link";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils/cn";
import { formatInr, formatNumber } from "@/lib/utils/format";
import { computeSavings, type FuelType } from "@/lib/calculators/savings";
import { cities } from "@/content/cities";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * AnimatedRupee — count-up rupee display.
 *
 * Animates from the previously-shown value to the new value with
 * easeOut, formatted via Intl. Used for the headline "₹ saved per
 * month" so a slider or city change feels alive instead of snapping
 * to a new number.
 */
function AnimatedRupee({
  value,
  className,
  reduced,
}: {
  value: number;
  className?: string;
  reduced: boolean;
}) {
  const mv = useMotionValue(value);
  const formatted = useTransform(mv, (v) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Math.round(v)),
  );
  const [text, setText] = React.useState(() =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Math.round(value)),
  );

  React.useEffect(() => {
    if (reduced) {
      mv.set(value);
      return;
    }
    const controls = animate(mv, value, { duration: 0.9, ease: "easeOut" });
    const unsub = formatted.on("change", (v) => setText(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [value, mv, formatted, reduced]);

  return (
    <motion.span className={className} aria-live="polite">
      {text}
    </motion.span>
  );
}

/**
 * HP-04 Savings Calculator — per client PDF.
 *
 * Three inputs, exactly as the spec asks:
 *   1. km/day slider
 *   2. Current vehicle — petrol 2-wheeler or petrol 3-wheeler
 *   3. City petrol price — auto-populates from the selected city,
 *      user can adjust.
 *
 * Outputs: monthly savings (large, bold), annual savings, payback
 * in months. "Do the maths for them" — ₹2,400/month is more
 * motivating than "saves up to 80%".
 */

type VehicleKind = "2w" | "3w";

const VEHICLE_OPTIONS: {
  id: VehicleKind;
  label: string;
  sublabel: string;
  mileage: number;
}[] = [
  {
    id: "2w",
    label: "Petrol 2-wheeler",
    sublabel: "Standard scooter or commuter bike",
    mileage: 45, // km per litre
  },
  {
    id: "3w",
    label: "Petrol 3-wheeler",
    sublabel: "Auto-rickshaw or light cargo",
    mileage: 25,
  },
];

const DEFAULT_CITY = "bengaluru";
const EV_ON_ROAD = 64999; // Xypro Lithium (most common pick)

export function SavingsCalculatorHome() {
  const reduced = useReducedMotion();
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [kmPerDay, setKmPerDay] = React.useState(25);
  const [vehicle, setVehicle] = React.useState<VehicleKind>("2w");
  const [city, setCity] = React.useState<string>(DEFAULT_CITY);
  const activeCity = cities.find((c) => c.slug === city) ?? cities[0];
  const [fuelPrice, setFuelPrice] = React.useState<number>(
    activeCity?.localFuelPricePerLitre ?? 103,
  );

  // When the user changes city, reset the petrol price to that city's
  // baseline (but keep user-edited prices sticky otherwise).
  React.useEffect(() => {
    if (activeCity) setFuelPrice(activeCity.localFuelPricePerLitre);
  }, [city, activeCity]);

  const activeVehicle =
    VEHICLE_OPTIONS.find((v) => v.id === vehicle) ?? VEHICLE_OPTIONS[0]!;

  const result = React.useMemo(
    () =>
      computeSavings({
        kmPerDay,
        currentMileage: activeVehicle.mileage,
        fuelPrice,
        fuelType: "petrol" satisfies FuelType,
        scooterWhPerKm: 18,
        electricityRate: activeCity?.localElectricityRatePerKwh ?? 7.5,
        evOnRoadPrice: EV_ON_ROAD,
      }),
    [kmPerDay, activeVehicle.mileage, fuelPrice, activeCity],
  );

  return (
    <Section className="bg-white">
      <Reveal>
        <SectionHeader
          eyebrow="Savings calculator"
          title="How much will YOU save every month?"
          description="Switching to electric is not just good for the planet — it puts real money back in your pocket every month. Move the slider below."
        />
      </Reveal>

      <motion.div
        ref={sectionRef}
        className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start max-w-6xl mx-auto"
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={
          reduced
            ? undefined
            : inView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 24 }
        }
        transition={{ duration: 0.65, ease: EASE }}
      >
        {/* Inputs */}
        <div className="rounded-3xl bg-[var(--color-surface-muted)] border border-[var(--color-border)] p-6 md:p-8 space-y-7">
          {/* Km slider */}
          <div>
            <label
              htmlFor="km-per-day"
              className="flex items-baseline justify-between mb-3"
            >
              <span className="text-sm font-semibold text-[var(--color-text)]">
                How many km do you ride per day?
              </span>
              <span className="text-lg font-display font-bold text-[var(--color-brand)]">
                {kmPerDay} km
              </span>
            </label>
            <input
              id="km-per-day"
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
            <div className="flex justify-between text-xs text-[var(--color-text-subtle)] mt-2">
              <span>5 km</span>
              <span>80 km</span>
            </div>
          </div>

          {/* Vehicle type */}
          <div>
            <p className="text-sm font-semibold text-[var(--color-text)] mb-3">
              Current vehicle
            </p>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-2"
              role="radiogroup"
              aria-label="Current vehicle type"
            >
              {VEHICLE_OPTIONS.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  role="radio"
                  aria-checked={vehicle === v.id}
                  onClick={() => setVehicle(v.id)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-left transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2",
                    vehicle === v.id
                      ? "bg-[var(--color-brand)] text-white"
                      : "bg-white border border-[var(--color-border-strong)] text-[var(--color-text)] hover:border-[var(--color-brand)]",
                  )}
                >
                  <span className="block font-semibold text-sm">{v.label}</span>
                  <span
                    className={cn(
                      "block text-xs mt-0.5",
                      vehicle === v.id
                        ? "text-white/80"
                        : "text-[var(--color-text-subtle)]",
                    )}
                  >
                    {v.sublabel}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* City + fuel price */}
          <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
            <div>
              <label
                htmlFor="city-select"
                className="block text-sm font-semibold text-[var(--color-text)] mb-2"
              >
                Your city
              </label>
              <select
                id="city-select"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-[var(--color-border-strong)] bg-white text-base text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2"
              >
                {cities.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="fuel-price"
                className="block text-sm font-semibold text-[var(--color-text)] mb-2"
              >
                Petrol ₹/L
              </label>
              <div className="relative">
                <span
                  aria-hidden
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-subtle)]"
                >
                  ₹
                </span>
                <input
                  id="fuel-price"
                  type="number"
                  inputMode="numeric"
                  min={50}
                  max={200}
                  step={1}
                  value={fuelPrice}
                  onChange={(e) =>
                    setFuelPrice(
                      Math.max(50, Math.min(200, Number(e.target.value) || 0)),
                    )
                  }
                  className="h-11 w-24 pl-6 pr-2 rounded-lg border border-[var(--color-border-strong)] bg-white text-base text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
            You could save
          </p>
          <p className="text-number-display text-[var(--color-brand)] leading-none tabular-nums block">
            <AnimatedRupee
              value={result.monthlySavingsInr}
              reduced={!!reduced}
            />
          </p>
          <p className="mt-2 text-lg text-[var(--color-text-muted)]">
            every month — with {activeCity?.name ?? "your city"}&apos;s
            current petrol price of ₹{fuelPrice}/L
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3 md:gap-4">
            <Stat
              label="Yearly savings"
              value={formatInr(result.annualSavingsInr)}
            />
            <Stat
              label="Payback"
              value={`${result.paybackMonths} mo`}
              hint={result.paybackMonths <= 36 ? "Under 3 years" : undefined}
            />
            <Stat
              label="CO₂ saved"
              value={`${formatNumber(result.co2SavedKgPerYear)} kg/yr`}
            />
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Button
              asChild
              size="lg"
              trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}
            >
              <Link
                href={`/book-test-ride?city=${city}&km=${kmPerDay}`}
              >
                Start Saving Today — Book a Test Ride
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link
                href={`/savings?city=${city}&km=${kmPerDay}&price=${fuelPrice}&veh=${vehicle}`}
              >
                Full report
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl bg-[var(--color-surface-muted)] border border-[var(--color-border)] p-4 text-center lg:text-left">
      <p className="text-xs text-[var(--color-text-subtle)] uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-lg md:text-xl font-display font-bold text-[var(--color-text)]">
        {value}
      </p>
      {hint && (
        <p className="text-xs text-[var(--color-brand)] font-medium mt-0.5">
          {hint}
        </p>
      )}
    </div>
  );
}
