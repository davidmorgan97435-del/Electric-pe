import { globals } from "@/content/globals";

/**
 * Build a WhatsApp deep link with a pre-filled message.
 * Adds source page context so the store executive sees where the lead came from.
 */
export function buildWhatsAppLink(context?: string, path = ""): string {
  const base = `https://wa.me/${globals.whatsappNumber}`;
  const defaultText =
    "Hi! I'm interested in learning more about ElectricPe electric scooters.";
  const text = context ?? defaultText;
  const withPath = path ? `${text} (from: ${path})` : text;
  return `${base}?text=${encodeURIComponent(withPath)}`;
}

export const WHATSAPP_DEFAULTS = {
  testRide: "Hi! I'd like to book a free test ride.",
  service: "Hi! I need service for my ElectricPe scooter.",
  emi: "Hi! I'd like to know more about EMI options.",
  partnership: "Hi! I'm interested in an ElectricPe partnership.",
  general: "Hi! I have a question about ElectricPe.",
} as const;
