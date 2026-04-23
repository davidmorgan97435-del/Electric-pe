"use client";

import * as React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { globals } from "@/content/globals";

export function AnnouncementBar() {
  const { enabled, text, ctaText, ctaHref, dismissKey } = globals.announcementBar;
  const [dismissed, setDismissed] = React.useState(true);

  React.useEffect(() => {
    if (!enabled) return;
    setDismissed(localStorage.getItem(`ann-${dismissKey}`) === "1");
  }, [enabled, dismissKey]);

  if (!enabled || dismissed) return null;

  const close = () => {
    localStorage.setItem(`ann-${dismissKey}`, "1");
    setDismissed(true);
  };

  return (
    <div className="relative bg-gradient-brand text-white text-sm">
      <div className="container-page flex items-center justify-center gap-3 py-2.5 pr-10 md:pr-4">
        <p className="text-center">
          <span className="font-medium">{text}</span>
          {ctaHref && ctaText && (
            <Link
              href={ctaHref}
              className="ml-2 underline underline-offset-4 font-semibold hover:opacity-90"
            >
              {ctaText} →
            </Link>
          )}
        </p>
        <button
          type="button"
          onClick={close}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
