import { describe, it, expect, vi } from 'vitest';
import { isSimilarMovie } from '../comparisonUtils';
import { Movie } from '../../models/Movie';
import { Review, ReviewType } from '../../models/Review';
import { Categories } from '../../models/Categories';

// Mock moment to avoid date issues in tests
vi.mock('moment', () => ({
  default: vi.fn(() => ({
    toDate: () => new Date('2023-01-01'),
  })),
}));

describe('comparisonUtils', () => {
  const createMockMovie = (name: string, slug: string, categories: Categories, overallRating: number = 5): Movie => {
    const review = new Review(ReviewType.Official, 'Test review', categories);
    // Override the calculated rating for testing
    review.overallRating = overallRating;

    const movie = new Movie(
      1,
      name,
      '/poster.jpg',
      '/backdrop.jpg',
      'Test synopsis',
      new Date(),
      '01/01/2023',
      [review]
    );
    movie.slug = slug;
    return movie;
  };

  describe('isSimilarMovie', () => {
    it('should return false for same slug', () => {
      const movie1 = createMockMovie('Movie A', 'movie-a-2023', new Categories(5, 5, 5, 5, 5));
      const movie2 = createMockMovie('Movie A', 'movie-a-2023', new Categories(5, 5, 5, 5, 5));

      expect(isSimilarMovie(movie1, movie2)).toBe(false);
    });

    it('should return true for movies with same top categories and close ratings', () => {
      const movie1 = createMockMovie('Movie A', 'movie-a-2023', new Categories(8, 7, 6, 2, 1), 7);
      const movie2 = createMockMovie('Movie B', 'movie-b-2023', new Categories(8, 7, 6, 1, 2), 7.5);

      expect(isSimilarMovie(movie1, movie2)).toBe(true);
    });

    it('should return true for movies with similar names', () => {
      const movie1 = createMockMovie('The Conjuring', 'conjuring-2023', new Categories(5, 5, 5, 5, 5), 5);
      const movie2 = createMockMovie('Conjuring 2', 'conjuring-2-2023', new Categories(1, 1, 1, 1, 1), 1);

      expect(isSimilarMovie(movie1, movie2)).toBe(true);
    });

    it('should return false for movies with different categories and names', () => {
      const movie1 = createMockMovie('Action Movie', 'action-2023', new Categories(8, 7, 6, 5, 4), 7);
      const movie2 = createMockMovie('Comedy Film', 'comedy-2023', new Categories(1, 2, 3, 4, 5), 3);

      expect(isSimilarMovie(movie1, movie2)).toBe(false);
    });

    it('should return false for movies with same categories but far ratings', () => {
      const movie1 = createMockMovie('Horror Film A', 'horror-a-2023', new Categories(8, 7, 6, 2, 1), 9);
      const movie2 = createMockMovie('Thriller Movie B', 'thriller-b-2023', new Categories(8, 7, 6, 1, 2), 3);

      expect(isSimilarMovie(movie1, movie2)).toBe(false);
    });

    it('should ignore common words in name similarity', () => {
      const movie1 = createMockMovie('The Movie', 'the-movie-2023', new Categories(5, 5, 5, 5, 5), 5);
      const movie2 = createMockMovie('Movie and Something', 'movie-something-2023', new Categories(1, 1, 1, 1, 1), 1);

      expect(isSimilarMovie(movie1, movie2)).toBe(true);
    });
  });
});