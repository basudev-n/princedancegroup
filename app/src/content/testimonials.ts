// Real testimonials from "old website.pdf" (Wayback capture, page 4).
// 2026-10-14: each person's `photo` is a portrait sourced from Wikimedia
// Commons/Wikipedia (identity established by the file's own page; source +
// licence in public/images/testimonials/CREDITS.md). Client gave the
// go-ahead ARCHITECTURE.md §6 required. The 100px headshots staged in
// assets/source/images/testimonials/ were NOT used — their filenames didn't
// match the faces.

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  photo?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "You have won the hearts of millions of people in our state and the entire nation. Magician of Odisha.",
    name: "Naveen Patnaik",
    photo: "/images/testimonials/naveen-patnaik.jpg",
    role: "Former Chief Minister of Odisha",
  },
  {
    quote:
      "Reddy is like a hidden gem. He has taught the world that the sky is the limit for those who are able to recognise their talent and motivate themselves. His dance has shades of traditional art forms.",
    name: "V.K. Pandian",
    photo: "/images/testimonials/vk-pandian.jpg",
    role: "Former IAS, District Collector, Ganjam",
  },
  {
    quote: "Your performance has proved today, how small are our films in front of these performances.",
    name: "Shah Rukh Khan",
    photo: "/images/testimonials/shah-rukh-khan.jpg",
    role: "Bollywood Superstar",
  },
  {
    quote:
      "India stands on its farmers and workers. Today these workers have proved it again for us. Today they have shown what wonder a worker can do.",
    name: "Sonali Bendre",
    photo: "/images/testimonials/sonali-bendre.jpg",
    role: "Bollywood Actress",
  },
  {
    quote:
      "You started your performance quietly and you took our breath away. I am speechless from the first act. With belief and discipline you perform each and every act. You tell a story through your formations.",
    name: "Kirron Kher",
    photo: "/images/testimonials/kirron-kher.jpg",
    role: "Veteran Bollywood Actress",
  },
  {
    quote:
      "Congratulations to them for their incredible act, commitment, choreography, versatility and sheer will to fight all odds and come out on top. I can now admit without prejudice that they were, from the time I first saw them shooting in Kolkata, my favourite act.",
    name: "Shekhar Kapur",
    photo: "/images/testimonials/shekhar-kapur.jpg",
    role: "Filmmaker",
  },
  {
    quote: "Mere khayal se maine bahut kuch miss kiya tha. Khush kismat hoon aaj mujhe ye dekhne ka mauka mila.",
    name: "Dharmendra",
    photo: "/images/testimonials/dharmendra.jpg",
    role: "Actor, Producer & Politician",
  },
];
