import moment from "moment";
import { calculateOverallRating, fearLevelText } from "../utils/scoreUtils";
import { Review, ReviewType } from "./Review";

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

    // Just Watch external URLs
    const movieSearchQuery = encodeURIComponent(`${name} ${this.releaseYear}`);
    this.whereToWatchUrl = `${JUSTWATCH_SEARCH_ENDPOINT}${movieSearchQuery}`;

    this.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + `-${this.releaseYear}`;
  }

  getTopCategories(): string[] {
    return this.getPriorityReview().categories.getTopCategories();
  }

  isApproved(): boolean {  
    const approvedReview = this.reviews.filter(review => review.type === ReviewType.Official).filter(review => review.overallRating > 6);

    if (approvedReview.length > 0) return true;

    return false;
  }

  getPriorityReview(): Review {
    if (!this.reviews || this.reviews.length === 0) return Review.empty();
  
    const priorityOrder: ReviewType[] = [
      ReviewType.Official,
      ReviewType.User,
      ReviewType.AI
    ];
  
    return (
      priorityOrder
        .map(type => this.reviews.find(review => review.type === type))
        .find(review => review !== undefined) ?? this.reviews[0]
    );
  }
  
}
