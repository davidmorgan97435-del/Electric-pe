/**
 * Thin WhatsApp Business Cloud API wrapper.
 *
 * Sends pre-approved template messages. Template names must be
 * registered and approved in Meta Business Manager before use.
 *
 * Fails gracefully if env vars are absent - the UI flow still
 * completes (Zoho webhook + email fire independently).
 */

type TemplateParam = { type: "text"; text: string };

type SendTemplateInput = {
  to: string; // E.164-formatted phone, e.g. "919876543210"
  templateName: string;
  languageCode?: string;
  params: TemplateParam[];
};

export async function sendWhatsAppTemplate(
  input: SendTemplateInput,
): Promise<{ ok: boolean; error?: string }> {
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!phoneId || !token) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        `[whatsapp] Skipping template ${input.templateName} - env vars missing (dev mode).`,
      );
    }
    return { ok: true };
  }

  const body = {
    messaging_product: "whatsapp",
    to: input.to,
    type: "template",
    template: {
      name: input.templateName,
      language: { code: input.languageCode ?? "en" },
      components: input.params.length
        ? [{ type: "body", parameters: input.params }]
        : undefined,
    },
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v19.0/${phoneId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: text.slice(0, 200) };
    }
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "unknown error",
    };
  }
}

export const WHATSAPP_TEMPLATES = {
  testRideConfirmed: "test_ride_confirmed",
  testRideReminder: "test_ride_reminder_24h",
  serviceBookingConfirmed: "service_booking_confirmed",
  savingsReportReady: "savings_report_ready",
} as const;
