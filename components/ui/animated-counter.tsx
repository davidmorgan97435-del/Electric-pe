"use client";

import * as React from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";

/**
 * AnimatedCounter
 *
 * Counts up from 0 to the numeric target as soon as the element
 * scrolls into view. Designed for trust-bar stats and savings numbers
 * where a punchy reveal reinforces the claim.
 *
 * The numeric part is extracted from the supplied `value` string so
 * we can render labels like "10,000+" — we animate the 10,000 and
 * concatenate the "+" / " Years" suffix at the end.
 *
 * Respects prefers-reduced-motion: snaps to final value on first render.
 */

type Props = {
  value: string; // e.g. "10,000+" or "3 Years"
  /** Optional className for the enclosing span. */
  className?: string;
  /** Animation duration in seconds. Default 1.4. */
  duration?: number;
};

function parseValue(raw: string): { num: number | null; prefix: string; suffix: string } {
  const match = raw.match(/^([^\d-]*)(-?[\d,]*\.?\d*)(.*)$/);
  if (!match) return { num: null, prefix: "", suffix: raw };
  const [, prefix = "", digits = "", suffix = ""] = match;
  if (!digits) return { num: null, prefix, suffix: suffix || raw };
  const num = Number(digits.replace(/,/g, ""));
  return Number.isFinite(num) ? { num, prefix, suffix } : { num: null, prefix: "", suffix: raw };
}

function formatInt(n: number): string {
  return Math.round(n).toLocaleString("en-IN");
}

export function AnimatedCounter({ value, className, duration = 1.4 }: Props) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduced = useReducedMotion();

  const { num, prefix, suffix } = React.useMemo(() => parseValue(value), [value]);

  const count = useMotionValue(0);
  const display = useTransform(count, (v) => formatInt(v));
  const [text, setText] = React.useState(num === null ? value : "0");

  React.useEffect(() => {
    if (num === null) return;
    if (reduced) {
      setText(formatInt(num));
      return;
    }
    if (!inView) return;
    const controls = animate(count, num, {
      duration,
      ease: [0.2, 0.8, 0.2, 1],
    });
    const unsub = display.on("change", (v) => setText(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [num, inView, count, display, duration, reduced]);

  if (num === null) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      {text}
      {suffix}
    </motion.span>
  );
}
