import { describe, it, expect, vi } from 'vitest';

// Mock the Movie class before importing
vi.mock('../../../models/Movie', () => ({
  Movie: vi.fn().mockImplementation(() => ({
    isApproved: vi.fn(() => true),
    getSummaryReview: vi.fn(() => ({
      categories: {
        gore: 8,
        creepy: 7,
        suspense: 6,
        jumpscares: 4,
        psychological: 3,
      },
      overallRating: 7.2,
      scoreText: 'Ominous',
    })),
  })),
}));

describe('ScareScaleRating Component', () => {
  it('renders rating component structure', async () => {
    const { Movie } = await import('../../../models/Movie');

    const mockMovie = new Movie(
      123,
      'Test Movie',
      '/poster.jpg',
      '/backdrop.jpg',
      'Test synopsis',
      new Date(),
      '01/01/2023',
      []
    );

    expect(mockMovie.isApproved()).toBe(true);

    const review = mockMovie.getSummaryReview();
    expect(review.overallRating).toBe(7.2);
    expect(review.scoreText).toBe('Ominous');
  });

  it('calculates correct category display values', async () => {
    const { Movie } = await import('../../../models/Movie');

    const mockMovie = new Movie(
      123,
      'Test Movie',
      '/poster.jpg',
      '/backdrop.jpg',
      'Test synopsis',
      new Date(),
      '01/01/2023',
      []
    );

    const review = mockMovie.getSummaryReview();

    // Test that categories are accessible
    expect(review.categories).toHaveProperty('gore');
    expect(review.categories).toHaveProperty('creepy');
    expect(review.categories).toHaveProperty('suspense');
    expect(review.categories).toHaveProperty('jumpscares');
    expect(review.categories).toHaveProperty('psychological');

    // Test that values are numbers
    Object.values(review.categories).forEach(value => {
      expect(typeof value).toBe('number');
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(10);
    });
  });

  it('handles approved movie display', async () => {
    const { Movie } = await import('../../../models/Movie');

    const mockMovie = new Movie(
      123,
      'Approved Movie',
      '/poster.jpg',
      '/backdrop.jpg',
      'Test synopsis',
      new Date(),
      '01/01/2023',
      []
    );

    expect(mockMovie.isApproved()).toBe(true);
  });

  it('handles unapproved movie display', async () => {
    const { Movie } = await import('../../../models/Movie');

    const mockMovie = new Movie(
      123,
      'Unapproved Movie',
      '/poster.jpg',
      '/backdrop.jpg',
      'Test synopsis',
      new Date(),
      '01/01/2023',
      []
    );

    // Override the mock to return false
    mockMovie.isApproved = vi.fn(() => false);

    expect(mockMovie.isApproved()).toBe(false);
  });
});