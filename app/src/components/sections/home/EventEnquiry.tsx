"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { site } from "@/content/site";
import { services, eventTypeOptions } from "@/content/services";
import { submitEnquiry, type EnquiryStatus as Status } from "@/lib/submitEnquiry";

// DESIGN.md §13.5 rows 16–17 / §20. Real contact info (phone/email from
// content/site.ts). Same honest submission logic used by every other form
// on the site (status state machine, no fake success, no invented
// response-time SLA). The old §1-6-era ContactForm.tsx this comment used
// to reference was dead code (zero importers) and was deleted 2026-09-21
// (TODO.md Phase 0.4).
//
// §20 redesign: cut from 7 always-visible fields to 4 (Name, Phone*, Email,
// Event Nature), with the rest tucked behind an optional disclosure toggle
// — the UX audit found only name/email were ever actually required
// (server-side only name/email/message), so the form looked far more
// demanding than it was. Phone is added and made the required contact
// field in place of email (this business's primary real contact channel
// is phone/WhatsApp, per site.ts — email is demoted to optional). Also
// fixes a real bug the audit found: the native <select>s previously had no
// placeholder option, so skipping one silently submitted its first option
// as if chosen (e.g. a corporate enquiry could be mislabeled as a
// wedding). Reads the `interest` URL param (set by BookingAvailability's
// row links) to pre-select Event Nature when arriving from a service row.
//
// Bokeh glow (§25/§26 pattern, reused here): this is the page's closing
// CTA — the same reasoning that put the glow behind RepertoireGrid and
// BookingAvailability applies here, and mirrors About's own closing-CTA
// section getting the same treatment. Dampened to opacity-40 since this
// section has no dark scrim on top (bare background, not the mobile
// menu's backdrop-blur panel).

// TODO.md Phase 4.2 (2026-09-21): was a locally-hardcoded, coarser 6-option
// list that didn't match any of the 9 real services by name (e.g. no way
// to select "TV Award Show" or "Mahotsavs" specifically) — one of 3
// independently-drifting event-type taxonomies across the site's forms.
// Now reads `content/services.ts`'s shared `eventTypeOptions` (the 9 real
// service names + "Other"), so a service slug maps to its exact dropdown
// option with no separate translation table to maintain.
const nameBySlug = (slug: string) => services.find((s) => s.slug === slug)?.name;

