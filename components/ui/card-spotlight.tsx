"use client";

/**
 * CardSpotlight — website-factory component.
 * Radial spotlight that follows the cursor inside the card.
 * Subtle, premium hover effect without being flashy.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

export function CardSpotlight({
  children,
  className,
  color = "rgba(18, 183, 106, 0.18)",
  radius = 400,
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
  radius?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  function move(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={move}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-shadow duration-[var(--duration-base)] hover:shadow-[var(--shadow-md)] hover:border-[var(--color-brand-border)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[var(--duration-base)] group-hover:opacity-100"
        style={{
          background: `radial-gradient(${radius}px circle at var(--mx, 50%) var(--my, 50%), ${color}, transparent 45%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
