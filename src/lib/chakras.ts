export interface Chakra {
  id: number;
  name: string;
  sanskrit: string;
  color: string;
  glowColor: string;
  image: string;
  meaning: string;
  affirmation: string;
  symbol: string;
  /** vertical position (%) of the overlay on the meditating figure's spine */
  top: number;
}

// NOTE: assets in this repo live under /public/chakra (singular) and the
// third-eye image is named eye.png — these paths reflect the real files.
export const CHAKRAS: Chakra[] = [
  {
    id: 1,
    name: "Root Chakra",
    sanskrit: "Muladhara",
    color: "#FF0000",
    glowColor: "rgba(255,0,0,0.8)",
    image: "/chakra/root.png",
    meaning: "Grounding & Stability",
    affirmation: "I am safe and grounded",
    symbol: "✦",
    top: 67,
  },
  {
    id: 2,
    name: "Sacral Chakra",
    sanskrit: "Svadhisthana",
    color: "#FF6B00",
    glowColor: "rgba(255,107,0,0.8)",
    image: "/chakra/sacral.png",
    meaning: "Creativity & Emotion",
    affirmation: "I embrace my creativity",
    symbol: "✶",
    top: 58,
  },
  {
    id: 3,
    name: "Solar Plexus Chakra",
    sanskrit: "Manipura",
    color: "#FFD700",
    glowColor: "rgba(255,215,0,0.8)",
    image: "/chakra/solar.png",
    meaning: "Personal Power",
    affirmation: "I am confident and powerful",
    symbol: "❂",
    top: 50,
  },
  {
    id: 4,
    name: "Heart Chakra",
    sanskrit: "Anahata",
    color: "#00FF7F",
    glowColor: "rgba(0,255,127,0.8)",
    image: "/chakra/heart.png",
    meaning: "Love & Compassion",
    affirmation: "I give and receive love freely",
    symbol: "❀",
    top: 44,
  },
  {
    id: 5,
    name: "Throat Chakra",
    sanskrit: "Vishuddha",
    color: "#00BFFF",
    glowColor: "rgba(0,191,255,0.8)",
    image: "/chakra/throat.png",
    meaning: "Truth & Expression",
    affirmation: "I speak my truth clearly",
    symbol: "✺",
    top: 34,
  },
  {
    id: 6,
    name: "Third Eye Chakra",
    sanskrit: "Ajna",
    color: "#6A0DAD",
    glowColor: "rgba(106,13,173,0.8)",
    image: "/chakra/eye.png",
    meaning: "Intuition & Wisdom",
    affirmation: "I trust my inner wisdom",
    symbol: "◉",
    top: 27,
  },
  {
    id: 7,
    name: "Crown Chakra",
    sanskrit: "Sahasrara",
    color: "#9B59B6",
    glowColor: "rgba(155,89,182,0.8)",
    image: "/chakra/crown.png",
    meaning: "Divine Connection",
    affirmation: "I am connected to the universe",
    symbol: "✧",
    top: 20,
  },
];

/**
 * Scroll story is split into 9 segments across 800vh.
 * segment 0  -> welcome, all dark
 * segment 1-6 -> activate one chakra at a time (root first)
 * segment 7  -> crown activates, all chakras glow together
 * segment 8  -> video reveal
 */
export const SEGMENT_COUNT = 9;

export function progressToSegment(progress: number): number {
  // segment 0 occupies 0-10%, segments 1-7 occupy 12% each (10%-94%),
  // segment 8 occupies 94%-100%.
  if (progress < 0.1) return 0;
  if (progress >= 0.94) return 8;
  return Math.min(7, 1 + Math.floor((progress - 0.1) / 0.12));
}
