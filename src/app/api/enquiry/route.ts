import { enquirySchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const parsed = enquirySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Invalid enquiry", issues: parsed.error.issues }, { status: 400 });
  }
  // TODO: forward to the events desk (Resend, Formspree, WhatsApp Business API or a CRM).
  console.info("[enquiry]", parsed.data);
  return Response.json({ ok: true });
}
