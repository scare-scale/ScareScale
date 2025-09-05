import moment from "moment";
import { calculateOverallRating, fearLevelText } from "../utils/scoreUtils";
import { Review, ReviewType } from "./Review";
import { Categories } from "./Categories";

const TMDB_POSTER_BASE_URL = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2";
const TMDB_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";
const TMDB_MOVIE_BASE_URL = "https://www.themoviedb.org/movie";
const TMDB_TRAILERS_ENDPOINT = "videos?active_nav_item=Trailers";
const TMDB_REVIEWS_ENDPOINT = "reviews";
const JUSTWATCH_SEARCH_ENDPOINT = "https://www.justwatch.com/uk/search?q=";

export class Movie {
  tmdbUrl: string;
  trailersUrl: string;
  reviewsUrl: string;
  posterUrl: string;
  backdropUrl?: string;
  whereToWatchUrl?: string;
  slug: string;
  releaseYear: number;
  releaseDateText: string;
  isReleased: boolean = true;
  releaseDateParsed: Date;
  
  constructor(
    public id: number,
    public name: string,
    public tmdbPosterId: string,
    public tmdbBackdropId: string,
    public synopsis: string,
    public createdAt: Date,
    public releaseDate: String,
    public reviews: Review[]
  ) {
    // TMDB external URLs
    this.tmdbUrl = `${TMDB_MOVIE_BASE_URL}/${id}`
    this.trailersUrl = `${this.tmdbUrl}/${TMDB_TRAILERS_ENDPOINT}`
    this.reviewsUrl = `${this.tmdbUrl}/${TMDB_REVIEWS_ENDPOINT}`
    this.posterUrl = `${TMDB_POSTER_BASE_URL}${tmdbPosterId}`;
    this.backdropUrl = tmdbBackdropId && `${TMDB_BACKDROP_BASE_URL}${tmdbBackdropId}`;

    // Handle dates
    const dateMomentObject = moment(String(releaseDate.trim()), "DD/MM/YYYY");
    this.releaseDateParsed = dateMomentObject.toDate();
    if (isNaN(this.releaseDateParsed.getTime())) {
      throw `Invalid release date for movie "${name}": ${releaseDate}`;
    }
    this.releaseYear = this.releaseDateParsed.getFullYear();
    this.releaseDateText = this.releaseDateParsed.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    this.isReleased = this.releaseDateParsed <= new Date();

    // Hide reviews for unreleased movies
    if (!this.isReleased) {
      this.reviews = []
    }

    // Just Watch external URLs
    const movieSearchQuery = encodeURIComponent(`${name} ${this.releaseYear}`);
    this.whereToWatchUrl = `${JUSTWATCH_SEARCH_ENDPOINT}${movieSearchQuery}`;

    this.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + `-${this.releaseYear}`;
  }

  getTopCategories(): string[] {
    return this.getSummaryReview().categories.getTopCategories();
  }

  isApproved(): boolean {
    if (!Array.isArray(this.reviews)) return false;
  
    return this.reviews.some(
      review => review.type === ReviewType.Official && review.overallRating >= 6
    );
  }

  hasHumanReviews(): boolean {
    if (!Array.isArray(this.reviews)) return false;
  
    return this.reviews.some(
      review => review.type != ReviewType.AI
    );
  }

  hasReviews(): boolean {
    return this.reviews.length > 0;
  }

  getSummaryReview(): Review {
    const nonAIReviews = this.reviews.filter(r => r.type !== ReviewType.AI);

    if (nonAIReviews.length === 0) {
      return this.reviews.find(r => r.type === ReviewType.AI) ?? Review.empty();
    }
  
    const total = nonAIReviews.reduce(
      (acc, review) => {
        acc.gore += review.categories.gore;
        acc.creepy += review.categories.creepy;
        acc.suspense += review.categories.suspense;
        acc.jumpscares += review.categories.jumpscares;
        acc.psychological += review.categories.psychological;
        return acc;
      },
      { gore: 0, creepy: 0, suspense: 0, jumpscares: 0, psychological: 0 }
    );
  
    const count = nonAIReviews.length;
    const averagedCategories = new Categories(
      total.gore / count,
      total.creepy / count,
      total.suspense / count,
      total.jumpscares / count,
      total.psychological / count
    );
  
    return new Review(ReviewType.Summary, "Summary", averagedCategories)
  }
}
