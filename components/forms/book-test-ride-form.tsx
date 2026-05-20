"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { cn } from "@/lib/utils/cn";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import { cities } from "@/content/cities";
import { scooters } from "@/content/scooters";
import { getStoresByCity } from "@/content/stores";
import { bookTestRideSchema } from "@/lib/validation/booking";
import { track, EVENTS } from "@/lib/analytics/events";

type Slot = "morning" | "afternoon" | "evening";
type Currently = "petrol" | "ev" | "none";

type State = {
  step: 1 | 2 | 3 | 4 | 5;
  city: string;
  model: string;
  storeSlug: string;
  preferredDate: string;
  preferredSlot: Slot | "";
  name: string;
  phone: string;
  email: string;
  currentlyRides: Currently | "";
  consent: boolean;
};

const STORAGE_KEY = "ep.booking";

const SLOTS: { id: Slot; label: string; desc: string }[] = [
  { id: "morning", label: "Morning", desc: "10:00 – 12:00" },
  { id: "afternoon", label: "Afternoon", desc: "12:00 – 16:00" },
  { id: "evening", label: "Evening", desc: "16:00 – 20:00" },
];

function datesNext7Days(): { iso: string; label: string; day: string }[] {
  const out: { iso: string; label: string; day: string }[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    out.push({
      iso,
      label: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      day: d.toLocaleDateString("en-IN", { weekday: "short" }),
    });
  }
  return out;
}

