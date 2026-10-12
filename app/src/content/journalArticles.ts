// Journal article bodies supplied by the client in content.md (2026-10-12),
// published verbatim. Only edits: two truncated pieces were left out, a
// stray sentence fragment ("not end with India’s Got Talent.") at the join in
// "Every Step Has a Story", and the unfinished last paragraph of "Best Dance
// Group to Book" (cut off mid-sentence in the source). Do NOT reword — the
// client is still revising this copy.

export type ArticleBlock =
  | { t: "h"; x: string }
  | { t: "p"; x: string }
  | { t: "ul"; x: string[] }
  | { t: "lines"; x: string[] };

export const articleBlocks: Record<string, ArticleBlock[]> = {
  "why-prince-dance-group-is-a-perfect-choice-for-grand-events": [
    {
      "t": "p",
      "x": "A grand event deserves more than a performance—it deserves a moment that people remember long after the curtains close. Whether it is a wedding celebration, corporate event, cultural festival, college function, government program, or large-scale celebration, entertainment plays a vital role in creating an unforgettable experience. This is where Prince Dance Group brings its unique energy, precision, creativity, and stage presence to every event."
    },
    {
      "t": "h",
      "x": "A Legacy of Excellence"
    },
    {
      "t": "p",
      "x": "For more than 17 years, Prince Dance Group has built a remarkable journey through dedication, discipline, and an unwavering passion for performance. From humble beginnings to performing on some of the biggest stages in India, the group has continuously evolved while staying true to its artistic vision."
    },
    {
      "t": "p",
      "x": "Their journey is not simply about dance. It is about transforming an idea into a powerful visual experience that connects with audiences of every age."
    },
    {
      "t": "h",
      "x": "Powerful Performances That Capture Attention"
    },
    {
      "t": "p",
      "x": "At a grand event, the opening moments can set the tone for the entire celebration. Prince Dance Group understands how to create that impact."
    },
    {
      "t": "p",
      "x": "Every performance is carefully designed with precise formations, synchronized movements, expressive storytelling, dynamic choreography, and strong stage presence. The result is a performance that commands attention from the first moment and keeps audiences engaged until the final pose."
    },
    {
      "t": "p",
      "x": "Their philosophy is simple:"
    },
    {
      "t": "p",
      "x": "Precise formation. Grand stages. Unforgettable show."
    },
    {
      "t": "h",
      "x": "Perfect for Every Grand Occasion"
    },
    {
      "t": "p",
      "x": "One of the biggest strengths of Prince Dance Group is its versatility. Their performances can add energy and excitement to a wide range of events, including:"
    },
    {
      "t": "ul",
      "x": [
        "Weddings and destination celebrations",
        "Corporate events and annual functions",
        "Cultural festivals and celebrations",
        "College and university events",
        "Government and public programs",
        "Award ceremonies",
        "Brand and promotional events",
        "National and international stage programs"
      ]
    },
    {
      "t": "p",
      "x": "Whether the event calls for an energetic opening act, a powerful cultural presentation, or a spectacular finale, Prince Dance Group can create a performance suited to the occasion."
    },
    {
      "t": "h",
      "x": "Professionalism Meets Creativity"
    },
    {
      "t": "p",
      "x": "A spectacular performance requires more than talented performers. It requires preparation, teamwork, discipline, and professional execution."
    },
    {
      "t": "p",
      "x": "Prince Dance Group approaches every event with careful planning and attention to detail. From rehearsals and formations to music, presentation, costumes, and stage coordination, every element contributes to creating a seamless performance."
    },
    {
      "t": "p",
      "x": "This professional approach allows event organizers to focus on their celebration while the performers take care of delivering a memorable stage experience."
    },
    {
      "t": "h",
      "x": "Creating Memories That Last"
    },
    {
      "t": "p",
      "x": "The true success of a grand event is measured by the memories it creates. A powerful performance can become the moment guests talk about, share, photograph, and remember for years."
    },
    {
      "t": "p",
      "x": "Prince Dance Group aims to create exactly those moments—performances that are not only visually impressive but also emotionally engaging."
    },
    {
      "t": "h",
      "x": "Make Your Grand Event Unforgettable"
    },
    {
      "t": "p",
      "x": "If you are looking for a performance that combines discipline, creativity, powerful formations, and unforgettable stage energy, Prince Dance Group is ready to make your event extraordinary."
    },
    {
      "t": "p",
      "x": "Because a grand occasion deserves a grand performance—and every grand performance deserves to be remembered."
    }
  ],
  "every-step-has-a-story": [
    {
      "t": "p",
      "x": "Every great performance begins long before the lights come on. It begins with a dream, countless hours of practice, moments of doubt, and the determination to take one more step forward. For Prince Dance Group, every step has a story—a story of passion, perseverance, unity, and an unwavering belief in the power of dance."
    },
    {
      "t": "p",
      "x": "From Odisha to the national stage, Prince Dance Group has created a remarkable journey that continues to inspire audiences across India. Their defining moment came with India’s Got Talent Season 1, where their extraordinary performances captured the imagination of millions and earned them the title of Season 1 winners."
    },
    {
      "t": "p",
      "x": "But behind that victory was much more than a trophy."
    },
    {
      "t": "p",
      "x": "It was the result of countless rehearsals, disciplined preparation, teamwork, and the courage to dream bigger. Every movement was carefully crafted. Every formation demanded precision. Every performance carried the emotion and dedication of the entire group."
    },
    {
      "t": "h",
      "x": "From Dreams to the Grand Stage"
    },
    {
      "t": "p",
      "x": "The journey of Prince Dance Group is a reminder that talent can emerge from anywhere when passion is given the opportunity to shine. Their appearance on India’s Got Talent gave them a platform to showcase their unique performance style to audiences across the country."
    },
    {
      "t": "p",
      "x": "On stage, they transformed movement into storytelling. Their performances were not simply about dance—they were about creating moments that audiences could feel, remember, and celebrate."
    },
    {
      "t": "p",
      "x": "Winning India’s Got Talent Season 1 became a landmark achievement, but the real victory was the journey itself: proving that dedication and collective effort can turn a dream into reality."
    },
    {
      "t": "h",
      "x": "Every Step, Every Formation, Every Dream"
    },
    {
      "t": "p",
      "x": "Behind every synchronized formation is a team that understands the importance of trust. One performer’s movement becomes connected to another’s, creating something far greater than individual talent."
    },
    {
      "t": "p",
      "x": "That spirit of togetherness has always been at the heart of Prince Dance Group."
    },
    {
      "t": "p",
      "x": "Their journey demonstrates that success is not created in a single moment. It is built through thousands of small moments—the early rehearsals, repeated movements, corrections, challenges, laughter, sacrifices, and the decision to keep going when the journey becomes difficult."
    },
    {
      "t": "p",
      "x": "Every step represents a lesson."
    },
    {
      "t": "p",
      "x": "Every formation represents teamwork."
    },
    {
      "t": "p",
      "x": "Every performance represents a dream brought to life."
    },
    {
      "t": "h",
      "x": "A Legacy That Continues"
    },
    {
      "t": "p",
      "x": "Today, Prince Dance Group stands as a symbol of dedication and artistic excellence. Their story continues to inspire performers and audiences who believe that the stage is not simply a place to perform—it is a place to tell stories, create emotions, and leave a lasting impression."
    },
    {
      "t": "p",
      "x": "The journey that began with a dream reached a defining milestone on India’s Got Talent Season 1, but the story did not end with the trophy. It became the beginning of a larger legacy."
    },
    {
      "t": "p",
      "x": "Because for Prince Dance Group, dance has never been just about the final performance."
    },
    {
      "t": "p",
      "x": "It is about the journey behind it."
    },
    {
      "t": "p",
      "x": "It is about the people who take every step together."
    },
    {
      "t": "p",
      "x": "And most importantly, it is about the story that every step tells."
    },
    {
      "t": "p",
      "x": "Every step has a story. Every performance has a purpose. And every stage is another chapter in the remarkable journey of Prince Dance Group."
    },
    {
      "t": "p",
      "x": "Their continuing performances are an important part of their story because they show the difference between a moment of popularity and a genuine performance legacy."
    },
    {
      "t": "p",
      "x": "The group continues to bring its distinctive style to audiences, creating performances for cultural celebrations, corporate events, weddings, festivals, college programs, award ceremonies, government events, and other prestigious occasions."
    },
    {
      "t": "p",
      "x": "The stages may change."
    },
    {
      "t": "p",
      "x": "The audiences may change."
    },
    {
      "t": "p",
      "x": "The performance may evolve."
    },
    {
      "t": "p",
      "x": "But the passion remains."
    },
    {
      "t": "h",
      "x": "The Vision Behind the Journey"
    },
    {
      "t": "p",
      "x": "Behind the Prince Dance Group story is founder and choreographer T. Krishna Mohan Reddy, whose vision helped transform a group of passionate performers into a nationally recognized dance troupe."
    },
    {
      "t": "p",
      "x": "His journey reflects the philosophy that has shaped Prince Dance Group from the beginning: talent must be supported by discipline, and dreams must be supported by action."
    },
    {
      "t": "p",
      "x": "The India’s Got Talent victory gave that vision a national platform."
    },
    {
      "t": "p",
      "x": "The years that followed gave it depth."
    },
    {
      "t": "h",
      "x": "More Than a Dance Group"
    },
    {
      "t": "p",
      "x": "What makes Prince Dance Group's journey particularly inspiring is that their identity has never been limited to a competition title."
    },
    {
      "t": "p",
      "x": "They are performers."
    },
    {
      "t": "p",
      "x": "They are storytellers."
    },
    {
      "t": "p",
      "x": "They are a team."
    },
    {
      "t": "p",
      "x": "And they are part of a legacy that continues to inspire audiences."
    },
    {
      "t": "p",
      "x": "Their story demonstrates that a stage is more than a place to perform. It is a place where hard work becomes visible, where teamwork becomes art, and where dreams can become unforgettable moments."
    },
    {
      "t": "h",
      "x": "Looking Toward the Future"
    },
    {
      "t": "p",
      "x": "The next chapter of Prince Dance Group is not about recreating the past."
    },
    {
      "t": "p",
      "x": "It is about building on it."
    },
    {
      "t": "p",
      "x": "The lessons of 2009 remain part of the foundation, but every new performance creates an opportunity to explore new ideas, new stages, and new audiences."
    },
    {
      "t": "p",
      "x": "The future is about continuing to raise the standard of live performance and creating experiences that audiences remember long after the curtain falls."
    },
    {
      "t": "p",
      "x": "The India’s Got Talent trophy represents where the journey reached a defining moment."
    },
    {
      "t": "p",
      "x": "But it does not represent where the journey ends."
    },
    {
      "t": "h",
      "x": "The Story Continues"
    },
    {
      "t": "p",
      "x": "So, where are the winners of India’s Got Talent Season 1 now?"
    },
    {
      "t": "p",
      "x": "They are still moving forward."
    },
    {
      "t": "p",
      "x": "Still performing."
    },
    {
      "t": "p",
      "x": "Still creating."
    },
    {
      "t": "p",
      "x": "Still inspiring."
    },
    {
      "t": "p",
      "x": "From Berhampur, Odisha, to the national spotlight, Prince Dance Group has built a story that cannot be contained within a single television season."
    },
    {
      "t": "p",
      "x": "2009 gave them the spotlight."
    },
    {
      "t": "p",
      "x": "17 years gave them the legacy."
    },
    {
      "t": "p",
      "x": "And every new stage gives them another opportunity to write the next chapter."
    },
    {
      "t": "p",
      "x": "Because for Prince Dance Group, the greatest performance may not be the one they have already given."
    },
    {
      "t": "p",
      "x": "It may be the one still waiting to be created."
    },
    {
      "t": "p",
      "x": "Prince Dance Group"
    },
    {
      "t": "p",
      "x": "Precise Formation. Grand Stages. Unforgettable Shows."
    },
    {
      "t": "lines",
      "x": [
        "The journey began with a dream.",
        "The nation witnessed the victory.",
        "The legacy continues on every stage."
      ]
    }
  ],
  "best-dance-group-to-book-for-your-event-in-india": [
    {
      "t": "p",
      "x": "When an event is meant to be remembered, entertainment should be more than a performance—it should be an experience."
    },
    {
      "t": "p",
      "x": "Whether it is a grand wedding, corporate celebration, cultural festival, college fest, award ceremony, private celebration, or large-scale public event, the right performance can transform the atmosphere and leave your audience talking long after the final applause."
    },
    {
      "t": "p",
      "x": "For event organisers looking for a powerful and professional dance performance, **Prince Dance Group** brings a remarkable legacy, national recognition, and years of experience to the stage."
    },
    {
      "t": "h",
      "x": "Why Choose Prince Dance Group?"
    },
    {
      "t": "p",
      "x": "Prince Dance Group became nationally recognised after winning **India’s Got Talent Season 1 in 2009**. Their journey from Berhampur, Odisha, to the national spotlight remains one of the most memorable success stories in Indian dance entertainment."
    },
    {
      "t": "p",
      "x": "But their story did not end with the trophy."
    },
    {
      "t": "p",
      "x": "The group has continued to perform for audiences and events, carrying forward a performance philosophy built around **precision, teamwork, creativity, powerful formations, and visual storytelling**."
    },
    {
      "t": "p",
      "x": "Their legacy gives event organisers more than just a dance performance—it brings the experience of a group that has performed on a national platform and continues to create memorable live shows."
    },
    {
      "t": "h",
      "x": "Book Prince Dance Group for Events Across India"
    },
    {
      "t": "p",
      "x": "Your event does not have to be in Odisha."
    },
    {
      "t": "p",
      "x": "Prince Dance Group is available for event opportunities across India, with booking listings indicating nationwide travel availability."
    },
    {
      "t": "p",
      "x": "From **Delhi to Mumbai, Bengaluru to Hyderabad, Kolkata to Chennai, Pune to Jaipur, Ahmedabad to Bhubaneswar**, and destinations across the country, event organisers can enquire about bringing Prince Dance Group to their stage."
    },
    {
      "t": "p",
      "x": "Whether you are organising an event in a metropolitan city or a destination celebration, performance requirements, travel arrangements, scheduling, and availability can be discussed during the booking process."
    },
    {
      "t": "h",
      "x": "Perfect for Every Grand Occasion"
    },
    {
      "t": "p",
      "x": "Prince Dance Group can bring energy and spectacle to a wide variety of events, including:"
    },
    {
      "t": "ul",
      "x": [
        "**Corporate Events & Annual Functions**",
        "**Weddings & Receptions**",
        "**Sangeet Celebrations**",
        "**Cultural Festivals**",
        "**College & University Events**",
        "**Award Ceremonies**",
        "**Government & Public Events**",
        "**Brand Events & Launches**",
        "**Live Concerts**",
        "**Private Celebrations**",
        "**Destination Events**",
        "**Special Cultural Programs**"
      ]
    },
    {
      "t": "p",
      "x": "The group’s performance style can be adapted to the character and requirements of the occasion, creating a show that complements the event rather than simply appearing as an entertainment segment."
    },
    {
      "t": "h",
      "x": "From India’s Got Talent to Your Grand Stage"
    },
    {
      "t": "p",
      "x": "There is a difference between watching a performance on television and experiencing a live performance in front of your guests."
    },
    {
      "t": "p",
      "x": "A live stage creates energy."
    },
    {
      "t": "p",
      "x": "The music begins."
    },
    {
      "t": "p",
      "x": "The lights rise."
    },
    {
      "t": "p",
      "x": "The formations come together."
    },
    {
      "t": "p",
      "x": "And suddenly, the entire atmosphere changes."
    },
    {
      "t": "p",
      "x": "That is the experience Prince Dance Group aims to create."
    },
    {
      "t": "p",
      "x": "Their performances are built around coordinated movement and visual impact, turning the stage into a storytelling space where every performer contributes to one larger picture."
    },
    {
      "t": "h",
      "x": "A Legacy Built Over 17 Years"
    },
    {
      "t": "p",
      "x": "Behind every performance is years of experience."
    },
    {
      "t": "p",
      "x": "For approximately 17 years, Prince Dance Group has continued to build its identity through dedication, rehearsal, teamwork, and a passion for live performance."
    },
    {
      "t": "p",
      "x": "The *India’s Got Talent Season 1* victory remains a defining milestone, but the larger story is the journey that followed."
    },
    {
      "t": "p",
      "x": "The group continues to represent a philosophy of **Precise Formation. Grand Stages. Unforgettable Shows.**"
    },
    {
      "t": "p",
      "x": "That philosophy is what makes every performance an opportunity to create something memorable."
    },
    {
      "t": "h",
      "x": "Make Your Event Unforgettable"
    },
    {
      "t": "p",
      "x": "The best events are remembered through moments."
    },
    {
      "t": "p",
      "x": "A breathtaking opening."
    },
    {
      "t": "p",
      "x": "A powerful formation."
    },
    {
      "t": "p",
      "x": "An unexpected transition."
    },
    {
      "t": "p",
      "x": "The reaction of the audience."
    },
    {
      "t": "p",
      "x": "The applause at the end."
    },
    {
      "t": "p",
      "x": "These are the moments that turn an event into a memory."
    }
  ],
};
