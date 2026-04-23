"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MapPin, ShieldCheck, Store, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { TrustBar } from "./trust-bar";

/**
 * HP-01 Hero — centered content over a full-width scooter-lineup strip.
 *
 * Single static image: the ElectricPe lineup (Xypro, Jett, EP, 4ALL and
 * the flagship centrepiece). Showing all five at once communicates the
 * "one brand, every use-case" message in a single glance — more effective
 * than rotating through product shots one at a time.
 *
 * Layout:
 *   • Top: chip + headline + subhead + dual CTAs + trust row, all
 *     centred for symmetry and maximum legibility.
 *   • Bottom: full-width lineup image, bottom-aligned so the scooters
 *     "stand" on the trust bar that overlaps beneath.
 *
 * Motion: fadeUp y=10, ease [0.22, 1, 0.36, 1] (website-factory spec).
 * Respects prefers-reduced-motion.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 0%, #eefaf3 0%, #f5fbf8 35%, #fbfdfc 65%, #ffffff 100%)",
      }}
    >
      {/* Subtle dot-grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(3,152,85,0.7) 1px, transparent 1.5px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* Soft brand glow behind the headline */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] max-w-[1100px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(18,183,106,0.18) 0%, rgba(18,183,106,0.06) 45%, transparent 72%)",
          filter: "blur(10px)",
        }}
      />

      {/* Faint bottom divider */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent"
      />

      <Container size="2xl" className="relative z-10">
        {/* Top content — centered */}
        <div className="pt-14 md:pt-16 lg:pt-20 pb-4 md:pb-6 text-center max-w-4xl mx-auto">
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full bg-white border border-[var(--color-border)] px-3.5 py-1.5 text-xs md:text-sm font-medium text-[var(--color-text)] shadow-[var(--shadow-xs)]"
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
              aria-hidden
            />
            For everyday India
          </motion.span>

          <motion.h1
            id="hero-heading"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.1, ease: EASE }}
            className="mt-5 font-display font-bold text-[var(--color-text)] tracking-[-0.035em] leading-[1.02]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.75rem)" }}
          >
            Electric. <span className="text-[var(--color-brand)]">Affordable.</span>
            <br />
            Yours for life.
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.22, ease: EASE }}
            className="mt-5 max-w-2xl mx-auto text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed"
          >
            India&apos;s most trusted low-speed EV scooters — with stores across
            the city and service you can count on.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.34, ease: EASE }}
            className="mt-7 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              asChild
              size="lg"
              trailingIcon={<ArrowRight className="h-4 w-4" aria-hidden />}
            >
              <Link href="/book-test-ride">Book a Free Test Ride</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              leadingIcon={<MapPin className="h-4 w-4" aria-hidden />}
            >
              <Link href="/stores">Find a Store Near You</Link>
            </Button>
          </motion.div>

          <motion.ul
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.48 }}
            className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[var(--color-text-muted)]"
            aria-label="Trust signals"
          >
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[var(--color-brand)]" aria-hidden />
              3-Year Warranty
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Store className="h-4 w-4 text-[var(--color-brand)]" aria-hidden />
              30+ Mobility Centers
            </li>
            <li className="inline-flex items-center gap-1.5">
              <KeyRound className="h-4 w-4 text-[var(--color-brand)]" aria-hidden />
              No Licence Required
            </li>
          </motion.ul>
        </div>

        {/* Scooter lineup — full-width strip at the bottom */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.5, ease: EASE }}
          className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] lg:h-[440px] mt-2"
        >
          <Image
            src="/img/cutouts/home_hero_section_2-cutout.png"
            alt="The ElectricPe scooter lineup — Xypro, Jett, EP City+ and 4ALL, in every colour."
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-contain object-bottom drop-shadow-[0_24px_28px_rgba(16,24,40,0.14)]"
          />
        </motion.div>

        {/* Trust bar overlap */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.65, ease: EASE }}
          className="relative -mb-10 md:-mb-14 pb-4"
        >
          <TrustBar />
        </motion.div>
      </Container>
    </section>
  );
}
