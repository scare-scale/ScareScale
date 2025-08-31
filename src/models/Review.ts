import { calculateOverallRating } from "../utils/scoreUtils";
import { Categories } from "./Categories";

export class Review {
  overallRating: number = 0;

  constructor(
    public type: string,
    public review: string,
    public categories: Categories
  ) {
    this.overallRating = calculateOverallRating(categories);
  }

  static empty(): Review {
    const categories = new Categories(0, 0, 0, 0, 0);
    return new Review('official', '', categories);
  }
}