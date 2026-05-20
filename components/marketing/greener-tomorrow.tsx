"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";

/**
 * GreenerTomorrow - sustainability impact band.
 *
 * Full-bleed aerial-forest photograph with a cinematic headline and
 * three environmental-impact stats overlaid. Same composition pattern
 * Okinawa / Kinetic Green use on their homepages, adapted to the
 * ElectricPe brand (brand-green accent word, neutral typography,
 * line-art icons that don't fight the image).
 *
 * Motion: subtle fade-up on scroll. Respects prefers-reduced-motion.
 * Image served from /public/img/scenes/greener-tomorrow.webp (aerial
 * forest road, licensed from Unsplash).
 */

type Impact = {
  value: string;
  label: string;
  icon: React.ReactNode;
};

const IMPACTS: Impact[] = [
  {
    value: "10,000+",
    label: "Riders on Indian roads",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10"
        aria-hidden
      >
        <circle cx="12" cy="32" r="7" />
        <circle cx="36" cy="32" r="7" />
        <path d="M12 32 L20 16 L30 16 L36 32" />
        <path d="M20 16 L16 12 L22 12" />
        <path d="M30 16 L34 10" />
        <circle cx="36" cy="10" r="2" />
      </svg>
    ),
  },
  {
    value: "₹4 Cr+*",
    label: "Saved on fuel by our community",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10"
        aria-hidden
      >
        <rect x="8" y="12" width="32" height="24" rx="3" />
        <path d="M8 20 L40 20" />
        <path d="M20 30 h8" />
        <circle cx="15" cy="28" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    value: "2,00,000+ kg*",
    label: "CO₂ avoided this year",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10"
        aria-hidden
      >
        <path d="M14 28 a6 6 0 0 1 3-11.6 a8 8 0 0 1 15 1.6 a5 5 0 0 1 1 10 Z" />
        <text
          x="24"
          y="34"
          fontSize="7"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
          stroke="none"
          fill="currentColor"
          textAnchor="middle"
        >
          CO₂
        </text>
      </svg>
    ),
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function GreenerTomorrow() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-labelledby="greener-heading"
      className="relative isolate w-full overflow-hidden min-h-[680px] md:min-h-[760px] lg:min-h-[820px]"
    >
      {/* Background image - full-bleed aerial forest road */}
      <Image
        src="/img/scenes/greener-tomorrow.webp"
        alt=""
        fill
        priority={false}
        quality={85}
        sizes="100vw"
        className="object-cover object-center -z-10 select-none"
      />

      {/* Dual gradient overlay for text legibility + cinematic depth */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(4,12,8,0.55) 0%, rgba(4,12,8,0.25) 40%, rgba(4,12,8,0.60) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 100%, rgba(4,12,8,0.45) 0%, transparent 55%)",
        }}
      />

      {/* Thin brand-green accent bar at the top */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] bg-[var(--color-primary-500)]"
      />

      <Container className="relative z-10">
        <div className="pt-24 md:pt-28 lg:pt-32 pb-20 md:pb-24 lg:pb-28">
          <motion.h2
            id="greener-heading"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{ duration: reduced ? 0 : 0.7, ease: EASE }}
            className="text-center mx-auto max-w-4xl font-display font-semibold text-white leading-[1.1] tracking-[-0.01em]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.75rem)" }}
          >
            Sustainable today for a{" "}
            <span className="text-[var(--color-primary-400)] italic font-normal">
              greener
            </span>{" "}
            tomorrow.
          </motion.h2>

          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{
              duration: reduced ? 0 : 0.7,
              delay: reduced ? 0 : 0.15,
              ease: EASE,
            }}
            className="mt-5 text-center mx-auto max-w-2xl text-sm md:text-base text-white/75 leading-relaxed"
          >
            Every kilometre on an ElectricPe is a kilometre without petrol
            fumes. Here&apos;s what our riders have done together.
          </motion.p>

          <ul className="mt-20 md:mt-24 lg:mt-28 grid grid-cols-1 md:grid-cols-3 gap-y-14 md:gap-y-0 md:gap-x-10 lg:gap-x-12 md:divide-x divide-white/15">
            {IMPACTS.map((impact, i) => (
              <motion.li
                key={impact.label}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{
                  duration: reduced ? 0 : 0.65,
                  delay: reduced ? 0 : 0.3 + i * 0.12,
                  ease: EASE,
                }}
                className="flex flex-col items-center text-center px-4 md:px-8"
              >
                <span className="text-white/85 mb-6 md:mb-7">{impact.icon}</span>
                <p
                  className="font-display font-semibold text-[var(--color-primary-400)] tracking-tight leading-none tabular-nums"
                  style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)" }}
                >
                  {impact.value}
                </p>
                <p className="mt-4 md:mt-5 text-sm md:text-base text-white leading-snug max-w-[22ch]">
                  {impact.label}
                </p>
              </motion.li>
            ))}
          </ul>

          <p className="mt-16 md:mt-20 text-center text-[11px] md:text-xs text-white/55 max-w-2xl mx-auto leading-relaxed">
            * Approximate totals, based on our rider-reported kilometres and
            average petrol-scooter mileage. Verifiable at any ElectricPe
            Mobility Center.
          </p>
        </div>
      </Container>
    </section>
  );
}
