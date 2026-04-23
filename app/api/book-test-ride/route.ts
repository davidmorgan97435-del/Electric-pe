import { NextResponse } from "next/server";
import { bookTestRideSchema } from "@/lib/validation/booking";
import { getClientIp, rateLimit } from "@/lib/analytics/rate-limit";
import { postLeadToZoho } from "@/lib/integrations/zoho-crm";
import {
  sendWhatsAppTemplate,
  WHATSAPP_TEMPLATES,
} from "@/lib/integrations/whatsapp-business";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`book:${ip}`, 5, 60_000);
  if (!limited.success) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const parsed = bookTestRideSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const input = parsed.data;
  const reference = `TR-${Date.now().toString(36).toUpperCase()}`;

  // Fire integrations in parallel; if any fail, we still confirm the booking
  // (the lead is written to our system regardless).
  const [zohoResult, waResult] = await Promise.allSettled([
    postLeadToZoho({
      source: "test-ride",
      name: input.name,
      phone: input.phone,
      email: input.email || undefined,
      city: input.city,
      interest: input.model,
      notes: `Slot ${input.preferredDate} ${input.preferredSlot}. Currently rides: ${input.currentlyRides}. Store: ${input.storeSlug ?? "any"}.`,
      meta: {
        reference,
        utmSource: input.utm?.source,
        utmMedium: input.utm?.medium,
        utmCampaign: input.utm?.campaign,
      },
    }),
    sendWhatsAppTemplate({
      to: input.phone.startsWith("91") ? input.phone : `91${input.phone}`,
      templateName: WHATSAPP_TEMPLATES.testRideConfirmed,
      params: [
        { type: "text", text: input.name },
        { type: "text", text: reference },
        { type: "text", text: input.preferredDate },
      ],
    }),
  ]);

  return NextResponse.json({
    ok: true,
    reference,
    zoho: zohoResult.status === "fulfilled" && zohoResult.value.ok,
    whatsapp: waResult.status === "fulfilled" && waResult.value.ok,
  });
}
