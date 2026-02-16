import { Categories } from "./Categories";
import { Movie } from "./Movie";
import { Review, ReviewType } from "./Review";

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
              let displayName;
              if (r.profiles != null) {
                if (r.profiles.display_name != null) {
                  displayName = r.profiles.display_name;
                }
              }
              const categories = new Categories(
                r.categories.gore,
                r.categories.creepy,
                r.categories.suspense,
                r.categories.jumpscares,
                r.categories.psychological
              );
              reviews.push(
                new Review(r.type, r.content, categories, displayName)
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
  
    getBySlug(slug: string): Movie | undefined {
      return this.movies.find((movie) => movie.slug === slug);
    }
  
    getApproved(): Movie[] {
      return this.movies.filter((movie) => movie.isApproved());
    }

    getWithAiReviews(): Movie[] {
      return this.movies.filter((movie) => movie.hasAiReviews());
    }

    getWithHumanReviews(): Movie[] {
      return this.movies.filter((movie) => movie.hasHumanReviews());
    }
    
    getWithReviews(): Movie[] {
      return this.movies.filter((movie) => movie.hasReviews());
    }

    getNewest(): Movie[] {
      return this.movies
        .filter((movie) => movie.isReleased)
        .sort((a, b) => b.releaseDateParsed.getTime() - a.releaseDateParsed.getTime())
        .slice(0, 50);    
    }    

    getUpcoming(): Movie[] {
        return this.movies.filter((movie) => !movie.isReleased);
    }
  }