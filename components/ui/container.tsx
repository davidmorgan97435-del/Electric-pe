import * as React from "react";
import { cn } from "@/lib/utils/cn";

export function Container({
  className,
  children,
  as: Component = "div",
  size = "xl",
}: {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  size?: "md" | "lg" | "xl" | "2xl";
}) {
  const maxWidths = {
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-[1280px]",
    "2xl": "max-w-[1440px]",
  };
  return (
    <Component
      className={cn(
        "w-full mx-auto px-4 md:px-6 lg:px-8",
        maxWidths[size],
        className,
      )}
    >
      {children}
    </Component>
  );
}
