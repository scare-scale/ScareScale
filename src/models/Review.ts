import { calculateOverallRating, fearLevelText } from "../utils/scoreUtils";
import { Categories } from "./Categories";

export enum ReviewType {
  Official = 'official',
  User = 'user',
  AI = 'ai',
  Summary = 'summary'
}

export class Review {
  overallRating: number = 0;
  scoreText: string = "Unrated";

  constructor(
    public type: ReviewType,
    public content: string,
    public categories: Categories,
    public displayName: string | null
  ) {
    if (!displayName) {
      if (type === ReviewType.User) {
        this.displayName = "Anonymous";
      } else {
        this.displayName = type.charAt(0).toUpperCase() + type.slice(1);
      }
    }
    this.overallRating = calculateOverallRating(categories);
    this.scoreText = fearLevelText(this.overallRating);
  }

  static empty(): Review {
    const categories = new Categories(0, 0, 0, 0, 0);
    return new Review(ReviewType.Official, '', categories, null);
  }

  static userReview(categories: Categories, content: string): Review {
    return new Review(ReviewType.User, content, categories, null);
  }

  isApproved(): boolean {  
    return this.type === ReviewType.Official && this.overallRating >= 6
  }

  isAi(): boolean {  
    return this.type === ReviewType.AI
  }
}