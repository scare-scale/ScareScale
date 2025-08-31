import type { Movie } from "../models/Movie";

const ignoredWords = new Set(["the", "and", "it", "of", "a", "an", "in", "on", "to", "with", "for", "at", "by", "from"]);

const isSameSlug = (a: Movie, b: Movie): boolean => a.slug === b.slug;

const hasSameTopCategories = (a: Movie, b: Movie): boolean => {
  const setA = new Set(a.getTopCategories());
  const setB = new Set(b.getTopCategories());
  return [...setA].every((cat) => setB.has(cat));
};

const isWithinScareScaleRange = (a: Movie, b: Movie, range = 2): boolean =>
  Math.abs(a.officialScore - b.officialScore) <= range;

const hasSimilarName = (a: Movie, b: Movie): boolean => {
  
  const getFilteredWords = (name: string): Set<string> =>
    new Set(
      name
        .toLowerCase()
        .split(/\s+/)
        .filter((word) => word && !ignoredWords.has(word.toLowerCase()))
    );

  const wordsA = getFilteredWords(a.name);
  const wordsB = getFilteredWords(b.name);

  return [...wordsA].some((word) => wordsB.has(word));
};

export const isSimilarMovie = (movie: Movie, similar: Movie): boolean => {
  if (isSameSlug(movie, similar)) return false;

  const categoryMatch = hasSameTopCategories(movie, similar);
  const scoreMatch = isWithinScareScaleRange(movie, similar);
  const nameMatch = hasSimilarName(movie, similar);

  return (categoryMatch && scoreMatch) || nameMatch;
};