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
 * Renders the supplied `value` string verbatim into the server-rendered
 * HTML so crawlers (and users with JS disabled) see the real number —
 * never "0". After hydration, if the user scrolls the element into view
 * and motion is allowed, a brief count-up animation overlays the final
 * value as a visual flourish; the count-up never overwrites SSR text on
 * the first paint.
 *
 * The numeric part is parsed out of `value` so labels like "10,000+"
 * keep their prefix/suffix during the ramp.
 *
 * Respects prefers-reduced-motion: skips the ramp entirely.
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

  // Track whether the client has hydrated and we should swap to the
  // animated display. Until then we render the final value as plain text
  // so server-rendered HTML matches the first client paint.
  const [hydrated, setHydrated] = React.useState(false);
  const [text, setText] = React.useState<string>(num === null ? value : formatInt(num));
  const count = useMotionValue(num ?? 0);
  const display = useTransform(count, (v) => formatInt(v));

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (num === null) return;
    if (reduced) {
      setText(formatInt(num));
      return;
    }
    if (!inView) return;
    count.set(0);
    setText("0");
    const controls = animate(count, num, {
      duration,
      ease: [0.2, 0.8, 0.2, 1],
    });
    const unsub = display.on("change", (v) => setText(v));
    return () => {
      controls.stop();
      unsub();
      setText(formatInt(num));
    };
  }, [num, inView, count, display, duration, reduced]);

  if (num === null) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  // SSR / pre-hydration: render the real, final value verbatim so the
  // HTML payload contains "10,000+", "30+", "200,000+" — never "0+".
  if (!hydrated) {
    return (
      <span ref={ref} className={className}>
        {prefix}
        {formatInt(num)}
        {suffix}
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
