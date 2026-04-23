import { NextResponse } from "next/server";
import { careersApplySchema } from "@/lib/validation/booking";
import { getClientIp, rateLimit } from "@/lib/analytics/rate-limit";
import { postLeadToZoho } from "@/lib/integrations/zoho-crm";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`careers:${ip}`, 5, 60_000);
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

  const parsed = careersApplySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const input = parsed.data;
  const reference = `JOB-${Date.now().toString(36).toUpperCase()}`;

  await postLeadToZoho({
    source: `career-${input.jobSlug}`,
    name: input.name,
    phone: input.phone,
    email: input.email,
    notes: `${input.coverNote ?? ""}\nResume: ${input.resumeUrl}`,
    meta: { reference, jobSlug: input.jobSlug, resumeUrl: input.resumeUrl },
  });

  return NextResponse.json({ ok: true, reference });
}
