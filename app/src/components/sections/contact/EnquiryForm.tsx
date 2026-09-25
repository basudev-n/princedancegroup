"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { eventTypeOptions } from "@/content/services";
import { submitEnquiry, type EnquiryStatus as Status } from "@/lib/submitEnquiry";

// DESIGN.md §15.2 row 8 / §22. Same real submission logic as
// components/sections/home/EventEnquiry.tsx (fetch to /api/contact,
// honest not-connected handling, no fake success) — extended fields
// folded into the message text. The source screen's "non-binding 48-hour
// tentative date freeze" claim is not carried over.
//
// §22 redesign: same field-reduction treatment Home's EventEnquiry got —
// cut from 10 always-visible fields to 4 (Name*, Phone*, Email-optional,
// Event Type), the rest behind a single "Add a few more details
// (optional)" disclosure toggle. Phone is now the required contact field
// in place of email, matching Home and matching this page's own sidebar
// (which already lists phone/WhatsApp before email). Fixes a real bug
// both audits confirmed: the selects had no placeholder option, so
// skipping one silently submitted its first array entry as if chosen
// (e.g. a corporate enquiry could be mislabeled as a luxury wedding).
// "Requested Acts" moved behind the disclosure too — asking a first-time
// enquirer to pick a specific act before a callback is a premature
// decision the sidebar's own copy says the team makes with them. The
// form now has its own card shell (previously a bare, unframed <div> —
// the one thing on the page without a border, despite being the actual
// goal of the page).
//
// Bug fixes in this pass: "A few details is all we need" had a
// subject/verb agreement error (fixed to "are"); the submit button read
// "Submit Performance Inquiry" (American spelling) while every other piece
// of copy on this page and its sibling components uses "Enquiry" (British/
// Indian spelling) — fixed for consistency. The disclosure toggle now
// points `aria-controls` at the panel it expands. Plain-language pass:
// "Priority Booking Dossier" → "Start Your Booking"; the Shiva Tandava
// act's "High dynamic acoustic intensity" subtitle → "Powerful, high-
// energy performance" — same meaning, simpler words.

// TODO.md Phase 4.2 (2026-09-21): was a locally-hardcoded 5-option list —
// the most out-of-sync of the site's 3 event-type taxonomies, with no way
// to select "TV Award Show" or "Mahotsavs" even though this is the page a
// search visitor is most likely to land on directly. Now reads
// content/services.ts's shared `eventTypeOptions` (the 9 real service
// names + "Other"), matching every other enquiry form.

const acts = [
  { name: "Dashavatar (Ten Incarnations)", subtitle: "Signature flagship act" },
  { name: "Krishna Leela & Divine Ras", subtitle: "Ideal for luxury sangeets" },
  { name: "Shiva Tandava Stotram", subtitle: "Powerful, high-energy performance" },
  { name: "Vande Mataram Patriot Symphony", subtitle: "National & corporate summits" },
];

