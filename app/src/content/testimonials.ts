// Real testimonials from "old website.pdf" (Wayback capture, page 4). Photo
// assets exist at assets/source/images/testimonials/ but are NOT wired into
// the UI by default — see ARCHITECTURE.md §6. Ship text-only quotes.

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "You have won the hearts of millions of people in our state and the entire nation. Magician of Odisha.",
    name: "Naveen Patnaik",
    role: "Former Chief Minister of Odisha",
  },
  {
    quote:
      "Reddy is like a hidden gem. He has taught the world that the sky is the limit for those who are able to recognise their talent and motivate themselves. His dance has shades of traditional art forms.",
    name: "V.K. Pandian",
    role: "Former IAS, District Collector, Ganjam",
  },
  {
    quote: "Your performance has proved today, how small are our films in front of these performances.",
    name: "Shah Rukh Khan",
    role: "Bollywood Superstar",
  },
  {
    quote:
      "India stands on its farmers and workers. Today these workers have proved it again for us. Today they have shown what wonder a worker can do.",
    name: "Sonali Bendre",
    role: "Bollywood Actress",
  },
  {
    quote:
      "You started your performance quietly and you took our breath away. I am speechless from the first act. With belief and discipline you perform each and every act. You tell a story through your formations.",
    name: "Kirron Kher",
    role: "Veteran Bollywood Actress",
  },
  {
    quote:
      "Congratulations to them for their incredible act, commitment, choreography, versatility and sheer will to fight all odds and come out on top. I can now admit without prejudice that they were, from the time I first saw them shooting in Kolkata, my favourite act.",
    name: "Shekhar Kapur",
    role: "Filmmaker",
  },
  {
    quote: "Mere khayal se maine bahut kuch miss kiya tha. Khush kismat hoon aaj mujhe ye dekhne ka mauka mila.",
    name: "Dharmendra",
    role: "Actor, Producer & Politician",
  },
];
