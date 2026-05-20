"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Reveal } from "@/components/ui/reveal";

/**
 * PromiseBand - on-brief "numbers instead of claims" section.
 *
 * Design brief (fixed from the prior overflow bug):
 *   • Light bg - matches the rest of the homepage's light theme.
 *   • Number sizes are *fixed* per breakpoint, NOT fluid beyond a hard
 *     ceiling. 10,000+ fit into a 25% column comfortably at every width.
 *   • Column dividers instead of card chrome.
 *   • Centered heading, constrained line-length.
 *
 * The client brief rule "use numbers instead of claims" is upheld
 * without turning the section into a slab of noise.
 */

type Stat = {
  value: string;
  label: string;
  sublabel: string;
};

const STATS: Stat[] = [
  {
    value: "10,000+",
    label: "Happy owners",
    sublabel: "across 15+ Indian cities",
  },
  {
    value: "30+",
    label: "Mobility Centers",
    sublabel: "growing to 50+ this year",
  },
  {
    value: "24h",
    label: "Service SLA",
    sublabel: "94% met this month",
  },
  {
    value: "Varies",
    label: "Warranty",
    sublabel: "by component, details on inquiry",
  },
];

export function PromiseBand() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="promise-band-heading"
      className="relative bg-[var(--color-surface-muted)] border-y border-[var(--color-border)]"
    >
      <Container>
        <div className="py-16 md:py-20 lg:py-24">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand)] mb-4">
                The numbers behind the promise
              </p>
              <h2
                id="promise-band-heading"
                className="font-display font-bold text-[var(--color-text)] tracking-tight leading-[1.15]"
                style={{ fontSize: "clamp(1.625rem, 3.2vw, 2.5rem)" }}
              >
                We put everything in writing. Then we publish the score.
              </h2>
            </div>
          </Reveal>

          <dl className="mt-12 md:mt-14 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[var(--color-border)]">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{
                  duration: reduced ? 0 : 0.55,
                  delay: reduced ? 0 : i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="px-4 md:px-6 py-7 md:py-8 text-center"
              >
                <dt className="sr-only">
                  {stat.label}: {stat.value}
                </dt>
                <dd>
                  <AnimatedCounter
                    value={stat.value}
                    className="block font-display font-bold text-[var(--color-text)] leading-none tracking-tight tabular-nums text-[2.25rem] sm:text-[2.5rem] md:text-[2.75rem] lg:text-[3rem]"
                    duration={1.6}
                  />
                </dd>
                <p className="mt-3 text-sm md:text-base font-semibold text-[var(--color-text)]">
                  {stat.label}
                </p>
                <p className="mt-1 text-xs md:text-sm text-[var(--color-text-muted)] leading-relaxed max-w-[22ch] mx-auto">
                  {stat.sublabel}
                </p>
              </motion.div>
            ))}
          </dl>

          <Reveal delay={200}>
            <p className="mt-12 md:mt-14 text-center text-sm md:text-base text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed">
              Every one of these is verifiable at any ElectricPe Mobility
              Center. Walk in, ask for the service log, we&apos;ll show you.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
