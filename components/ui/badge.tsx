import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        neutral:
          "bg-[var(--color-surface-sunken)] text-[var(--color-text)]",
        brand:
          "bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)]",
        success:
          "bg-[var(--color-success-soft)] text-[var(--color-brand-pressed)]",
        warning:
          "bg-[var(--color-warning-soft)] text-[color-mix(in_oklab,var(--color-warning),black_20%)]",
        danger:
          "bg-[var(--color-danger-soft)] text-[color-mix(in_oklab,var(--color-danger),black_15%)]",
        info: "bg-[var(--color-info-soft)] text-[color-mix(in_oklab,var(--color-info),black_20%)]",
        outline:
          "border border-[var(--color-border)] bg-transparent text-[var(--color-text-muted)]",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-2.5 py-1",
      },
    },
    defaultVariants: { variant: "neutral", size: "sm" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}
