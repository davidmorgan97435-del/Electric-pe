"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { Calendar, MapPin, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { globals } from "@/content/globals";
import { buildWhatsAppLink, WHATSAPP_DEFAULTS } from "@/lib/utils/whatsapp";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * HP-09 - Final CTA strip.
 *
 * Spec says: headline + three action buttons. No extra text. Earlier
 * build wrapped each action in its own nested glass card - repeating
 * the card treatment already used heavily above the fold.
 *
 * This rewrite ships the three actions as inline rows separated by
 * thin rules. One cohesive strip, three tap targets, zero card chrome.
 */

export function FinalCta() {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      aria-labelledby="final-cta-heading"
      className="relative bg-gradient-brand text-white overflow-hidden"
    >
      {/* Floating ambient orbs - slow drift, decorative only. */}
      {!reduced && (
        <>
          <motion.div
            aria-hidden
            className="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,255,255,0.18), transparent 70%)",
            }}
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-40 -right-24 w-[460px] h-[460px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,255,255,0.14), transparent 70%)",
            }}
            animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
      <Container>
        <div className="py-20 md:py-24 lg:py-28 relative">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={
              reduced ? undefined : inView ? { opacity: 1, y: 0 } : undefined
            }
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h2
              id="final-cta-heading"
              className="text-display-lg font-display text-white"
            >
              Ready to make the switch?
            </h2>
          </motion.div>

          <motion.ul
            className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20 border-t border-b border-white/20"
            aria-label="How to get started"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.12, delayChildren: 0.25 },
              },
            }}
            initial={reduced ? false : "hidden"}
            animate={
              !reduced && inView ? "visible" : reduced ? undefined : "hidden"
            }
          >
            <ActionRow
              icon={Calendar}
              label="Book a Test Ride"
              sub="Doorstep or at our store"
              href="/book-test-ride"
              magnetic
            />
            <ActionRow
              icon={MapPin}
              label="Find a Store"
              sub="126+ Mobility Centers"
              href="/stores"
            />
            <ActionRow
              icon={MessageCircle}
              label="Talk to us"
              sub="WhatsApp, any day"
              href={buildWhatsAppLink(WHATSAPP_DEFAULTS.general, "final-cta")}
              external
            />
          </motion.ul>

          <motion.div
            className="mt-10 flex items-center justify-center"
            initial={reduced ? false : { opacity: 0 }}
            animate={reduced ? undefined : inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
          >
            <a
              href={`tel:${globals.supportPhone}`}
              className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium text-sm md:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand)] rounded px-2 py-1"
            >
              <Phone className="h-4 w-4" aria-hidden />
              Prefer to call? {globals.supportPhone}
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function ActionRow({
  icon: Icon,
  label,
  sub,
  href,
  external,
  magnetic,
}: {
  icon: React.ElementType;
  label: string;
  sub: string;
  href: string;
  external?: boolean;
  /** When true, the row's contents drift toward the cursor while hovered.
      Used on the primary CTA only - overusing this on every row would be
      noisy. */
  magnetic?: boolean;
}) {
  const reduced = useReducedMotion();
  const linkRef = React.useRef<HTMLAnchorElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 15, mass: 0.2 });
  const sy = useSpring(my, { stiffness: 150, damping: 15, mass: 0.2 });

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (reduced || !magnetic) return;
      const el = linkRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Strength clamped to ±12px so the row never flies far from its rule.
      mx.set(Math.max(-12, Math.min(12, (e.clientX - cx) * 0.18)));
      my.set(Math.max(-8, Math.min(8, (e.clientY - cy) * 0.18)));
    },
    [mx, my, reduced, magnetic],
  );

  const handleMouseLeave = React.useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  const InnerMotion = (
    <motion.span
      className="group flex items-center justify-between gap-6 py-8 md:py-10 px-4 md:px-8 h-full transition-colors hover:bg-white/[0.06] focus-visible:bg-white/[0.08] focus-visible:outline-none"
      style={magnetic && !reduced ? { x: sx, y: sy } : undefined}
    >
      <span className="flex items-center gap-4 md:gap-5 min-w-0">
        <Icon
          className="h-6 w-6 md:h-7 md:w-7 text-white/80 shrink-0 transition-transform duration-[var(--duration-base)] group-hover:scale-110"
          aria-hidden
        />
        <span className="min-w-0">
          <span className="block font-display text-lg md:text-xl font-bold text-white truncate">
            {label}
          </span>
          <span className="block text-sm text-white/75 truncate">{sub}</span>
        </span>
      </span>
      <ArrowRight
        className="h-5 w-5 text-white/70 shrink-0 transition-transform duration-[var(--duration-base)] group-hover:translate-x-1 group-hover:text-white"
        aria-hidden
      />
    </motion.span>
  );

  const linkClassName =
    "block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand)]";

  return (
    <motion.li
      className="m-0"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: EASE },
        },
      }}
    >
      {external ? (
        <a
          ref={linkRef}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={linkClassName}
        >
          {InnerMotion}
        </a>
      ) : (
        <Link
          ref={linkRef}
          href={href}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={linkClassName}
        >
          {InnerMotion}
        </Link>
      )}
    </motion.li>
  );
}
