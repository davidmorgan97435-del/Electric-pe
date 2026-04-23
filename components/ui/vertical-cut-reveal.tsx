"use client";

/**
 * VerticalCutReveal — website-factory component.
 * Splits a phrase into words and reveals each by sliding from below a
 * clipped line. Great for hero/section headlines.
 *
 * Copied verbatim from ~/.claude/skills/website-factory/data/components/
 * with a tweak to import `cn` from our canonical barrel file.
 */

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface VerticalCutRevealProps {
  children: string;
  staggerDuration?: number;
  staggerFrom?: "first" | "center";
  className?: string;
  wordClassName?: string;
}

export function VerticalCutReveal({
  children,
  staggerDuration = 0.08,
  staggerFrom = "first",
  className,
  wordClassName,
}: VerticalCutRevealProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  const words = children.split(" ");
  const total = words.length;

  function getDelay(index: number): number {
    if (staggerFrom === "first") return index * staggerDuration;
    const center = Math.floor(total / 2);
    return Math.abs(center - index) * staggerDuration;
  }

  return (
    <span ref={ref} className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, i) => (
        <span
          key={i}
          className={cn(
            "inline-flex overflow-hidden pb-[0.12em] mr-[0.28em] last:mr-0",
            wordClassName,
          )}
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={reduced ? { y: 0 } : { y: "110%" }}
            animate={inView || reduced ? { y: 0 } : { y: "110%" }}
            transition={{
              type: "spring",
              stiffness: 190,
              damping: 22,
              delay: reduced ? 0 : getDelay(i),
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
