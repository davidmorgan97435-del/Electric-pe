import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { Container } from "./container";

export function Section({
  as: Component = "section",
  className,
  containerClassName,
  size = "xl",
  id,
  children,
}: {
  as?: React.ElementType;
  className?: string;
  containerClassName?: string;
  size?: "md" | "lg" | "xl" | "2xl";
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <Component id={id} className={cn("py-20 md:py-24 lg:py-28", className)}>
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </Component>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl mb-12 md:mb-16 lg:mb-20",
        align === "center" ? "mx-auto text-center" : "",
        className,
      )}
    >
      {eyebrow && <p className="text-eyebrow mb-4">{eyebrow}</p>}
      <h2 className="text-display-lg text-[var(--color-text)]">{title}</h2>
      {description && (
        <p className="mt-5 text-[var(--color-text-muted)] text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
