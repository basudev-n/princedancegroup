// TODO.md Phase 0.1. Shared submission logic for every enquiry form on the
// site (home/EventEnquiry, contact/EnquiryForm, services/WeddingEnquiryForm,
// layout/BookingModal) — previously each form duplicated its own fetch/
// try-catch/status-branch logic against `/api/contact`. Now:
//
// - If `NEXT_PUBLIC_FORMSPREE_ID` is set, POST directly to Formspree
//   (`https://formspree.io/f/<id>`) as flat named fields — not the old
//   single `\n`-joined `message` blob, which arrived as an unreadable wall
//   of text in the enquiry email. Formspree renders one row per field.
// - If it's not set yet (current state — no Formspree account exists),
//   fall back to the existing honest `/api/contact` stub, which validates
//   input and returns a clear "not connected" response rather than
//   pretending to succeed. This lets the whole site keep working exactly
//   as before until a real Formspree form ID is supplied — flip one env
//   var, nothing else changes.
// - A `_gotcha` honeypot field (Formspree's own convention) is checked
//   client-side too: if it's filled, silently report success without
//   sending anything, so a bot gets no signal its submission was rejected.
export type EnquiryStatus = "idle" | "sending" | "sent" | "not-connected" | "error";

export type EnquiryResult = {
  status: EnquiryStatus;
  message: string;
};

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

const GENERIC_ERROR = "Something went wrong. Please try again or call us directly.";

export async function submitEnquiry(
  fields: Record<string, string | null | undefined>,
): Promise<EnquiryResult> {
  if (fields._gotcha) {
    return { status: "sent", message: "" };
  }

  const cleaned = Object.fromEntries(
    Object.entries(fields).filter(
      ([key, value]) => key !== "_gotcha" && value !== undefined && value !== null && value !== "",
    ),
  );

  if (FORMSPREE_ID) {
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(cleaned),
      });
      if (res.ok) {
        return { status: "sent", message: "" };
      }
      const result = await res.json().catch(() => null);
      const message =
        (result?.errors as Array<{ message: string }> | undefined)
          ?.map((e) => e.message)
          .join(" ") || "Something went wrong. Please try again.";
      return { status: "error", message };
    } catch {
      return { status: "error", message: GENERIC_ERROR };
    }
  }

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleaned),
    });
    const result = await res.json().catch(() => null);

    if (res.status === 501) {
      return {
        status: "not-connected",
        message: result?.message ?? "Enquiry sending isn't connected yet.",
      };
    }
    if (!res.ok) {
      return {
        status: "error",
        message: result?.message ?? "Something went wrong. Please try again.",
      };
    }
    return { status: "sent", message: "" };
  } catch {
    return { status: "error", message: GENERIC_ERROR };
  }
}
