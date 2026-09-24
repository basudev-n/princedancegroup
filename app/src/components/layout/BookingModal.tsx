"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { eventTypeOptions } from "@/content/services";
import { submitEnquiry, type EnquiryStatus as Status } from "@/lib/submitEnquiry";
import { useFocusTrap } from "@/components/ui/useFocusTrap";

// DESIGN.md §29 — site-wide chrome, shared by every page's Header.
// Header's "Book for Events" button used to link to /contact; it now opens
// this modal in place, a short version of the same honest enquiry form
// already used on Home/Contact (same status state machine, same
// name+phone-or-email server requirement, no fake success). Kept
// deliberately shorter than the full page forms (4 fields, no disclosure
// toggle) since this is meant to be a fast "reach us now" action from
// anywhere on the site, not the primary detailed-enquiry surface those
// pages already own.
//
// TODO.md Phase 4.2 (2026-09-21): the event-type dropdown used to be a
// locally-hardcoded 6-option shorthand list, one of 3 independently
// drifting taxonomies site-wide — now reads content/services.ts's shared
// `eventTypeOptions` (the 9 real service names + "Other"), matching every
// other enquiry form.


export function BookingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  // TODO.md Phase 3.1: moves focus into the dialog on open, traps Tab
  // within it, and restores focus to the "Book for Events" trigger on
  // close — previously absent (focus silently stayed on the trigger
  // button behind the overlay, and Tab walked straight out into the page).
  useFocusTrap(dialogRef, open);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  // Reset to a fresh form each time the modal is reopened, so a visitor
  // who submitted once and comes back later doesn't see the old result.
  // Derived during render (React's recommended pattern for "adjust state
  // when a prop changes") rather than in an effect, since Header keeps
  // this component mounted and just toggles `open`.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setStatus("idle");
      setMessage("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const eventTypeValue = String(data.get("eventType") || "");

    const result = await submitEnquiry({
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      eventType: eventTypeValue,
      _gotcha: String(data.get("_gotcha") || ""),
      _subject: eventTypeValue ? `New enquiry — ${eventTypeValue}` : "New enquiry",
    });

    setStatus(result.status);
    setMessage(result.message);
    if (result.status === "sent") {
      form.reset();
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Book Prince Dance Group for your event"
      onMouseDown={(e) => {
        if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
          onClose();
        }
      }}
    >
      <div className="absolute inset-0 overflow-hidden bg-black/70 backdrop-blur-xl">
        <div className="absolute -top-20 left-1/4 w-96 h-96 rounded-full bg-danza-crimson blur-3xl animate-bokeh" />
        <div
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-danza-gold blur-3xl animate-bokeh"
          style={{ animationDelay: "2.5s" }}
        />
        <div
          className="absolute bottom-10 left-0 w-64 h-64 rounded-full bg-danza-cyan blur-3xl animate-bokeh"
          style={{ animationDelay: "4.5s" }}
        />
      </div>

      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative w-full max-w-md rounded-2xl bg-surface-elevated border border-surface-border shadow-2xl p-6 md:p-7 max-h-[90vh] overflow-y-auto"
      >
        {/* TODO.md Phase 3.1: was 32px, below the 44px WCAG touch-target
            minimum — matches the Gallery lightbox's close button size. */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-2 right-2 flex h-11 w-11 items-center justify-center rounded-full text-on-surface-danza-muted hover:text-white hover:bg-surface-card transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">close</span>
        </button>

        <span className="font-sans text-xs font-semibold uppercase tracking-widest text-danza-gold">
          Book for Events
        </span>
        <h2
          style={{ fontFamily: "var(--font-headline-danza)" }}
          className="mt-1 text-2xl font-bold text-on-surface-danza mb-5"
        >
          Tell Us About Your Event
        </h2>

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
              region — see EventEnquiry.tsx for the full rationale. */}
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
          <p className="font-sans text-[11px] text-on-surface-danza-muted/70 -mt-1">
            * Required
          </p>
          <ModalField name="name" label="Full Name" required />
          <ModalField name="phone" label="Phone / WhatsApp" type="tel" required />
          <ModalField name="email" label="Email (optional)" type="email" />

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="modal-eventType"
              className="font-sans text-xs font-semibold uppercase tracking-wide text-on-surface-danza-muted"
            >
              Event Type
            </label>
            <select
              id="modal-eventType"
              name="eventType"
              defaultValue=""
              className="w-full h-11 px-3.5 rounded-xl bg-surface-card border border-surface-border text-on-surface-danza font-sans text-sm focus:outline-none focus:ring-2 focus:ring-danza-crimson transition-all"
            >
              <option value="" disabled>
                Select…
              </option>
              {eventTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full h-[50px] mt-1 rounded-full bg-danza-crimson hover:bg-danza-crimson-hover text-white font-sans font-semibold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Sending…" : "Send Enquiry"}
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              arrow_forward
            </span>
          </button>

          <p className="text-center font-sans text-xs text-on-surface-danza-muted">
            Or call us now at{" "}
            <a
              href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}
              className="text-danza-gold hover:underline"
            >
              {site.contact.phone}
            </a>
          </p>

          {status === "sent" && (
            <div
              role="status"
              className="flex items-center gap-2 rounded-xl bg-danza-gold/10 border border-danza-gold/30 px-4 py-3"
            >
              <span className="material-symbols-outlined text-[18px] text-danza-gold shrink-0" aria-hidden="true">
                stars
              </span>
              <p className="font-sans text-sm text-on-surface-danza">
                Thank you — we&apos;ve received your enquiry and will get
                back to you soon.
              </p>
            </div>
          )}
          {status === "not-connected" && (
            <p
              role="status"
              className="rounded-xl bg-surface-card border border-surface-border px-4 py-3 font-sans text-sm text-on-surface-danza-muted"
            >
              {message}
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="font-sans text-sm text-danza-error">
              {message}
            </p>
          )}
          {(status === "not-connected" || status === "error") && (
            <p className="text-center font-sans text-xs text-on-surface-danza-muted">
              Or{" "}
              <a
                href={`https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-danza-gold hover:underline"
              >
                WhatsApp us
              </a>{" "}
              directly.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

function ModalField({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  // TODO.md Phase 3.1: see EventEnquiry.tsx's TextField for the full
  // rationale — wires the browser's own native constraint-validation
  // failure to aria-invalid + aria-describedby using its real
  // validationMessage text.
  const [invalid, setInvalid] = useState(false);
  const [errorText, setErrorText] = useState("");
  const errorId = `modal-${name}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={`modal-${name}`}
        className="font-sans text-xs font-semibold uppercase tracking-wide text-on-surface-danza-muted"
      >
        {label}
        {required ? " *" : ""}
      </label>
      <input
        id={`modal-${name}`}
        name={name}
        type={type}
        required={required}
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
        className="w-full h-11 px-3.5 rounded-xl bg-surface-card border border-surface-border text-on-surface-danza font-sans text-sm focus:outline-none focus:ring-2 focus:ring-danza-crimson transition-all"
      />
      {invalid && (
        <p id={errorId} role="alert" className="font-sans text-xs text-danza-error">
          {errorText}
        </p>
      )}
    </div>
  );
}
