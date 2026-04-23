import { NextResponse } from "next/server";
import { partnershipLeadSchema } from "@/lib/validation/booking";
import { getClientIp, rateLimit } from "@/lib/analytics/rate-limit";
import { postLeadToZoho } from "@/lib/integrations/zoho-crm";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`partnership:${ip}`, 5, 60_000);
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

  const parsed = partnershipLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const input = parsed.data;
  const reference = `PT-${Date.now().toString(36).toUpperCase()}`;

  await postLeadToZoho({
    source: `partnership-${input.type}`,
    name: input.contactName,
    phone: input.phone,
    email: input.email,
    notes: `${input.companyName}${input.role ? ` · ${input.role}` : ""}. ${input.message ?? ""}`,
    meta: {
      reference,
      company: input.companyName,
      type: input.type,
      ...input.extra,
    },
  });

  return NextResponse.json({ ok: true, reference });
}
