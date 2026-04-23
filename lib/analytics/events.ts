/**
 * Type-safe event tracking for GA4 + Microsoft Clarity.
 * Every user-meaningful action routes through this file so
 * naming stays consistent and easy to audit in GA4.
 *
 * Events stay out of the critical render path — analytics
 * libraries are lazy-loaded in components/layout/analytics.tsx.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

type EventPayload = Record<string, string | number | boolean | undefined>;

export const EVENTS = {
  TEST_RIDE_STARTED: "test_ride_started",
  TEST_RIDE_STEP: "test_ride_step",
  TEST_RIDE_COMPLETED: "test_ride_completed",
  WHATSAPP_CLICK: "whatsapp_click",
  CALL_CLICK: "call_click",
  STORE_LOCATOR_USED: "store_locator_used",
  SAVINGS_CALC_INTERACTED: "savings_calc_interacted",
  SAVINGS_REPORT_REQUESTED: "savings_report_requested",
  EMI_CALC_INTERACTED: "emi_calc_interacted",
  BRAND_PDP_VIEWED: "brand_pdp_viewed",
  PRODUCT_COMPARED: "product_compared",
  CITY_CHANGED: "city_changed",
  NEWSLETTER_SUBSCRIBED: "newsletter_subscribed",
  CONTACT_SUBMITTED: "contact_submitted",
  SERVICE_REQUEST_SUBMITTED: "service_request_submitted",
  APP_DOWNLOAD_CLICK: "app_download_click",
  PARTNERSHIP_LEAD: "partnership_lead",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];

export function track(event: EventName, payload: EventPayload = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", event, payload);
    window.clarity?.("event", event);
  } catch {
    // Analytics failures must never break UX — swallow.
  }
}
