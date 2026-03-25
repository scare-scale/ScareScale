export interface Rank {
  name: string;
  emoji: string;
  minReviews: number;
  colorClass: string;
  bgClass: string;
}

export const RANKS: Rank[] = [
  {
    name: "Scare Scale Master",
    emoji: "💀",
    minReviews: 50,
    colorClass: "text-blood-400",
    bgClass: "bg-blood-950/40 border-blood-700/40",
  },
  {
    name: "Horror Fanatic",
    emoji: "🎃",
    minReviews: 25,
    colorClass: "text-orange-400",
    bgClass: "bg-orange-950/40 border-orange-700/40",
  },
  {
    name: "Scream Enthusiast",
    emoji: "😱",
    minReviews: 10,
    colorClass: "text-yellow-400",
    bgClass: "bg-yellow-950/40 border-yellow-700/40",
  },
  {
    name: "Fear Seeker",
    emoji: "👻",
    minReviews: 3,
    colorClass: "text-green-400",
    bgClass: "bg-green-950/40 border-green-700/40",
  },
  {
    name: "Scared Beginner",
    emoji: "🌱",
    minReviews: 1,
    colorClass: "text-gray-300",
    bgClass: "bg-gray-800/40 border-gray-700/40",
  },
];

export const UNRANKED: Rank = {
  name: "Unreviewed",
  emoji: "🎬",
  minReviews: 0,
  colorClass: "text-gray-500",
  bgClass: "bg-gray-900/40 border-gray-800/40",
};

export const getRank = (reviewCount: number): Rank => {
  return RANKS.find((r) => reviewCount >= r.minReviews) ?? UNRANKED;
};

export const getNextRank = (reviewCount: number): Rank | null => {
  const currentRankIndex = RANKS.findIndex((r) => reviewCount >= r.minReviews);
  if (currentRankIndex === -1) return RANKS[RANKS.length - 1]; // unranked → first tier
  if (currentRankIndex === 0) return null;                      // already at top rank
  return RANKS[currentRankIndex - 1];
};

export const getRankProgress = (
  reviewCount: number
): { current: Rank; next: Rank | null; progress: number; needed: number } => {
  const current = getRank(reviewCount);
  const next = getNextRank(reviewCount);

  if (!next) {
    return { current, next: null, progress: 100, needed: 0 };
  }

  const fromMin = current.minReviews;
  const needed  = next.minReviews - reviewCount;
  const progress = Math.round(((reviewCount - fromMin) / (next.minReviews - fromMin)) * 100);

  return { current, next, progress, needed };
};
