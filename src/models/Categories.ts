export class Categories {
  constructor(
    public gore: number,
    public creepy: number,
    public suspense: number,
    public jumpscares: number,
    public psychological: number
  ) {
  }

  getTopCategories(limit = 3): string[] {
    return Object.entries(this)
      .filter(([_, score]) => score > 0)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([name]) => name);
  }
}