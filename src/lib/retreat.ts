// All copy for the "Know Thyself" retreat landing experience.

export const BOOKING = {
  phoneDisplay: "73737-38391",
  tel: "tel:+917373738391",
};

export const RETREAT = {
  badge: "6 Days · 5 Nights Residential Retreat",
  titleLead: "Learn from",
  titleHighlight: "India's No.1",
  titleTail: "Human Potential Coach",
  subtitle:
    "Reignite your spark, rediscover freedom, and reconnect with the part of you that still longs to live fully.",
  ratingValue: "4.5",
  ratingCount: "467 people signed up",
};

export interface Practice {
  no: string;
  glyph: string;
  name: string;
  highlight: string; // word within name to accent
  description: string;
  benefits: string[];
}

export const PRACTICES: Practice[] = [
  {
    no: "01",
    glyph: "✺",
    name: "Rhythmic Release Meditation",
    highlight: "Release",
    description:
      "A powerful active meditation designed to release suppressed emotions and stagnant energy. Through guided movement, breath, and sound, this practice clears mental overload and reconnects you with deep inner awareness.",
    benefits: [
      "Release emotional blockages",
      "Experience mental clarity",
      "Awaken dormant inner energy",
    ],
  },
  {
    no: "02",
    glyph: "🌊",
    name: "Catharsis",
    highlight: "Catharsis",
    description:
      "A deeply transformative emotional release process that allows long-held stress, pain, and suppressed emotions to safely dissolve — helping you feel lighter from within.",
    benefits: [
      "Heal emotional wounds",
      "Reduce accumulated stress",
      "Restore emotional balance",
    ],
  },
  {
    no: "03",
    glyph: "☾",
    name: "Yog Nidra",
    highlight: "Nidra",
    description:
      "Also known as yogic sleep, this guided practice brings profound relaxation while keeping awareness alive — allowing deep restoration at both mental and physical levels.",
    benefits: [
      "Deep nervous system relaxation",
      "Improved focus and clarity",
      "Relief from chronic fatigue",
    ],
  },
  {
    no: "04",
    glyph: "✷",
    name: "Body Tapping Healing",
    highlight: "Tapping",
    description:
      "A gentle yet powerful method that activates energy pathways, releases stored tension, and restores balance between body and emotions.",
    benefits: [
      "Improve energy circulation",
      "Release physical tension",
      "Support emotional healing",
    ],
  },
  {
    no: "05",
    glyph: "☸",
    name: "7 Chakra Balancing",
    highlight: "Chakra",
    description:
      "A guided process to align and harmonize your body's energy centers, helping remove internal blockages and restore natural balance.",
    benefits: [
      "Restore inner harmony",
      "Deepen spiritual connection",
      "Energize mind and body",
    ],
  },
  {
    no: "06",
    glyph: "🕊",
    name: "Liberation Kriya",
    highlight: "Liberation",
    description:
      "A sacred inner practice designed to help you dissolve limiting beliefs and unconscious patterns — creating space for emotional freedom and personal transformation.",
    benefits: [
      "Break mental limitations",
      "Experience inner freedom",
      "Support spiritual awakening",
    ],
  },
];

export const WHY_JOIN: string[] = [
  "Feeling trapped in anxiety that disturbs your peace",
  "Tired of fear limiting your true potential",
  "Stuck in cycles of guilt and self-blame",
  "Seeking deep healing — not temporary motivation",
  "Want a complete mind, body & soul reset in one place",
  "Longing to reconnect with your inner child and joy",
  "Want emotional strength and inner freedom",
  "Searching for clarity about purpose and direction",
  "Desire to meet like-minded spiritual seekers",
  "Ready to break unhealthy life patterns permanently",
];

export const NOT_FOR_YOU: string[] = [
  "Looking for quick fixes without inner commitment",
  "Seeking a vacation or luxury escape instead of transformation",
  "Uncomfortable with meditation, silence, or deep inner work",
  "Expecting results without active participation",
  "Not willing to release negativity, ego, or judgement",
  "Blaming external situations without self-reflection",
  "Avoiding emotional healing processes",
  "Choosing comfort over growth",
  "Coming only for photos, reels, or social media",
  "Expecting magic without discipline and surrender",
];

export const COACH = {
  name: "Anurag Rishi",
  role: "Holistic Wellness Coach",
  bio: [
    "Anurag Rishi is a powerful force in mindset and inner transformation. With 11+ years of experience as a transformational speaker and coach, he has helped thousands rediscover clarity, confidence, and purpose.",
    "His approach combines deep wisdom with a light, interactive environment where participants feel safe to open, learn, and transform naturally.",
    "Known for his high energy and practical guidance, he helps individuals unlock their inner strength and step into unstoppable personal growth.",
  ],
  stats: [
    { value: "2.5M+", label: "YouTube Subscribers" },
    { value: "11+", label: "Years Experience" },
    { value: "23M+", label: "People Empowered" },
  ],
};

export const PARTICIPANT_QUOTES = [
  {
    name: "Priya M.",
    text: "Six days that rewired my mind. I arrived exhausted and left feeling reborn — lighter, clearer, and finally at peace with myself.",
  },
  {
    name: "Rohan S.",
    text: "The Catharsis session broke something open in me I'd held for years. I cried, I laughed, and I walked out free.",
  },
  {
    name: "Aarti K.",
    text: "Anurag's energy is unreal. The chakra balancing and Yog Nidra gave me the deepest rest I've had in a decade.",
  },
];
