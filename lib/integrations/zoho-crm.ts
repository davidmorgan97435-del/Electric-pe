/**
 * Zoho CRM lead webhook.
 *
 * Fire-and-forget by design — the user's form submission completes
 * even if Zoho is slow or down. We include an HMAC signature if
 * ZOHO_CRM_WEBHOOK_SECRET is configured so Zoho's Flow can validate
 * the payload server-to-server.
 */

import crypto from "node:crypto";

export type ZohoLead = {
  source: string; // e.g. "test-ride", "contact-form", "service-request"
  name: string;
  phone: string;
  email?: string;
  city?: string;
  interest?: string;
  notes?: string;
  meta?: Record<string, string | number | boolean | undefined>;
};

function sign(body: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(body).digest("hex");
}

export async function postLeadToZoho(
  lead: ZohoLead,
): Promise<{ ok: boolean; error?: string }> {
  const url = process.env.ZOHO_CRM_WEBHOOK_URL;
  const secret = process.env.ZOHO_CRM_WEBHOOK_SECRET;

  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[zoho] Skipping webhook — ZOHO_CRM_WEBHOOK_URL unset (dev).");
    }
    return { ok: true };
  }

  const body = JSON.stringify({
    ...lead,
    createdAt: new Date().toISOString(),
  });

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (secret) headers["x-electricpe-signature"] = sign(body, secret);

  try {
    const res = await fetch(url, { method: "POST", headers, body });
    return { ok: res.ok, error: res.ok ? undefined : `HTTP ${res.status}` };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "unknown error",
    };
  }
}
