const isSameSlug = (a, b): boolean => a.slug === b.slug;

const hasSameTopCategories = (a, b): boolean => {
  const setA = new Set(a.topCategories);
  const setB = new Set(b.topCategories);
  return [...setA].every((cat) => setB.has(cat));
};

const isWithinScareScaleRange = (a, b, range = 2): boolean =>
  Math.abs(a.scareScaleRating - b.scareScaleRating) <= range;

const hasSimilarName = (a, b): boolean => {
  const wordsA = new Set(a.data.name.toLowerCase().split(/\s+/));
  const wordsB = new Set(b.data.name.toLowerCase().split(/\s+/));
  return [...wordsA].some((word) => wordsB.has(word));
};

export const isSimilarMovie = (movie, similar): boolean => {
  if (isSameSlug(movie, similar)) return false;

  const categoryMatch = hasSameTopCategories(movie, similar);
  const scoreMatch = isWithinScareScaleRange(movie, similar);
  const nameMatch = hasSimilarName(movie, similar);

  return (categoryMatch && scoreMatch) || nameMatch;
};