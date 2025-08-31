import { Categories } from "./Categories";
import { Movie } from "./Movie";
import { Review } from "./Review";

export class Movies {
    private movies: Movie[];
  
    constructor(movies: Movie[] = []) {
      this.movies = movies;
    }
  
    static empty(): Movies {
        return new Movies();
    }

    static fromSupabaseResponse(data: any[]): Movies {
      const movies: Movie[] = [];

      for (const row of data) {
        const movieId = row.id;
    
        const reviews = [];

        if (row.reviews && Array.isArray(row.reviews)) {
            for (const r of row.reviews) {
              const categories = new Categories(
                r.categories.gore,
                r.categories.creepy,
                r.categories.suspense,
                r.categories.jumpscares,
                r.categories.psychological
              );
              reviews.push(
                new Review(r.type, r.review, categories)
              );
            }
          }
          
        const movie = new Movie(
            movieId,
            row.name,
            row.tmdbPosterId,
            row.tmdbBackdropId,
            row.synopsis,
            row.createdAt,
            row.releaseDate,
            reviews
        );

        movies.push(movie);
      }
  
      return new Movies(movies);
    }
  
    getAll(): Movie[] {
      return this.movies;
    }
  
    getById(id: number): Movie | undefined {
      return this.movies.find((movie) => movie.id === id);
    }
  
    getApproved(): Movie[] {
      return this.movies.filter((movie) => movie.getOfficialScore() > 6);
    }

    getWithReviews(): Movie[] {
      return this.movies.filter((movie) => movie.reviews.length > 0);
    }

    getUpcoming(): Movie[] {
        return this.movies.filter((movie) => !movie.isReleased);
    }
  }