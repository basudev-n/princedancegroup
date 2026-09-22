// Contact enquiry fallback endpoint. Every form on the site now prefers
// Formspree (see src/lib/submitEnquiry.ts) when NEXT_PUBLIC_FORMSPREE_ID
// is configured — this route only runs when that env var is unset, as an
// honest "not yet connected" response rather than silently no-op-ing or
// pretending to succeed. See ARCHITECTURE.md §8 and TODO.md Phase 0.1.

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  [field: string]: string | undefined;
};

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ message: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone } = payload;
  if (!name || (!email && !phone)) {
    return Response.json(
      { message: "Name and at least one contact method (email or phone) are required." },
      { status: 400 },
    );
  }

  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
    return Response.json(
      {
        message:
          "Enquiry sending isn't connected yet — set NEXT_PUBLIC_FORMSPREE_ID (see .env.example) or RESEND_API_KEY/CONTACT_TO_EMAIL in .env.local, or contact us directly by phone for now.",
      },
      { status: 501 },
    );
  }

  // TODO(integration): once RESEND_API_KEY / CONTACT_TO_EMAIL are set, send
  // the enquiry via the real provider here and return a 200 on success.
  return Response.json(
    { message: "Enquiry sending is configured but not yet implemented." },
    { status: 501 },
  );
}
