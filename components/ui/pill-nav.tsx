"use client";

/**
 * PillNav - website-factory component.
 * An animated pill slides behind the active nav item using Framer
 * Motion's shared-layout animation. Use for tab-like navigation.
 *
 * Adapted for ElectricPe: the active pill uses the brand-green fill
 * with white text; inactive items are muted. Each item can include
 * a small counter (e.g. "Bengaluru 5").
 */

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type PillNavItem = {
  label: string;
  count?: number | string;
};

export function PillNav({
  items,
  className,
  activeIndex = 0,
  onChange,
  layoutId = "pill-nav-bg",
}: {
  items: PillNavItem[];
  className?: string;
  activeIndex?: number;
  onChange?: (i: number) => void;
  /** Unique layoutId per instance so multiple PillNavs don't share the pill */
  layoutId?: string;
}) {
  const [active, setActive] = React.useState(activeIndex);

  React.useEffect(() => {
    setActive(activeIndex);
  }, [activeIndex]);

  return (
    <nav
      className={cn(
        "inline-flex items-center rounded-full bg-[var(--color-surface-sunken)] p-1 gap-0.5",
        className,
      )}
      role="tablist"
    >
      {items.map((item, i) => {
        const isActive = active === i;
        return (
          <button
            key={`${item.label}-${i}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => {
              setActive(i);
              onChange?.(i);
            }}
            className={cn(
              "relative rounded-full px-3.5 md:px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2",
              isActive
                ? "text-white"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
            )}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-[var(--color-brand)] shadow-[var(--shadow-xs)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 inline-flex items-center gap-1.5">
              {item.label}
              {item.count !== undefined && (
                <span
                  className={cn(
                    "text-xs font-semibold rounded-full px-1.5 py-0.5 leading-none",
                    isActive
                      ? "bg-white/25 text-white"
                      : "bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]",
                  )}
                >
                  {item.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