export function EventEnquiry() {
  const searchParams = useSearchParams();
  const interest = searchParams.get("interest");

  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [showMore, setShowMore] = useState(Boolean(interest && nameBySlug(interest)));
  const [eventNature, setEventNature] = useState(
    (interest && nameBySlug(interest)) || "",
  );

  // Derive state from the `interest` search param during render rather
  // than in an effect (React's recommended pattern for "adjust state when
  // a prop changes") — BookingAvailability navigates within the same route
  // when a visitor clicks a different service row, so this component stays
  // mounted and needs to react to the param changing, not just its initial
  // value.
  const [prevInterest, setPrevInterest] = useState(interest);
  if (interest !== prevInterest) {
    setPrevInterest(interest);
    const name = interest && nameBySlug(interest);
    if (name) {
      setEventNature(name);
      setShowMore(true);
    }
  }

  const phone = site.contact.phones[0];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const eventNatureValue = String(data.get("eventNature") || "");

    const result = await submitEnquiry({
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      eventNature: eventNatureValue,
      eventDate: String(data.get("eventDate") || ""),
      eventLocation: String(data.get("eventLocation") || ""),
      troupeSize: String(data.get("troupeSize") || ""),
      notes: String(data.get("notes") || ""),
      _gotcha: String(data.get("_gotcha") || ""),
      _subject: eventNatureValue ? `New enquiry — ${eventNatureValue}` : "New enquiry",
    });

    setStatus(result.status);
    setMessage(result.message);
    if (result.status === "sent") {
      form.reset();
      setEventNature("");
      setShowMore(false);
    }
  }

  return (
    <section
      id="event-enquiry"
      className="relative w-full bg-surface-card py-16 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-16 right-1/4 w-80 h-80 rounded-full bg-danza-gold blur-3xl animate-bokeh" />
        <div
          className="absolute bottom-0 -left-10 w-72 h-72 rounded-full bg-danza-cyan blur-3xl animate-bokeh"
          style={{ animationDelay: "4s" }}
        />
      </div>
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8">
        <div>
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-danza-gold">
            Enquiries
          </span>
          <h2
            style={{ fontFamily: "var(--font-headline-danza)" }}
            className="mt-1 text-2xl sm:text-3xl font-bold text-on-surface-danza mb-4"
          >
            Bring an Award-Winning Performance to Your Event
          </h2>
          <p className="font-sans text-sm text-on-surface-danza-muted mb-6">
            Send us your enquiry for weddings, corporate events, national
            celebrations, and festivals.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-2 font-sans text-sm text-on-surface-danza hover:text-danza-gold transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-danza-gold" aria-hidden="true">
                phone_in_talk
              </span>
              {phone}
            </a>
            <a
              href={`mailto:${site.contact.email}`}
              className="flex items-center gap-2 font-sans text-sm text-on-surface-danza hover:text-danza-gold transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-danza-gold" aria-hidden="true">
                mail
              </span>
              {site.contact.email}
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          aria-busy={status === "sending"}
          className="rounded-2xl bg-surface-elevated border border-surface-border p-6 md:p-8 flex flex-col gap-4"
        >
          <input
            type="text"
            name="_gotcha"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          {/* TODO.md Phase 3.1: a persistent (not conditionally-mounted) live
              region — screen readers reliably announce text CHANGES inside an
              already-present live region, but aren't guaranteed to announce a
              brand-new node appearing in the DOM. Previously the "sending"
              state only changed the submit button's own visible text, with
              nothing announced to assistive tech at all. */}
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
          <h3
            style={{ fontFamily: "var(--font-headline-danza)" }}
            className="text-lg font-semibold text-on-surface-danza"
          >
            Send Your Enquiry
          </h3>
          <p className="font-sans text-xs text-on-surface-danza-muted -mt-2">
            {/* TODO.md Phase 4.2: subject/verb agreement — "details" is
                plural ("are"), not singular ("is"). contact/EnquiryForm.tsx
                already had this fix; this file and WeddingEnquiryForm.tsx
                didn't. */}
            A few details are all we need to start — share more if you have
            it, or we&apos;ll follow up to fill in the rest.
            <span className="block mt-1 text-on-surface-danza-muted/70">
              * Required
            </span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField name="name" label="Full Name" required />
            <TextField name="phone" label="Phone / WhatsApp" type="tel" required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField name="email" label="Email (optional)" type="email" />
            <SelectField
              name="eventNature"
              label="Event Nature"
              options={eventTypeOptions}
              value={eventNature}
              onChange={setEventNature}
            />
          </div>

          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            aria-expanded={showMore}
            className="self-start inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wide text-danza-gold hover:text-danza-crimson transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              {showMore ? "expand_less" : "expand_more"}
            </span>
            {showMore ? "Fewer details" : "Add a few more details (optional)"}
          </button>

          {showMore && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField name="eventDate" label="Tentative Event Date" type="date" />
                <TextField name="eventLocation" label="Event Location / City" />
              </div>

              <TextField name="troupeSize" label="Desired Troupe Size (optional)" placeholder="e.g. 20 performers — leave blank and we'll recommend a size" />

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="notes"
                  className="font-sans text-xs font-semibold uppercase tracking-wide text-on-surface-danza-muted"
                >
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  className="w-full p-3.5 rounded-xl bg-surface-card border border-surface-border text-on-surface-danza font-sans text-sm focus:outline-none focus:ring-2 focus:ring-danza-crimson transition-all resize-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full h-[50px] rounded-full bg-danza-crimson hover:bg-danza-crimson-hover text-white font-sans font-semibold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Sending…" : "Send Enquiry"}
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              arrow_forward
            </span>
          </button>

          {status === "sent" && (
            <div
              role="status"
              className="flex items-center gap-2 rounded-xl bg-danza-gold/10 border border-danza-gold/30 px-4 py-3"
            >
              <span className="material-symbols-outlined text-[18px] text-danza-gold shrink-0" aria-hidden="true">
                stars
              </span>
              <p className="font-sans text-sm text-on-surface-danza">
                Thank you — your enquiry has been received. We&apos;ll get
                back to you soon.
              </p>
            </div>
          )}
          {status === "not-connected" && (
            <p role="status" className="rounded-xl bg-surface-card border border-surface-border px-4 py-3 font-sans text-sm text-on-surface-danza-muted">
              {message}
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="font-sans text-sm text-danza-error">
              {message}
            </p>
          )}
          {(status === "not-connected" || status === "error") && (
            <p className="font-sans text-xs text-on-surface-danza-muted -mt-2">
              Or reach us directly —{" "}
              <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-danza-gold hover:underline">
                call us
              </a>{" "}
              or{" "}
              <a
                href={`https://wa.me/${phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-danza-gold hover:underline"
              >
                WhatsApp us
              </a>
              .
            </p>
          )}
        </form>
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
  // TODO.md Phase 3.1: wires the browser's own native constraint-validation
  // failure (empty required field, malformed email, etc.) to aria-invalid +
  // aria-describedby, reusing the browser's real validationMessage text
  // rather than inventing custom copy. Only fires on a submit attempt (or
  // an explicit validity check), not on every keystroke.
  const [invalid, setInvalid] = useState(false);
  const [errorText, setErrorText] = useState("");
  const errorId = `${name}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="font-sans text-xs font-semibold uppercase tracking-wide text-on-surface-danza-muted">
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
        className="w-full h-11 px-3.5 rounded-xl bg-surface-card border border-surface-border text-on-surface-danza font-sans text-sm placeholder:text-on-surface-danza-muted/60 focus:outline-none focus:ring-2 focus:ring-danza-crimson transition-all"
      />
      {invalid && (
        <p id={errorId} role="alert" className="font-sans text-xs text-danza-error">
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
  value,
  onChange,
}: {
  name: string;
  label: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="font-sans text-xs font-semibold uppercase tracking-wide text-on-surface-danza-muted">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        defaultValue={onChange ? undefined : ""}
        className="w-full h-11 px-3.5 rounded-xl bg-surface-card border border-surface-border text-on-surface-danza font-sans text-sm focus:outline-none focus:ring-2 focus:ring-danza-crimson transition-all"
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
