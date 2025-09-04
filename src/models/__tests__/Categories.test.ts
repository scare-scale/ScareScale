import { describe, it, expect } from 'vitest';
import { Categories } from '../Categories';

describe('Categories', () => {
  describe('constructor', () => {
    it('should initialize with default values', () => {
      const categories = new Categories();
      expect(categories.gore).toBe(0);
      expect(categories.creepy).toBe(0);
      expect(categories.suspense).toBe(0);
      expect(categories.jumpscares).toBe(0);
      expect(categories.psychological).toBe(0);
    });

    it('should initialize with provided values', () => {
      const categories = new Categories(5, 4, 3, 2, 1);
      expect(categories.gore).toBe(5);
      expect(categories.creepy).toBe(4);
      expect(categories.suspense).toBe(3);
      expect(categories.jumpscares).toBe(2);
      expect(categories.psychological).toBe(1);
    });
  });

  describe('getTopCategories', () => {
    it('should return top categories sorted by score', () => {
      const categories = new Categories(8, 6, 4, 2, 1);
      const topCategories = categories.getTopCategories();
      expect(topCategories).toEqual(['gore', 'creepy', 'suspense']);
    });

    it('should return only categories with score > 0', () => {
      const categories = new Categories(8, 0, 4, 0, 1);
      const topCategories = categories.getTopCategories();
      expect(topCategories).toEqual(['gore', 'suspense', 'psychological']);
    });

    it('should respect limit parameter', () => {
      const categories = new Categories(8, 6, 4, 2, 1);
      const topCategories = categories.getTopCategories(2);
      expect(topCategories).toEqual(['gore', 'creepy']);
    });

    it('should return all available categories if less than limit', () => {
      const categories = new Categories(8, 0, 0, 0, 0);
      const topCategories = categories.getTopCategories(3);
      expect(topCategories).toEqual(['gore']);
    });

    it('should return empty array if no categories have scores', () => {
      const categories = new Categories(0, 0, 0, 0, 0);
      const topCategories = categories.getTopCategories();
      expect(topCategories).toEqual([]);
    });
  });
});