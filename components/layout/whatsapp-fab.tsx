"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/utils/whatsapp";
import { cn } from "@/lib/utils/cn";

const HIDDEN_PATHS = ["/privacy", "/terms", "/returns", "/warranty"];

export function WhatsAppFab() {
  const pathname = usePathname();
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (HIDDEN_PATHS.includes(pathname)) return null;

  return (
    <a
      href={buildWhatsAppLink(undefined, pathname)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={cn(
        "fixed bottom-20 md:bottom-6 right-5 z-[var(--z-fab)]",
        "inline-flex items-center justify-center h-14 w-14 rounded-full",
        "bg-[var(--color-whatsapp)] text-white shadow-[var(--shadow-lg)]",
        "transition-all duration-[var(--duration-slow)] ease-[var(--ease-standard)]",
        "hover:scale-105 hover:shadow-[var(--shadow-xl)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none",
      )}
    >
      <MessageCircle className="h-6 w-6" aria-hidden />
      <span className="sr-only">Chat on WhatsApp</span>
    </a>
  );
}
