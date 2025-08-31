import { calculateOverallRating, fearLevelText } from "../utils/scoreUtils";
import { Review } from "./Review";

const TMDB_POSTER_BASE_URL = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2";
const TMDB_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";
const TMDB_MOVIE_BASE_URL = "https://www.themoviedb.org/movie";
const TMDB_TRAILERS_ENDPOINT = "videos?active_nav_item=Trailers";
const TMDB_REVIEWS_ENDPOINT = "reviews";
const JUSTWATCH_SEARCH_ENDPOINT = "https://www.justwatch.com/uk/search?q=";

export class Movie {
  officialScore: number = 0;
  officialReview: Review;
  scoretext: string = "Unrated";
  tmdbUrl: string;
  trailersUrl: string;
  reviewsUrl: string;
  posterUrl: string;
  backdropUrl?: string;
  whereToWatchUrl?: string;
  slug: string;
  releaseYear: number;
  releaseDateText: string;
  isReleased: boolean;
  
//   formattedReleaseDate: string;

  constructor(
    public id: number,
    public name: string,
    public tmdbPosterId: string,
    public tmdbBackdropId: string,
    public synopsis: string,
    public createdAt: Date,
    public releaseDate: Date,
    public reviews: Review[]
  ) {
    this.officialReview = this.reviews.find(review => review.type === 'official') || Review.empty();
    this.officialScore = calculateOverallRating(this.officialReview.categories);
    this.scoretext = fearLevelText(this.officialScore);

    // TMDB external URLs
    this.tmdbUrl = `${TMDB_MOVIE_BASE_URL}/${id}`
    this.trailersUrl = `${this.tmdbUrl}/${TMDB_TRAILERS_ENDPOINT}`
    this.reviewsUrl = `${this.tmdbUrl}/${TMDB_REVIEWS_ENDPOINT}`
    this.posterUrl = `${TMDB_POSTER_BASE_URL}${tmdbPosterId}`;
    this.backdropUrl = tmdbBackdropId && `${TMDB_BACKDROP_BASE_URL}${tmdbBackdropId}`;

    // Handle dates
    this.releaseDate = new Date(String(this.releaseDate));
    this.releaseYear = this.releaseDate.getFullYear();
    this.releaseDateText = this.releaseDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    this.isReleased = this.releaseDate <= new Date();

    // Just Watch external URLs
    const movieSearchQuery = encodeURIComponent(`${name} ${this.releaseYear}`);
    this.whereToWatchUrl = `${JUSTWATCH_SEARCH_ENDPOINT}${movieSearchQuery}`;

    this.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + `-${this.releaseYear}`;

    // this.formattedReleaseDate = releaseDate.toLocaleDateString("en-GB", {
    //   day: "numeric",
    //   month: "long",
    //   year: "numeric",
    // });
  }

  getOfficialScore(): number {
    return this.officialScore;
  }

  getTopCategories(): string[] {
    return this.officialReview.categories.getTop3Categories();
  }

  getSlug(): string {
    return this.slug;
  }
}
