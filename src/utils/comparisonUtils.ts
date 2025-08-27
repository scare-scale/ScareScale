const ignoredWords = new Set(["the", "and", "it", "of", "a", "an", "in", "on", "to", "with", "for", "at", "by", "from"]);

const isSameSlug = (a, b): boolean => a.slug === b.slug;

const hasSameTopCategories = (a, b): boolean => {
  const setA = new Set(a.topCategories);
  const setB = new Set(b.topCategories);
  return [...setA].every((cat) => setB.has(cat));
};

const isWithinScareScaleRange = (a, b, range = 2): boolean =>
  Math.abs(a.scareScaleRating - b.scareScaleRating) <= range;

const hasSimilarName = (a, b): boolean => {
  
  const getFilteredWords = (name: string): Set<string> =>
    new Set(
      name
        .toLowerCase()
        .split(/\s+/)
        .filter((word) => word && !ignoredWords.has(word.toLowerCase()))
    );

  const wordsA = getFilteredWords(a.data.name);
  const wordsB = getFilteredWords(b.data.name);

  return [...wordsA].some((word) => wordsB.has(word));
};

export const isSimilarMovie = (movie, similar): boolean => {
  if (isSameSlug(movie, similar)) return false;

  const categoryMatch = hasSameTopCategories(movie, similar);
  const scoreMatch = isWithinScareScaleRange(movie, similar);
  const nameMatch = hasSimilarName(movie, similar);

  return (categoryMatch && scoreMatch) || nameMatch;
};