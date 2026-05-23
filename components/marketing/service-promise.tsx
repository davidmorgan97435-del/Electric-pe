"use client";

import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Store,
  Clock,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils/cn";

/**
 * HP-02 - Why ElectricPe / Service Promise.
 *
 * Editorial sticky spread. Desktop (≥lg) runs a 12-col Swiss grid: a
 * sticky left column (5/12) crossfades between the four pillars while a
 * scrolling right column (7/12) steps through their photographs. Mobile
 * and tablet fall back to a stacked single-column read. One green accent,
 * AAA contrast, no scroll-hijack, reduced-motion safe.
 */

type Pillar = {
  icon: LucideIcon;
  title: string;
  proof: string;
  metricEyebrow: string;
  metric: string;
  image: string;
  imageAlt: string;
};

const PILLARS: Pillar[] = [
  {
    icon: Store,
    title: "Real Stores, Real People",
    proof:
      "Walk into any of our 126+ Mobility Centers. No chatbots, no call queues. A trained executive knows your vehicle by name.",
    metricEyebrow: "Stores today",
    metric: "126+ Mobility Centers across India.",
    image: "/img/promise/01-stores.png",
    imageAlt:
      "An ElectricPe customer executive greeting a rider inside a Mobility Center.",
  },
  {
    icon: Clock,
    title: "Service in 24 Hours",
    proof:
      "Bring your scooter in. Leave with it the same day or next. A commitment we publish, not a promise we bury.",
    metricEyebrow: "Published monthly",
    metric: "94% of service requests closed within 24 hours this month.",
    image: "/img/promise/02-service.png",
    imageAlt:
      "A technician working on an ElectricPe scooter lifted on a service stand.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty on Battery, Motor & Controller",
    proof:
      "Each core component has its own warranty window. Walk into any store or call us. We'll share the exact coverage for your scooter in writing.",
    metricEyebrow: "Coverage scope",
    metric: "Battery · Motor · Controller. Details on inquiry.",
    image: "/img/promise/03-warranty.png",
    imageAlt:
      "A plain ElectricPe warranty document with pen and key on a service counter.",
  },
  {
    icon: Wrench,
    title: "Genuine Parts, Always in Stock",
    proof:
      "We stock our own parts. No three-week wait for a component to arrive from a warehouse in another city.",
    metricEyebrow: "Average wait",
    metric: "Zero weeks. Parts on the shelf, not in transit.",
    image: "/img/promise/04-parts.png",
    imageAlt:
      "Organised shelves of genuine ElectricPe scooter parts in a stockroom.",
  },
];

/**
 * Tracks which image is currently in the reader's focal band.
 * rootMargin -45%/-45% collapses the trigger zone to the middle 10% of
 * the viewport, so the sticky text swaps only when an image is actually
 * being read - not on first tickle of entry.
 */
function useActivePillar(count: number) {
  const refs = React.useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = React.useState(0);

  const setRef = React.useCallback(
    (i: number) => (el: HTMLLIElement | null) => {
      refs.current[i] = el;
    },
    [],
  );

  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) setActive(i);
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [count]);

  return { active, setRef };
}

