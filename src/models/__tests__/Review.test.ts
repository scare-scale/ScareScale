import { describe, it, expect } from 'vitest';
import { Review, ReviewType } from '../Review';
import { Categories } from '../Categories';

describe('Review', () => {
  describe('constructor', () => {
    it('should calculate overall rating and score text', () => {
      const categories = new Categories(8, 7, 6, 2, 1);
      const review = new Review(ReviewType.Official, 'Great horror movie', categories);

      expect(review.type).toBe(ReviewType.Official);
      expect(review.content).toBe('Great horror movie');
      expect(review.categories).toBe(categories);
      expect(review.overallRating).toBe(7);
      expect(review.scoreText).toBe('Ominous');
    });

    it('should handle different review types', () => {
      const categories = new Categories(5, 5, 5, 5, 5);
      const userReview = new Review(ReviewType.User, 'User review', categories);
      const aiReview = new Review(ReviewType.AI, 'AI review', categories);

      expect(userReview.type).toBe(ReviewType.User);
      expect(aiReview.type).toBe(ReviewType.AI);
    });
  });

  describe('static empty', () => {
    it('should create empty review with zero categories', () => {
      const emptyReview = Review.empty();

      expect(emptyReview.type).toBe(ReviewType.Official);
      expect(emptyReview.content).toBe('');
      expect(emptyReview.overallRating).toBe(0);
      expect(emptyReview.scoreText).toBe('Unrated');
      expect(emptyReview.categories.gore).toBe(0);
      expect(emptyReview.categories.creepy).toBe(0);
      expect(emptyReview.categories.suspense).toBe(0);
      expect(emptyReview.categories.jumpscares).toBe(0);
      expect(emptyReview.categories.psychological).toBe(0);
    });
  });

  describe('static userReview', () => {
    it('should create user review with provided categories and content', () => {
      const categories = new Categories(6, 7, 8, 5, 4);
      const userReview = Review.userReview(categories, 'My review content');

      expect(userReview.type).toBe(ReviewType.User);
      expect(userReview.content).toBe('My review content');
      expect(userReview.categories).toBe(categories);
      expect(userReview.overallRating).toBe(7);
      expect(userReview.scoreText).toBe('Ominous');
    });
  });
});