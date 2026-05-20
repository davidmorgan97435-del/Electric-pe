/**
 * GridPattern - website-factory component.
 * SVG grid pattern with a soft radial mask. Drop behind hero or
 * section content for subtle depth.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

export function GridPattern({
  size = 40,
  strokeColor = "rgba(148, 163, 184, 0.18)",
  className,
  maskShape = "ellipse",
}: {
  size?: number;
  strokeColor?: string;
  className?: string;
  maskShape?: "ellipse" | "circle" | "none";
}) {
  const mask =
    maskShape === "none"
      ? undefined
      : `radial-gradient(${maskShape} at center, black 40%, transparent 100%)`;
  const patternId = React.useId();

  return (
    <svg
      className={cn(
        "absolute inset-0 w-full h-full pointer-events-none",
        className,
      )}
      aria-hidden
      style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
    >
      <defs>
        <pattern
          id={patternId}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${size} 0 L 0 0 0 ${size}`}
            fill="none"
            stroke={strokeColor}
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
