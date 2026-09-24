"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { submitEnquiry, type EnquiryStatus as Status } from "@/lib/submitEnquiry";

// DESIGN.md §17.2 rows 7–8 / §23. Rendered only on the wedding-events
// service detail page. Same real submission logic as Contact's
// EnquiryForm (fetch to /api/contact, honest not-connected handling, no
// fake success). The source screen's "Strict Non-Disclosure Agreement
// (NDA) respected..." and "contact within 4 hours" claims are unconfirmed
// operational commitments — dropped, not asserted. The "Acclaimed By
// Visionary Planners" testimonials this screen shipped (attributed to a
// real, identifiable wedding planner and a real event company) are
// dropped entirely, not rebuilt here in any form — see DESIGN.md §17.2
// row 7. The phone number shown uses PROGRESS.md's real confirmed
// number, not the screen's wrong one.
//
// §23 fix: this form required Email and left Phone optional — backwards
// from the pattern Home and Contact both independently converged on
// (phone/WhatsApp is this business's real primary channel). It also had
// 6 fields all always-visible with no disclosure toggle, and the
// `troupeSize` select had no placeholder option (same bug class already
// fixed on Home/Contact — skipping it would have silently submitted the
// first array entry as if chosen). All three fixed to match the
// established pattern: Name*/Phone*/Email-optional/Wedding Date always
// visible, the rest behind a single disclosure toggle.
//
// Plain-language pass: "Intimate Chamber Cast" (troupeSizes) simplified
// to "Small Ensemble" — same headcount range, plainer wording. "Exclusive
// Wedding Concierge" eyebrow, the "Bespoke Requests" textarea label, and
// the "Desired Theatrical Formats" fieldset legend all reworded below.

const formats = [
  "Krishna & Radha Ras Leela Entry",
  "Dashavatar Blessing Opener",
  "Sangeet Climax & Flashmob Finale",
];


