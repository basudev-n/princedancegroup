// Real business facts only. See PROGRESS.md "Real facts confirmed" table for
// sourcing. Never add a value here that isn't confirmed — see ARCHITECTURE.md §1.

export const site = {
  name: "Prince Dance Group",
  tagline: "India's Got Talent Season 1 Champions",
  founder: {
    name: "Krishna Mohan Reddy",
    role: "Founder & Choreographer",
  },
  origin: {
    town: "Berhampur",
    district: "Ganjam",
    state: "Odisha",
    country: "India",
  },
  // 2026-09-24: client (Murali Sahu) confirmed 3 distinct real numbers with
  // 3 distinct roles — previously the site had 2 interchangeable numbers in
  // one `phones` array, used indiscriminately for both tel: and wa.me:
  // links everywhere (flagged as an open question in TODO.md's Client
  // Input Register #4 — "which phone is the WhatsApp Business line").
  // `founderPhone` is Krishna Mohan Reddy's own direct line — a confirmed
  // fact, but not currently surfaced as a public CTA anywhere on the site
  // (every "Call Us"/WhatsApp button uses `phone`/`whatsapp` below); add a
  // display site if the client asks for it specifically.
  contact: {
    phone: "+91 96924 53808",
    whatsapp: "+91 82709 23491",
    founderPhone: "+91 98611 80053",
    email: "princedancegroup09@gmail.com",
    address: {
      line1: "Art Performing Building",
      line2: "In front of Pantho Niwas, Gopalpur",
      pin: "761002",
      state: "Odisha, India",
    },
  },
  // 2026-09-25: real profile URLs supplied by the client (Facebook,
  // Instagram, YouTube). Share-tracking query params from the pasted links
  // (`mibextid`, `stkn`, `si`) are stripped — they identify one share
  // action, not the profile. No X/Twitter account was provided; the empty
  // string keeps that icon hidden (SocialIcons filters empty hrefs).
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61566339056688",
    twitter: "",
    youtube: "https://youtube.com/@princedancegroupofficial",
    instagram: "https://www.instagram.com/prince_dance_group_official",
  },
  milestones: [
    {
      label: "India's Got Talent — Season 1",
      description:
        "Won the reality talent show with the “Krishna Act,” performed by 26 daily-wage workers with no formal dance training.",
    },
    {
      label: "IPL Inauguration, Chennai",
      description: "Performed at the inauguration of the Indian Premier League.",
    },
    {
      label: "Kaun Banega Crorepati, Sony TV",
      description: "Featured performance on India's leading television quiz show.",
    },
    {
      label: "India's Got Talent Season 4",
      description: "Opening act for the show that made them household names.",
    },
    {
      label: "“Who Is the Greatest Indian”, History Channel",
      description: "Featured performance on the nationally broadcast series.",
    },
    {
      label: "NDTV-Toyota Greenathon, NDTV 24×7",
      description: "Performed at the nationally televised environmental telethon.",
    },
  ],
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
