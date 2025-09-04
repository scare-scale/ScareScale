import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Movie } from '../Movie';
import { Review, ReviewType } from '../Review';
import { Categories } from '../Categories';

// Mock moment to control date parsing
vi.mock('moment', () => ({
  default: vi.fn((dateString: string) => ({
    toDate: () => {
      if (dateString === '01/01/2023') {
        return new Date('2023-01-01');
      }
      if (dateString === '01/01/2026') {
        return new Date('2026-01-01');
      }
      if (dateString === 'invalid-date') {
        return new Date('Invalid Date');
      }
      return new Date('2023-01-01');
    },
  })),
}));

describe('Movie', () => {
  let mockReview: Review;

  beforeEach(() => {
    mockReview = new Review(ReviewType.Official, 'Test review', new Categories(5, 5, 5, 5, 5));
  });

  describe('constructor', () => {
    it('should initialize movie properties correctly', () => {
      const movie = new Movie(
        123,
        'Test Movie',
        '/poster.jpg',
        '/backdrop.jpg',
        'Test synopsis',
        new Date(),
        '01/01/2023',
        [mockReview]
      );

      expect(movie.id).toBe(123);
      expect(movie.name).toBe('Test Movie');
      expect(movie.synopsis).toBe('Test synopsis');
      expect(movie.reviews).toEqual([mockReview]);
      expect(movie.releaseYear).toBe(2023);
      expect(movie.isReleased).toBe(true);
      expect(movie.slug).toBe('test-movie-2023');
    });

    it('should generate correct URLs', () => {
      const movie = new Movie(
        123,
        'Test Movie',
        '/poster.jpg',
        '/backdrop.jpg',
        'Test synopsis',
        new Date(),
        '01/01/2023',
        [mockReview]
      );

      expect(movie.tmdbUrl).toBe('https://www.themoviedb.org/movie/123');
      expect(movie.trailersUrl).toBe('https://www.themoviedb.org/movie/123/videos?active_nav_item=Trailers');
      expect(movie.reviewsUrl).toBe('https://www.themoviedb.org/movie/123/reviews');
      expect(movie.posterUrl).toBe('https://www.themoviedb.org/t/p/w300_and_h450_bestv2/poster.jpg');
      expect(movie.backdropUrl).toBe('https://image.tmdb.org/t/p/original/backdrop.jpg');
    });

    it('should handle unreleased movies', () => {
      const futureMovie = new Movie(
        456,
        'Future Movie',
        '/poster.jpg',
        '/backdrop.jpg',
        'Future synopsis',
        new Date(),
        '01/01/2026',
        [mockReview]
      );

      expect(futureMovie.isReleased).toBe(false);
      expect(futureMovie.reviews).toEqual([]);
    });

    it('should throw error for invalid date', () => {
      expect(() => {
        new Movie(
          123,
          'Test Movie',
          '/poster.jpg',
          '/backdrop.jpg',
          'Test synopsis',
          new Date(),
          'invalid-date',
          [mockReview]
        );
      }).toThrow('Invalid release date for movie "Test Movie": invalid-date');
    });
  });

  describe('getTopCategories', () => {
    it('should return top categories from priority review', () => {
      const movie = new Movie(
        123,
        'Test Movie',
        '/poster.jpg',
        '/backdrop.jpg',
        'Test synopsis',
        new Date(),
        '01/01/2023',
        [mockReview]
      );

      const topCategories = movie.getTopCategories();
      expect(topCategories).toEqual(['gore', 'creepy', 'suspense']);
    });
  });

  describe('isApproved', () => {
    it('should return true if has official review with rating >= 6', () => {
      const highRatedReview = new Review(ReviewType.Official, 'Good', new Categories(8, 8, 8, 8, 8));
      const movie = new Movie(
        123,
        'Approved Movie',
        '/poster.jpg',
        '/backdrop.jpg',
        'Test synopsis',
        new Date(),
        '01/01/2023',
        [highRatedReview]
      );

      expect(movie.isApproved()).toBe(true);
    });

    it('should return false if no official review with rating >= 6', () => {
      const lowRatedReview = new Review(ReviewType.Official, 'Bad', new Categories(2, 2, 2, 2, 2));
      const movie = new Movie(
        123,
        'Unapproved Movie',
        '/poster.jpg',
        '/backdrop.jpg',
        'Test synopsis',
        new Date(),
        '01/01/2023',
        [lowRatedReview]
      );

      expect(movie.isApproved()).toBe(false);
    });

    it('should return false if no reviews', () => {
      const movie = new Movie(
        123,
        'No Reviews Movie',
        '/poster.jpg',
        '/backdrop.jpg',
        'Test synopsis',
        new Date(),
        '01/01/2023',
        []
      );

      expect(movie.isApproved()).toBe(false);
    });
  });

  describe('isOfficial', () => {
    it('should return true if has official review', () => {
      const officialReview = new Review(ReviewType.Official, 'Official', new Categories(5, 5, 5, 5, 5));
      const movie = new Movie(
        123,
        'Official Movie',
        '/poster.jpg',
        '/backdrop.jpg',
        'Test synopsis',
        new Date(),
        '01/01/2023',
        [officialReview]
      );

      expect(movie.isOfficial()).toBe(true);
    });

    it('should return false if no official review', () => {
      const userReview = new Review(ReviewType.User, 'User', new Categories(5, 5, 5, 5, 5));
      const movie = new Movie(
        123,
        'Unofficial Movie',
        '/poster.jpg',
        '/backdrop.jpg',
        'Test synopsis',
        new Date(),
        '01/01/2023',
        [userReview]
      );

      expect(movie.isOfficial()).toBe(false);
    });
  });

  describe('getPriorityReview', () => {
    it('should return official review first', () => {
      const officialReview = new Review(ReviewType.Official, 'Official', new Categories(8, 8, 8, 8, 8));
      const userReview = new Review(ReviewType.User, 'User', new Categories(5, 5, 5, 5, 5));
      const movie = new Movie(
        123,
        'Test Movie',
        '/poster.jpg',
        '/backdrop.jpg',
        'Test synopsis',
        new Date(),
        '01/01/2023',
        [userReview, officialReview]
      );

      const priorityReview = movie.getPriorityReview();
      expect(priorityReview.type).toBe(ReviewType.Official);
    });

    it('should return user review if no official', () => {
      const userReview = new Review(ReviewType.User, 'User', new Categories(5, 5, 5, 5, 5));
      const aiReview = new Review(ReviewType.AI, 'AI', new Categories(3, 3, 3, 3, 3));
      const movie = new Movie(
        123,
        'Test Movie',
        '/poster.jpg',
        '/backdrop.jpg',
        'Test synopsis',
        new Date(),
        '01/01/2023',
        [aiReview, userReview]
      );

      const priorityReview = movie.getPriorityReview();
      expect(priorityReview.type).toBe(ReviewType.User);
    });

    it('should return empty review if no reviews', () => {
      const movie = new Movie(
        123,
        'Test Movie',
        '/poster.jpg',
        '/backdrop.jpg',
        'Test synopsis',
        new Date(),
        '01/01/2023',
        []
      );

      const priorityReview = movie.getPriorityReview();
      expect(priorityReview.type).toBe(ReviewType.Official);
      expect(priorityReview.overallRating).toBe(0);
    });
  });
});