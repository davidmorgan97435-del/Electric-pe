"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle, Calendar } from "lucide-react";
import { globals } from "@/content/globals";
import { buildWhatsAppLink, WHATSAPP_DEFAULTS } from "@/lib/utils/whatsapp";
import { cn } from "@/lib/utils/cn";

const HIDDEN_PATHS = [
  "/book-test-ride",
  "/privacy",
  "/terms",
  "/returns",
  "/warranty",
];

export function MobileBottomBar() {
  const pathname = usePathname();
  const [hidden, setHidden] = React.useState(false);
  const lastY = React.useRef(0);

  React.useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      if (Math.abs(dy) > 8) {
        setHidden(dy > 0 && y > 120);
        lastY.current = y;
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (HIDDEN_PATHS.includes(pathname)) return null;

  return (
    <div
      className={cn(
        "md:hidden fixed bottom-0 left-0 right-0 z-[var(--z-sticky)]",
        "bg-white border-t border-[var(--color-border)]",
        "shadow-[0_-4px_12px_rgba(16,24,40,0.08)]",
        "transition-transform duration-[var(--duration-base)] ease-[var(--ease-standard)]",
        hidden ? "translate-y-full" : "translate-y-0",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <nav
        className="grid grid-cols-3 h-16"
        aria-label="Primary actions"
      >
        <a
          href={`tel:${globals.supportPhone}`}
          className="flex flex-col items-center justify-center gap-1 text-xs font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-muted)] transition-colors"
        >
          <Phone className="h-5 w-5" aria-hidden />
          <span>Call</span>
        </a>
        <a
          href={buildWhatsAppLink(WHATSAPP_DEFAULTS.general, pathname)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 text-xs font-medium text-[var(--color-text)] hover:bg-[var(--color-surface-muted)] transition-colors border-x border-[var(--color-border)]"
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
          <span>WhatsApp</span>
        </a>
        <Link
          href="/book-test-ride"
          className="flex flex-col items-center justify-center gap-1 text-xs font-semibold bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hover)] transition-colors"
        >
          <Calendar className="h-5 w-5" aria-hidden />
          <span>Test Ride</span>
        </Link>
      </nav>
    </div>
  );
}
