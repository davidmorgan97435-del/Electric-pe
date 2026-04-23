import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      aria-invalid={error || undefined}
      className={cn(
        "flex h-11 w-full rounded-lg border bg-[var(--color-surface)] px-3.5 py-2 text-base",
        "text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)]",
        "transition-colors duration-[var(--duration-fast)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-60",
        error
          ? "border-[var(--color-danger)]"
          : "border-[var(--color-border-strong)] hover:border-[var(--color-neutral-400)]",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