export function WeddingEnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [showMore, setShowMore] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const selectedFormats = data.getAll("formats").join(", ");

    const result = await submitEnquiry({
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      weddingDate: String(data.get("weddingDate") || ""),
      destinationCity: String(data.get("destinationCity") || ""),
      requestedFormats: selectedFormats,
      troupeSize: String(data.get("troupeSize") || ""),
      notes: String(data.get("notes") || ""),
      _gotcha: String(data.get("_gotcha") || ""),
      _subject: "New wedding enquiry",
    });

    setStatus(result.status);
    setMessage(result.message);
    if (result.status === "sent") {
      form.reset();
      setShowMore(false);
    }
  }

  return (
    <section className="w-full bg-nocturne-surface py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] gap-8 items-start">
        <div className="rounded-nocturne-lg bg-nocturne-surface-container border border-nocturne-stage-border p-6">
          <span className="flex items-center gap-2 font-hanken text-[11px] font-semibold uppercase tracking-wider text-nocturne-text-muted mb-1">
            <span className="material-symbols-outlined text-[16px] text-nocturne-gold" aria-hidden="true">
              verified
            </span>
            Direct Coordinator
          </span>
          <p className="font-hanken text-sm font-semibold text-nocturne-text-primary mb-4">
            {site.contact.phone} &bull; {site.contact.whatsapp} (WhatsApp)
          </p>
          <p className="font-hanken text-xs text-nocturne-text-muted">
            Season dates are allocated per booking. Reach out early to check
            availability for your date.
          </p>
        </div>

        <div>
          <span className="font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-gold">
            Wedding Booking Team
          </span>
          <h2
            style={{ fontFamily: "var(--font-headline-nocturne)" }}
            className="mt-1 text-3xl sm:text-4xl font-bold text-nocturne-text-primary mb-3"
          >
            Reserve Your Date
          </h2>
          {/* TODO.md Phase 4.2: subject/verb agreement — "details" is
              plural ("are"), not singular ("is"). contact/EnquiryForm.tsx
              already had this fix; this file and home/EventEnquiry.tsx
              didn't. */}
          <p className="font-hanken text-sm text-nocturne-text-muted mb-8">
            A few details are all we need to start — share more if you have
            it, or we&apos;ll follow up to fill in the rest.
          </p>

          <form onSubmit={handleSubmit} aria-busy={status === "sending"} className="flex flex-col gap-4">
            <input
              type="text"
              name="_gotcha"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            {/* TODO.md Phase 3.1: persistent (not conditionally-mounted) live
                region — see home/EventEnquiry.tsx for the full rationale. */}
            <p role="status" aria-live="polite" className="sr-only">
              {status === "sending"
                ? "Sending your enquiry…"
                : status === "sent"
                  ? "Enquiry sent successfully."
                  : status === "error"
                    ? "There was an error sending your enquiry."
                    : status === "not-connected"
                      ? "Enquiry form is not yet connected."
                      : ""}
            </p>
            <p className="font-hanken text-[11px] text-nocturne-text-muted/70 -mt-1">
              * Required
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField name="name" label="Couple / Planner Name" required />
              <TextField name="phone" label="Mobile / WhatsApp" type="tel" required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField name="email" label="Email Address (optional)" type="email" />
              <TextField name="weddingDate" label="Tentative Wedding Date" type="date" />
            </div>

            <button
              type="button"
              onClick={() => setShowMore((v) => !v)}
              aria-expanded={showMore}
              className="self-start inline-flex items-center gap-1.5 font-hanken text-xs font-semibold uppercase tracking-wide text-nocturne-gold hover:text-nocturne-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                {showMore ? "expand_less" : "expand_more"}
              </span>
              {showMore ? "Fewer details" : "Add a few more details (optional)"}
            </button>

            {showMore && (
              <div className="flex flex-col gap-4">
                <TextField name="destinationCity" label="Destination City & Venue" />

                <fieldset>
                  <legend className="font-hanken text-xs font-semibold uppercase tracking-wide text-nocturne-text-muted mb-2">
                    Desired Performance Formats (select all that apply)
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {formats.map((f) => (
                      <label
                        key={f}
                        className="flex items-start gap-2 p-3.5 rounded-nocturne bg-nocturne-surface-container-lowest border border-nocturne-stage-border has-[:checked]:border-nocturne-primary cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          name="formats"
                          value={f}
                          className="mt-0.5 h-4 w-4 accent-nocturne-primary shrink-0"
                        />
                        <span className="font-hanken text-sm font-semibold text-nocturne-text-primary">
                          {f}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <TextField name="troupeSize" label="Ensemble Size (optional)" placeholder="e.g. 20 performers — leave blank and we'll recommend a size" />

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="notes"
                    className="font-hanken text-xs font-semibold uppercase tracking-wide text-nocturne-text-muted"
                  >
                    Special Requests, Entry Song, or Other Details
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    className="w-full p-3.5 rounded-nocturne bg-nocturne-surface-container-lowest border border-nocturne-stage-border text-nocturne-text-primary font-hanken text-sm focus:outline-none focus:ring-2 focus:ring-nocturne-secondary transition-all resize-none"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full h-[50px] rounded-nocturne-full bg-nocturne-primary hover:bg-nocturne-primary-container text-nocturne-on-primary font-hanken font-semibold text-sm flex items-center justify-center transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending…" : "Submit Reservation Request"}
            </button>

            {status === "sent" && (
              <div
                role="status"
                className="flex items-center gap-2 rounded-nocturne bg-nocturne-gold/10 border border-nocturne-gold/30 px-4 py-3"
              >
                <span className="material-symbols-outlined text-[18px] text-nocturne-gold shrink-0" aria-hidden="true">
                  check_circle
                </span>
                <p className="font-hanken text-sm text-nocturne-text-primary">
                  Thank you &mdash; your enquiry has been received. We&apos;ll
                  be in touch soon.
                </p>
              </div>
            )}
            {status === "not-connected" && (
              <p
                role="status"
                className="rounded-nocturne bg-nocturne-surface-container-lowest border border-nocturne-stage-border px-4 py-3 font-hanken text-sm text-nocturne-text-muted"
              >
                {message}
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="font-hanken text-sm text-nocturne-primary">
                {message}
              </p>
            )}
            {(status === "not-connected" || status === "error") && (
              <p className="font-hanken text-xs text-nocturne-text-muted -mt-2">
                Or reach us directly —{" "}
                <a
                  href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}
                  className="text-nocturne-gold hover:underline"
                >
                  call us
                </a>{" "}
                or{" "}
                <a
                  href={`https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nocturne-gold hover:underline"
                >
                  WhatsApp us
                </a>
                .
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function TextField({
  name,
  label,
  type = "text",
  required,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  // TODO.md Phase 3.1: see home/EventEnquiry.tsx's TextField for the full
  // rationale — wires the browser's own native constraint-validation
  // failure to aria-invalid + aria-describedby using its real
  // validationMessage text.
  const [invalid, setInvalid] = useState(false);
  const [errorText, setErrorText] = useState("");
  const errorId = `${name}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="font-hanken text-xs font-semibold uppercase tracking-wide text-nocturne-text-muted"
      >
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        aria-invalid={invalid}
        aria-describedby={invalid ? errorId : undefined}
        onInvalid={(e) => {
          setInvalid(true);
          setErrorText(e.currentTarget.validationMessage);
        }}
        onChange={(e) => {
          if (invalid && e.currentTarget.checkValidity()) {
            setInvalid(false);
            setErrorText("");
          }
        }}
        className="w-full h-11 px-3.5 rounded-nocturne bg-nocturne-surface-container-lowest border border-nocturne-stage-border text-nocturne-text-primary font-hanken text-sm placeholder:text-nocturne-text-muted/60 focus:outline-none focus:ring-2 focus:ring-nocturne-secondary transition-all"
      />
      {invalid && (
        <p id={errorId} role="alert" className="font-hanken text-xs text-nocturne-primary">
          {errorText}
        </p>
      )}
    </div>
  );
}
