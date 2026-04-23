import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Compose class names safely.
 * Merges Tailwind utilities (tw-merge resolves conflicts) and filters falsy values (clsx).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
