import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-semibold whitespace-nowrap select-none",
    "rounded-lg transition-all duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2",
    "active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-brand)] text-white shadow-[var(--shadow-xs)] hover:bg-[var(--color-brand-hover)] hover:-translate-y-[1px] hover:shadow-[var(--shadow-sm)]",
        secondary:
          "bg-[var(--color-surface-sunken)] text-[var(--color-text)] hover:bg-[var(--color-neutral-200)]",
        outline:
          "border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-surface-muted)] hover:border-[var(--color-brand)]",
        ghost:
          "text-[var(--color-text)] hover:bg-[var(--color-surface-sunken)]",
        link: "text-[var(--color-brand)] underline-offset-4 hover:underline",
        danger:
          "bg-[var(--color-danger)] text-white hover:opacity-90",
        whatsapp:
          "bg-[var(--color-whatsapp)] text-white shadow-[var(--shadow-xs)] hover:opacity-95",
      },
      size: {
        sm: "h-9 px-3 text-sm gap-1.5",
        md: "h-11 px-5 text-base",
        lg: "h-13 px-6 text-base",
        icon: "h-11 w-11",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      leadingIcon,
      trailingIcon,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const leading = loading ? (
      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
    ) : (
      leadingIcon
    );
    const trailing = !loading ? trailingIcon : null;

    const classes = cn(buttonVariants({ variant, size, fullWidth }), className);

    // Radix Slot requires exactly one child, so when `asChild` is used
    // we clone the child element and inject icons inside its children.
    // This keeps the `<Button asChild leadingIcon={...} trailingIcon={...}><Link>...</Link></Button>`
    // ergonomics while respecting Slot's single-child invariant.
    if (asChild) {
      const onlyChild = React.Children.only(children) as React.ReactElement<{
        children?: React.ReactNode;
      }>;
      const mergedChild = React.cloneElement(onlyChild, {
        children: (
          <>
            {leading}
            {onlyChild.props.children}
            {trailing}
          </>
        ),
      });
      return (
        <Slot
          ref={ref as React.Ref<HTMLElement>}
          className={classes}
          data-loading={loading || undefined}
          {...props}
        >
          {mergedChild}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled ?? loading}
        data-loading={loading || undefined}
        type={type}
        {...props}
      >
        {leading}
        {children}
        {trailing}
      </button>
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
