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
  contact: {
    phones: ["+91 98611 80053", "+91 82709 23491"],
    email: "princedancegroup09@gmail.com",
    address: {
      line1: "Art Performing Building",
      line2: "In front of Pantho Niwas, Gopalpur",
      pin: "761002",
      state: "Odisha, India",
    },
  },
  // TODO(content): confirm current handles/URLs directly with the client —
  // the source PDF header referenced Facebook, X, YouTube and Instagram
  // icons but the exact handles were not legible in the archive capture.
  social: {
    facebook: "",
    twitter: "",
    youtube: "",
    instagram: "",
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