export function ServicePromise() {
  const { active, setRef } = useActivePillar(PILLARS.length);
  const reduced = useReducedMotion();

  return (
    <Section>
      <Reveal>
        <SectionHeader
          eyebrow="Why ElectricPe"
          title="Electric scooter service you can walk into, across India."
          description="Most EV brands sell you a scooter and wish you luck. ElectricPe backs yours with 126+ Mobility Centres, a 24-hour service SLA, and component-level warranty on battery, motor and controller. Coverage varies by component, shared in writing."
        />
      </Reveal>

      {/* ───────── Desktop: sticky editorial spread ───────── */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16">
        {/* Sticky text column - layers stacked via CSS grid so the
            container auto-sizes to the tallest pillar. */}
        <aside className="lg:col-span-5">
          <div className="sticky top-28">
            <ol className="relative grid">
              {PILLARS.map((p, i) => {
                const Icon = p.icon;
                const isActive = i === active;
                return (
                  <li
                    key={p.title}
                    aria-current={isActive ? "true" : undefined}
                    aria-hidden={!isActive}
                    style={{ gridArea: "1 / 1" }}
                    className={cn(
                      "motion-safe:transition-opacity motion-safe:duration-[400ms] motion-safe:ease-out",
                      isActive
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none",
                    )}
                  >
                    <div className="flex items-start gap-6">
                      <span
                        aria-hidden
                        className="shrink-0 font-display font-bold text-[88px] xl:text-[104px] text-[var(--color-brand)] tabular-nums leading-none tracking-[-0.03em]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 pt-3 max-w-prose">
                        <div className="flex items-center gap-2.5 mb-3">
                          <Icon
                            className="h-5 w-5 text-[var(--color-brand)] shrink-0"
                            aria-hidden
                          />
                          <h3 className="text-2xl xl:text-3xl font-display font-bold text-[var(--color-text)] leading-tight">
                            {p.title}
                          </h3>
                        </div>
                        <p className="text-[var(--color-text-muted)] text-lg leading-relaxed">
                          {p.proof}
                        </p>
                        <div className="mt-7 border-l-2 border-[var(--color-primary-500)] pl-5">
                          <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-subtle)] mb-1.5">
                            {p.metricEyebrow}
                          </p>
                          <p className="text-lg text-[var(--color-text)] leading-snug">
                            {p.metric}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* Progress indicator - editorial, not a slider. */}
            <div
              className="mt-10 flex items-center gap-2"
              aria-hidden
            >
              {PILLARS.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-[3px] rounded-full motion-safe:transition-[width,background-color] motion-safe:duration-[var(--duration-base)] motion-safe:ease-out",
                    i === active
                      ? "w-12 bg-[var(--color-brand)]"
                      : "w-6 bg-[var(--color-border)]",
                  )}
                />
              ))}
              <span className="ml-3 text-xs tabular-nums text-[var(--color-text-subtle)]">
                {String(active + 1).padStart(2, "0")} / {String(PILLARS.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </aside>

        {/* Scrolling image column */}
        <ol className="lg:col-span-7 flex flex-col gap-12 xl:gap-16">
          {PILLARS.map((p, i) => (
            <li key={p.title} ref={setRef(i)}>
              <Reveal>
                <figure className="relative aspect-[4/3] max-h-[70vh] w-full rounded-3xl overflow-hidden bg-[var(--color-neutral-900)] shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)]">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                  {/* Corner marker - a rule, not a card */}
                  <figcaption className="absolute left-5 top-5 inline-flex items-center gap-2.5 rounded-full bg-black/55 backdrop-blur-sm px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white">
                    <span className="tabular-nums font-semibold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="opacity-50">·</span>
                    <span className="opacity-90">{p.title}</span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      {/* ───────── Mobile / tablet: stacked editorial rows ───────── */}
      <ol className="lg:hidden flex flex-col gap-10 md:gap-12">
        {PILLARS.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal as="li" key={p.title} delay={i * 60}>
              <motion.figure
                whileHover={
                  reduced
                    ? undefined
                    : { y: -4, transition: { type: "spring", stiffness: 400, damping: 28 } }
                }
                className="group relative aspect-[4/3] max-h-[60vh] w-full rounded-2xl overflow-hidden bg-[var(--color-neutral-900)] mb-6 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.25)] hover:shadow-[0_22px_60px_-20px_rgba(15,23,42,0.4)] transition-shadow"
              >
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                />
                <figcaption className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/55 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white">
                  <span className="tabular-nums font-semibold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="opacity-50">·</span>
                  <span className="opacity-90">{p.title}</span>
                </figcaption>
              </motion.figure>
              <div className="flex items-start gap-5">
                <span
                  aria-hidden
                  className="shrink-0 font-display font-bold text-5xl md:text-6xl text-[var(--color-brand)] tabular-nums leading-none tracking-[-0.02em]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2.5 mb-2">
                    <motion.span
                      whileHover={
                        reduced
                          ? undefined
                          : { rotate: 8, scale: 1.15, transition: { type: "spring", stiffness: 400, damping: 18 } }
                      }
                      className="inline-flex"
                    >
                      <Icon
                        className="h-5 w-5 text-[var(--color-brand)] shrink-0"
                        aria-hidden
                      />
                    </motion.span>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-[var(--color-text)] leading-tight">
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    {p.proof}
                  </p>
                  <div className="mt-5 border-l-2 border-[var(--color-primary-500)] pl-4">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-subtle)] mb-1">
                      {p.metricEyebrow}
                    </p>
                    <p className="text-base text-[var(--color-text)] leading-snug">
                      {p.metric}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ol>

      {/* ───────── Footer row - CTA + certification ───────── */}
      <Reveal delay={80}>
        <div className="mt-20 md:mt-24 pt-10 border-t border-[var(--color-border)]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <Link
              href="/service"
              className="inline-flex items-center gap-1.5 text-sm md:text-base font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] underline underline-offset-4 decoration-2 decoration-[var(--color-brand-soft)] hover:decoration-[var(--color-brand)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 rounded"
            >
              See our full service promise
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <p className="text-xs text-[var(--color-text-subtle)]">
              ARAI-approved · Made in India
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
