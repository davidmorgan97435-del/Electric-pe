"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Scroll-reveal primitive.
 *
 * Uses IntersectionObserver to fade-and-lift the children into place
 * when they enter the viewport. Only triggers once. Subtle by design -
 * 16px rise, 500ms, standard ease. No startup hype.
 *
 * Respects prefers-reduced-motion: when enabled, the element renders
 * at rest without animating, exactly as the client spec demands.
 */

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms before the reveal begins (for staggered sibling reveals). */
  delay?: number;
  /** Translate distance in px. Default 16. */
  distance?: number;
  /** Intersection threshold (0–1). Default 0.12. */
  threshold?: number;
  as?: React.ElementType;
  /** Root margin: when should the observer trigger? Default -80px bottom. */
  rootMargin?: string;
};

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 16,
  threshold = 0.12,
  as: Component = "div",
  rootMargin = "0px 0px -80px 0px",
}: Props) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Bypass the animation entirely for reduced-motion users.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
            break;
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <Component
      ref={ref as React.Ref<HTMLDivElement>}
      style={{
        transform: visible ? "translate3d(0,0,0)" : `translate3d(0,${distance}px,0)`,
        opacity: visible ? 1 : 0,
        transition: `transform 500ms cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms, opacity 500ms cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}ms`,
        willChange: visible ? "auto" : "transform, opacity",
      }}
      className={className}
    >
      {children}
    </Component>
  );
}

/**
 * Stagger - wraps a list of children and gives each one an incremental
 * delay so they cascade into view naturally.
 */
export function RevealStagger({
  children,
  step = 80,
  className,
  ...rest
}: {
  children: React.ReactNode;
  step?: number;
  className?: string;
} & Omit<Props, "delay" | "children" | "className">) {
  const items = React.Children.toArray(children);
  return (
    <div className={cn(className)}>
      {items.map((child, i) => (
        <Reveal key={i} delay={i * step} {...rest}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
