import { describe, it, expect } from 'vitest';
import { fearLevelText, calculateOverallRating, round } from '../scoreUtils';
import { Categories } from '../../models/Categories';

describe('scoreUtils', () => {
  describe('fearLevelText', () => {
    it('should return correct fear level for integer ratings', () => {
      expect(fearLevelText(0)).toBe('Unrated');
      expect(fearLevelText(5)).toBe('Creepy');
      expect(fearLevelText(10)).toBe('Petrifying');
    });

    it('should round and return correct fear level for decimal ratings', () => {
      expect(fearLevelText(5.4)).toBe('Creepy');
      expect(fearLevelText(5.6)).toBe('Sinister');
    });

    it('should return Unknown for out of range ratings', () => {
      expect(fearLevelText(-1)).toBe('Unknown');
      expect(fearLevelText(11)).toBe('Unknown');
    });
  });

  describe('round', () => {
    it('should round to one decimal place', () => {
      expect(round(5.123)).toBe(5.1);
      expect(round(5.678)).toBe(5.7);
      expect(round(5)).toBe(5);
    });
  });

  describe('calculateOverallRating', () => {
    it('should return 0 for null/undefined categories', () => {
      expect(calculateOverallRating(null as any)).toBe(0);
      expect(calculateOverallRating(undefined as any)).toBe(0);
    });

    it('should calculate rating from top three categories', () => {
      const categories = new Categories(8, 6, 4, 2, 1);
      expect(calculateOverallRating(categories)).toBe(6);
    });

    it('should penalize low scores (<=3)', () => {
      const categories = new Categories(8, 2, 1, 0, 0);
      expect(calculateOverallRating(categories)).toBe(1.7);
    });

    it('should handle all low scores', () => {
      const categories = new Categories(2, 1, 0, 0, 0);
      expect(calculateOverallRating(categories)).toBe(0);
    });

    it('should handle high scores with no penalty', () => {
      const categories = new Categories(10, 9, 8, 7, 6);
      expect(calculateOverallRating(categories)).toBe(9);
    });
  });
});