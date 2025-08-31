import type { Categories } from "../models/Categories";

const fearLevels: Record<number, string> = {
  0: "Unrated",
  1: "Harmless",
  2: "Tame",
  3: "Unnerving",
  4: "Eerie",
  5: "Creepy",
  6: "Sinister",
  7: "Ominous",
  8: "Horrifying",
  9: "Nightmarish",
  10: "Petrifying",
};

export const fearLevelText = (scareScaleRating: number) => {
  return fearLevels[Math.round(scareScaleRating)] ?? "Unknown";
};

export const calculateOverallRating = (categoryRatings: Categories) => {
  if (categoryRatings) {

    const topThree = Object.values(categoryRatings)
      .sort((a, b) => b - a)
      .slice(0, 3);

    const adjustedScores = topThree.map(score => score <= 3 ? 0 : score);

    const numPenalized = adjustedScores.filter(score => score === 0).length;

    const baseAverage = adjustedScores.reduce((sum, val) => sum + val, 0) / 3;

    const penalty = numPenalized * 0.5;

    const finalScore = Math.max(baseAverage - penalty, 0);

    return round(finalScore);
  }
  return 0;
};

export const round = (scareScaleRating: number) => Math.round(scareScaleRating * 10) / 10;