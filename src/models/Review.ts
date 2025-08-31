import { Categories } from "./Categories";

export class Review {
  constructor(
    public type: string,
    public review: string,
    public categories: Categories
  ) {}

  static empty(): Review {
    const categories = new Categories(0, 0, 0, 0, 0);
    return new Review('official', '', categories);
  }
}