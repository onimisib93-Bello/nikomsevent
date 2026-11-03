import { newsletterSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const parsed = newsletterSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }
  // TODO: add to the mailing list provider (Mailchimp, Resend Audiences, etc.).
  console.info("[newsletter]", parsed.data.email);
  return Response.json({ ok: true });
}
