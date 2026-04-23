import { NextResponse } from "next/server";
import { serviceRequestSchema } from "@/lib/validation/booking";
import { getClientIp, rateLimit } from "@/lib/analytics/rate-limit";
import { postLeadToZoho } from "@/lib/integrations/zoho-crm";
import {
  sendWhatsAppTemplate,
  WHATSAPP_TEMPLATES,
} from "@/lib/integrations/whatsapp-business";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`service:${ip}`, 5, 60_000);
  if (!limited.success) {
    return NextResponse.json(
      { ok: false, error: "Too many requests." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = serviceRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const input = parsed.data;
  const reference = `SR-${Date.now().toString(36).toUpperCase()}`;

  await Promise.allSettled([
    postLeadToZoho({
      source: "service-request",
      name: input.name,
      phone: input.phone,
      email: input.email || undefined,
      city: input.city,
      interest: input.modelSlug,
      notes: `${input.issueType}: ${input.description || "no description"}. Reg: ${input.vinOrReg || "n/a"}.`,
      meta: { reference, issueType: input.issueType },
    }),
    sendWhatsAppTemplate({
      to: input.phone.startsWith("91") ? input.phone : `91${input.phone}`,
      templateName: WHATSAPP_TEMPLATES.serviceBookingConfirmed,
      params: [
        { type: "text", text: input.name },
        { type: "text", text: reference },
      ],
    }),
  ]);

  return NextResponse.json({ ok: true, reference });
}