export function BookTestRideForm({
  initialCity = "",
  initialModel = "",
  initialStore = "",
}: {
  initialCity?: string;
  initialModel?: string;
  initialStore?: string;
}) {
  const [state, setState] = React.useState<State>({
    step: 1,
    city: initialCity,
    model: initialModel,
    storeSlug: initialStore,
    preferredDate: "",
    preferredSlot: "",
    name: "",
    phone: "",
    email: "",
    currentlyRides: "",
    consent: false,
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [reference, setReference] = React.useState<string | null>(null);

  // Hydrate from localStorage
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState((s) => ({ ...s, ...JSON.parse(raw) }));
    } catch {
      // ignore
    }
    track(EVENTS.TEST_RIDE_STARTED);
  }, []);

  // Persist to localStorage
  React.useEffect(() => {
    if (state.step === 5) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const set = <K extends keyof State>(key: K, value: State[K]) =>
    setState((s) => ({ ...s, [key]: value }));

  const go = (step: State["step"]) => {
    track(EVENTS.TEST_RIDE_STEP, { step });
    setState((s) => ({ ...s, step }));
  };

  const submit = async () => {
    const parsed = bookTestRideSchema.safeParse({
      name: state.name,
      phone: state.phone,
      email: state.email || undefined,
      city: state.city,
      model: state.model || undefined,
      storeSlug: state.storeSlug || undefined,
      preferredDate: state.preferredDate,
      preferredSlot: state.preferredSlot as Slot,
      currentlyRides: state.currentlyRides as Currently,
      consent: state.consent,
      source: "web",
    });
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors(
        Object.fromEntries(
          Object.entries(flat).map(([k, v]) => [k, v?.[0] ?? "Invalid"]),
        ),
      );
      return;
    }

    setSubmitting(true);
    setErrors({});
    try {
      const res = await fetch("/api/book-test-ride", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors({ _: data.error ?? "Something went wrong. Please try again." });
        return;
      }
      setReference(data.reference);
      track(EVENTS.TEST_RIDE_COMPLETED);
      localStorage.removeItem(STORAGE_KEY);
      go(5);
    } catch {
      setErrors({ _: "Network error. Please try again or message us on WhatsApp." });
    } finally {
      setSubmitting(false);
    }
  };

  const dates = React.useMemo(datesNext7Days, []);
  const availableStores = React.useMemo(
    () => (state.city ? getStoresByCity(state.city) : []),
    [state.city],
  );

  const progress = Math.min(100, ((state.step - 1) / 4) * 100);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div
        className="mb-8"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="flex justify-between mb-2 text-xs font-semibold text-[var(--color-text-muted)]">
          <span>Step {Math.min(state.step, 4)} of 4</span>
          {state.step < 5 && (
            <a
              href={buildWhatsAppLink(
                `Hi! I'd like to book a test ride. (Step ${state.step})`,
                "booking funnel",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[var(--color-brand)] hover:underline"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden /> Prefer WhatsApp?
            </a>
          )}
        </div>
        <div className="h-1.5 bg-[var(--color-surface-sunken)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-brand)] transition-all duration-[var(--duration-base)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step 1: City */}
      {state.step === 1 && (
        <div>
          <h2 className="text-h2 mb-2">Which city are you in?</h2>
          <p className="text-[var(--color-text-muted)] mb-6">
            We'll show you scooters and stores near you.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {cities.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => {
                  set("city", c.slug);
                  go(2);
                }}
                className={cn(
                  "px-4 py-3 rounded-xl border text-left transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2",
                  state.city === c.slug
                    ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)]"
                    : "border-[var(--color-border-strong)] hover:border-[var(--color-brand)]",
                )}
              >
                <span className="font-semibold text-[var(--color-text)]">
                  {c.name}
                </span>
                <span className="block text-xs text-[var(--color-text-muted)]">
                  {c.servedStoreSlugs.length} store
                  {c.servedStoreSlugs.length === 1 ? "" : "s"}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Model */}
      {state.step === 2 && (
        <div>
          <h2 className="text-h2 mb-2">Which scooter are you interested in?</h2>
          <p className="text-[var(--color-text-muted)] mb-6">
            Pick a model, or let our expert help you choose at the store.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                set("model", "");
                go(3);
              }}
              className={cn(
                "px-4 py-4 rounded-xl border text-left transition-colors",
                !state.model
                  ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)]"
                  : "border-[var(--color-border-strong)] hover:border-[var(--color-brand)]",
              )}
            >
              <span className="font-semibold">I'm not sure yet</span>
              <span className="block text-xs text-[var(--color-text-muted)]">
                An expert will walk you through the range
              </span>
            </button>
            {scooters
              .filter((s) => s.variantSlug !== "swap")
              .map((s) => {
                const slug = `${s.brand}-${s.variantSlug}`;
                return (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => {
                      set("model", slug);
                      go(3);
                    }}
                    className={cn(
                      "px-4 py-4 rounded-xl border text-left transition-colors",
                      state.model === slug
                        ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)]"
                        : "border-[var(--color-border-strong)] hover:border-[var(--color-brand)]",
                    )}
                  >
                    <span className="font-semibold">{s.name}</span>
                    <span className="block text-xs text-[var(--color-text-muted)]">
                      {s.specs.rangeKm} km · {s.specs.topSpeedKmh} km/h
                    </span>
                  </button>
                );
              })}
          </div>
          <div className="mt-6">
            <Button variant="ghost" onClick={() => go(1)}>
              ← Change city
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Slot */}
      {state.step === 3 && (
        <div>
          <h2 className="text-h2 mb-2">When works for you?</h2>
          <p className="text-[var(--color-text-muted)] mb-6">
            Pick a day and a time slot. We'll confirm with your nearest store.
          </p>

          {availableStores.length > 1 && (
            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">Preferred store</p>
              <div className="grid grid-cols-1 gap-2">
                {availableStores.map((s) => (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => set("storeSlug", s.slug)}
                    className={cn(
                      "px-4 py-3 rounded-lg border text-left text-sm",
                      state.storeSlug === s.slug
                        ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)]"
                        : "border-[var(--color-border-strong)] hover:border-[var(--color-brand)]",
                    )}
                  >
                    <span className="font-semibold">{s.name}</span>
                    <span className="block text-xs text-[var(--color-text-muted)]">
                      {s.address}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="text-sm font-semibold mb-2">Date</p>
          <div className="grid grid-cols-7 gap-2 mb-6">
            {dates.map((d) => (
              <button
                key={d.iso}
                type="button"
                onClick={() => set("preferredDate", d.iso)}
                className={cn(
                  "rounded-lg border py-2.5 text-center transition-colors",
                  state.preferredDate === d.iso
                    ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)]"
                    : "border-[var(--color-border-strong)] hover:border-[var(--color-brand)]",
                )}
              >
                <span className="block text-[10px] uppercase text-[var(--color-text-muted)]">
                  {d.day}
                </span>
                <span className="block font-semibold text-sm">{d.label}</span>
              </button>
            ))}
          </div>

          <p className="text-sm font-semibold mb-2">Time slot</p>
          <div className="grid grid-cols-3 gap-2 mb-8">
            {SLOTS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => set("preferredSlot", s.id)}
                className={cn(
                  "rounded-lg border p-3 text-center transition-colors",
                  state.preferredSlot === s.id
                    ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)]"
                    : "border-[var(--color-border-strong)] hover:border-[var(--color-brand)]",
                )}
              >
                <span className="block font-semibold text-sm">{s.label}</span>
                <span className="block text-xs text-[var(--color-text-muted)]">
                  {s.desc}
                </span>
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => go(2)}>
              ← Back
            </Button>
            <Button
              onClick={() => go(4)}
              disabled={!state.preferredDate || !state.preferredSlot}
              fullWidth
              trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Details */}
      {state.step === 4 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="space-y-5"
        >
          <h2 className="text-h2 mb-2">Almost done. Your details</h2>
          <p className="text-[var(--color-text-muted)] mb-6">
            We'll send a WhatsApp confirmation within the hour.
          </p>

          {errors._ && (
            <p
              role="alert"
              className="rounded-lg bg-[var(--color-danger-soft)] text-[var(--color-danger)] px-4 py-3 text-sm"
            >
              {errors._}
            </p>
          )}

          <FormField id="name" label="Full name" required error={errors.name}>
            <Input
              value={state.name}
              onChange={(e) => set("name", e.target.value)}
              autoComplete="name"
              placeholder="As on your ID"
            />
          </FormField>

          <FormField
            id="phone"
            label="Mobile number"
            required
            hint="We'll send a WhatsApp confirmation to this number"
            error={errors.phone}
          >
            <Input
              value={state.phone}
              onChange={(e) => set("phone", e.target.value)}
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="10-digit mobile"
            />
          </FormField>

          <FormField id="email" label="Email (optional)" error={errors.email}>
            <Input
              value={state.email}
              onChange={(e) => set("email", e.target.value)}
              type="email"
              autoComplete="email"
              placeholder="For your booking confirmation PDF"
            />
          </FormField>

          <div>
            <p className="text-sm font-medium mb-2">
              I currently ride:
            </p>
            <div className="flex flex-wrap gap-2">
              {(["petrol", "ev", "none"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => set("currentlyRides", v)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-semibold border transition-colors",
                    state.currentlyRides === v
                      ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)]"
                      : "border-[var(--color-border-strong)] hover:border-[var(--color-brand)]",
                  )}
                >
                  {v === "petrol" && "A petrol scooter"}
                  {v === "ev" && "Another EV"}
                  {v === "none" && "I'm a first-time rider"}
                </button>
              ))}
            </div>
            {errors.currentlyRides && (
              <p className="text-xs text-[var(--color-danger)] mt-1.5" role="alert">
                {errors.currentlyRides}
              </p>
            )}
          </div>

          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={state.consent}
              onChange={(e) => set("consent", e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-[var(--color-border-strong)] text-[var(--color-brand)] focus:ring-[var(--color-ring)]"
            />
            <span className="text-sm text-[var(--color-text-muted)]">
              I agree to receive updates on WhatsApp/SMS/email about my test ride, and
              accept ElectricPe's{" "}
              <Link href="/privacy" className="text-[var(--color-brand)] underline">
                privacy policy
              </Link>
              .
            </span>
          </label>
          {errors.consent && (
            <p className="text-xs text-[var(--color-danger)]" role="alert">
              {errors.consent}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <Button variant="ghost" onClick={() => go(3)} type="button">
              ← Back
            </Button>
            <Button
              type="submit"
              loading={submitting}
              fullWidth
              size="lg"
              trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}
            >
              Confirm test ride
            </Button>
          </div>
        </form>
      )}

      {/* Step 5: Confirmation */}
      {state.step === 5 && reference && (
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[var(--color-brand-soft)] text-[var(--color-brand)] mb-5">
            <Check className="h-8 w-8" aria-hidden />
          </div>
          <h2 className="text-h2 mb-2">You're booked!</h2>
          <p className="text-[var(--color-text-muted)] mb-4">
            We'll WhatsApp you a confirmation with store directions and the
            executive's name shortly. Your booking reference is:
          </p>
          <p className="inline-block rounded-lg bg-[var(--color-surface-sunken)] px-4 py-2 font-mono text-[var(--color-text)] mb-6">
            {reference}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/stores">See store directions</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Back to home</Link>
            </Button>
          </div>
          <p className="mt-8 text-xs text-[var(--color-text-subtle)]">
            Please bring any valid ID (Aadhaar, licence, or PAN) for your test ride.
          </p>
        </div>
      )}
    </div>
  );
}
