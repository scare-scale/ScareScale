export class Categories {
  constructor(
    public gore: number = 0,
    public creepy: number = 0,
    public suspense: number = 0,
    public jumpscares: number = 0,
    public psychological: number = 0
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