export class Categories {
  constructor(
    public gore: number,
    public creepy: number,
    public suspense: number,
    public jumpscares: number,
    public psychological: number
  ) {}

  getTop3Categories(): string[] {
    const categories = [
      { name: 'gore', score: this.gore },
      { name: 'creepy', score: this.creepy },
      { name: 'suspense', score: this.suspense },
      { name: 'jumpscares', score: this.jumpscares },
      { name: 'psychological', score: this.psychological },
    ];    

    categories.sort((a, b) => b.score - a.score);
    return categories.slice(0, 3).map(cat => cat.name);
  }
}