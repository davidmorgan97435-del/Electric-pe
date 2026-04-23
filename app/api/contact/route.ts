import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation/booking";
import { getClientIp, rateLimit } from "@/lib/analytics/rate-limit";
import { postLeadToZoho } from "@/lib/integrations/zoho-crm";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`contact:${ip}`, 5, 60_000);
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

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { name, phone, email, topic, message } = parsed.data;
  const reference = `CT-${Date.now().toString(36).toUpperCase()}`;

  await postLeadToZoho({
    source: `contact-${topic}`,
    name,
    phone,
    email,
    notes: message,
    meta: { reference, topic },
  });

  return NextResponse.json({ ok: true, reference });
}
