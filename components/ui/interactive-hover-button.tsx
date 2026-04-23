"use client";

/**
 * InteractiveHoverButton — website-factory component.
 * Brand-dot expands to fill the button on hover while the label
 * slides out and is replaced by a mirrored label + arrow. Delightful
 * but subtle, not flashy.
 *
 * Adapted to ElectricPe tokens: brand green fill, white fg on hover.
 */

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: false;
}

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  Props
>(({ children, className, type = "button", ...rest }, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "group relative inline-flex w-auto cursor-pointer overflow-hidden rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-6 py-2.5 text-sm md:text-base font-semibold text-[var(--color-text)]",
        "transition-colors duration-[var(--duration-base)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2",
        className,
      )}
      {...rest}
    >
      <span className="flex items-center gap-2 whitespace-nowrap">
        <span className="h-2 w-2 rounded-full bg-[var(--color-brand)] transition-all duration-[400ms] ease-[var(--ease-standard)] group-hover:scale-[120]" />
        <span className="inline-block transition-all duration-[300ms] group-hover:translate-x-6 group-hover:opacity-0">
          {children}
        </span>
      </span>
      <span
        aria-hidden
        className="absolute inset-0 z-10 flex translate-x-8 items-center justify-center gap-2 text-white opacity-0 transition-all duration-[300ms] group-hover:translate-x-0 group-hover:opacity-100"
      >
        <span>{children}</span>
        <ArrowRight className="h-4 w-4" />
      </span>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
