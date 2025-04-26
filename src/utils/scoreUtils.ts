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
***REMOVED***;

export const fearLevelText = (scareScaleRating: number) => {
  return fearLevels[Math.round(scareScaleRating)] ?? "Unknown";
***REMOVED***;

export const calculateOverallRating = (categoryRatings: Object) => {
  if (categoryRatings) {
    // Convert object values to an array and sort in descending order
    let topThree = Object.values(categoryRatings)
      .sort((a, b) => b - a)
      .slice(0, 3);

    // Sum the top three values and divide by 3
    let average = topThree.reduce((sum, value) => sum + value, 0) / 3;

    return average; // Rounds to the nearest whole number
  ***REMOVED***
  return 0;
***REMOVED***;


export const round = (scareScaleRating: number) => Math.round(scareScaleRating * 10) / 10;