export function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [showMore, setShowMore] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const selectedActs = data.getAll("acts").join(", ");
    const eventTypeValue = String(data.get("eventType") || "");

    const result = await submitEnquiry({
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      role: String(data.get("role") || ""),
      eventType: eventTypeValue,
      eventDate: String(data.get("eventDate") || ""),
      eventCity: String(data.get("eventCity") || ""),
      troupeSize: String(data.get("troupeSize") || ""),
      requestedActs: selectedActs,
      notes: String(data.get("notes") || ""),
      _gotcha: String(data.get("_gotcha") || ""),
      _subject: eventTypeValue ? `New enquiry — ${eventTypeValue}` : "New enquiry",
    });

    setStatus(result.status);
    setMessage(result.message);
    if (result.status === "sent") {
      form.reset();
      setShowMore(false);
    }
  }

  return (
    <div className="h-full flex flex-col rounded-nocturne-lg bg-nocturne-surface-container border border-nocturne-stage-border p-6 md:p-8">
      <span className="font-hanken text-xs font-semibold uppercase tracking-widest text-nocturne-gold">
        Start Your Booking
      </span>
      <h2
        style={{ fontFamily: "var(--font-headline-nocturne)" }}
        className="mt-1 text-3xl sm:text-4xl font-bold text-nocturne-text-primary mb-3"
      >
        Hold Your Performance Date
      </h2>
      <p className="font-hanken text-sm text-nocturne-text-muted mb-8">
        A few details are all we need to start — share more if you have it,
        or we&apos;ll follow up to fill in the rest.
      </p>

      <form onSubmit={handleSubmit} aria-busy={status === "sending"} className="flex flex-1 flex-col gap-4">
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
          <TextField name="name" label="Full Name" required />
          <TextField name="phone" label="Mobile / WhatsApp" type="tel" required />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField name="email" label="Email Address (optional)" type="email" />
          <SelectField name="eventType" label="Event Type" options={eventTypeOptions} />
        </div>

        <button
          type="button"
          onClick={() => setShowMore((v) => !v)}
          aria-expanded={showMore}
          aria-controls="enquiry-more-details"
          className="self-start inline-flex items-center gap-1.5 font-hanken text-xs font-semibold uppercase tracking-wide text-nocturne-gold hover:text-nocturne-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            {showMore ? "expand_less" : "expand_more"}
          </span>
          {showMore ? "Fewer details" : "Add a few more details (optional)"}
        </button>

        {showMore && (
          <div id="enquiry-more-details" className="flex flex-col gap-4">
            <TextField name="role" label="Role / Production Company" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField name="eventDate" label="Tentative Event Date" type="date" />
              <TextField name="eventCity" label="Event City & Country" />
            </div>

            <TextField name="troupeSize" label="Troupe Size (optional)" placeholder="e.g. 20 performers — leave blank and we'll recommend a size" />

            <fieldset>
              <legend className="font-hanken text-xs font-semibold uppercase tracking-wide text-nocturne-text-muted mb-2">
                Requested Acts (select all that apply — or leave blank and we&apos;ll recommend)
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {acts.map((act) => (
                  <label
                    key={act.name}
                    className="flex items-start gap-2 p-3.5 rounded-nocturne bg-nocturne-surface-container-lowest border border-nocturne-stage-border has-[:checked]:border-nocturne-primary cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      name="acts"
                      value={act.name}
                      className="mt-0.5 h-4 w-4 accent-nocturne-primary shrink-0"
                    />
                    <span>
                      <span className="block font-hanken text-sm font-semibold text-nocturne-text-primary">
                        {act.name}
                      </span>
                      <span className="block font-hanken text-xs text-nocturne-text-muted">
                        {act.subtitle}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="notes"
                className="font-hanken text-xs font-semibold uppercase tracking-wide text-nocturne-text-muted"
              >
                Stage Dimensions, Venue Name &amp; Special Requests
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                placeholder="e.g. venue name, estimated stage dimensions, or any special requests"
                className="w-full p-3.5 rounded-nocturne bg-nocturne-surface-container-lowest border border-nocturne-stage-border text-nocturne-text-primary font-hanken text-sm focus:outline-none focus:ring-2 focus:ring-nocturne-secondary transition-all resize-none placeholder:text-nocturne-text-muted/60"
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full h-[50px] rounded-nocturne-full bg-nocturne-primary hover:bg-nocturne-primary-container text-nocturne-on-primary font-hanken font-semibold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "sending" ? "Sending…" : "Submit Booking Enquiry"}
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            arrow_forward
          </span>
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

      {/* Card footer, pinned to the bottom: the card stretches to match the
          contact details beside it (Contact layout fix, 2026-09-25), so a
          direct-contact alternative fills that space usefully instead of
          leaving it empty. Real numbers from content/site.ts. */}
      <div className="mt-auto pt-6">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-nocturne-stage-border pt-5 font-hanken text-sm text-nocturne-text-muted">
          <span>Prefer to talk?</span>
          <span className="flex flex-wrap items-center gap-x-4">
            <a
              href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}
              className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-nocturne-gold hover:text-nocturne-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">call</span>
              Call {site.contact.phone}
            </a>
            <a
              href={`https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-nocturne-gold hover:text-nocturne-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">phone_in_talk</span>
              WhatsApp
            </a>
          </span>
        </div>
      </div>
    </div>
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

function SelectField({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="font-hanken text-xs font-semibold uppercase tracking-wide text-nocturne-text-muted"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="w-full h-11 px-3.5 rounded-nocturne bg-nocturne-surface-container-lowest border border-nocturne-stage-border text-nocturne-text-primary font-hanken text-sm focus:outline-none focus:ring-2 focus:ring-nocturne-secondary transition-all"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
