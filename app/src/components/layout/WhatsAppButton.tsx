import { site } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui/icons/BrandIcons";

// TODO.md Phase 1.1. Before this, exactly one wa.me link existed anywhere
// on the site (a small text link inside ContactSidebar.tsx, /contact
// only) despite WhatsApp being this business's de facto primary channel —
// every enquiry form already labels its phone field "Phone / WhatsApp"
// and demotes email to optional for exactly that reason. This floating
// button makes it reachable from every page, including mid-scroll.
//
// Uses `phones[0]` — TODO.md flags confirming which of the two numbers is
// the actual WhatsApp Business line as a small open client-input item;
// `phones[0]` is the number every other WhatsApp-adjacent UI on the site
// (ContactSidebar's own wa.me link) already assumes.
//
// z-30: above ordinary page content, but below the mobile nav panel
// (z-40) and BookingModal (z-[60]) — both of those already paint an
// opaque/backdrop-blurred layer over the full viewport when open, so this
// button is correctly covered rather than floating on top of them.
const WHATSAPP_MESSAGE =
  "Hi, I'd like to enquire about booking Prince Dance Group for an event.";

export function WhatsAppButton() {
  const phone = site.contact.phones[0].replace(/\D/g, "");
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${site.name} on WhatsApp`}
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 hover:scale-105 active:scale-95 transition-transform"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
