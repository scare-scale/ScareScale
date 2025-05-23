import argparse
from datetime import datetime, timedelta
from movieDBUtils import fetch_horror_movies, save_as_md

def bulk_generate_md(start_date, end_date, min_popularity=50):
    horror_movies = fetch_horror_movies(start_date, end_date, min_popularity, max_results=1000)
    print(f"Found {len(horror_movies)} horror movies between {start_date} and {end_date} with minimum popularity of {min_popularity}.")
    
    for movie in horror_movies:
        movie_name = movie.get("title")
        movie_data = {
            "name": movie.get("title"),
            "tmdbId": movie.get("id"),
            "tmdbPosterId": movie.get("poster_path"),
            "tmdbBackdropId": movie.get("backdrop_path"),
            "description": movie.get("overview"),
            "releaseDate": datetime.strptime(movie.get("release_date"), "%Y-%m-%d").date()  # Ensure date object
        }
        print(f"Generating markdown for movie: {movie_name}")
        save_as_md(movie_data)

def get_user_input(prompt, default_value):
    user_input = input(f"{prompt} [default: {default_value}]: ") or default_value
    return user_input

today = datetime.today()
default_start_date = (today - timedelta(days=6 * 30)).date()  # Use date object
default_end_date = (today + timedelta(days=12 * 30)).date()  # Use date object

parser = argparse.ArgumentParser(description="Generate markdown files for horror movies.")
parser.add_argument("--start-date", type=str, help="Start date (YYYY-MM-DD)")
parser.add_argument("--end-date", type=str, help="End date (YYYY-MM-DD)")
parser.add_argument("--min-popularity", type=int, help="Minimum popularity threshold")

args = parser.parse_args()

start_date = datetime.strptime(args.start_date, "%Y-%m-%d").date() if args.start_date else default_start_date
end_date = datetime.strptime(args.end_date, "%Y-%m-%d").date() if args.end_date else default_end_date
min_popularity = args.min_popularity if args.min_popularity else int(get_user_input("Enter the minimum popularity", "5"))

bulk_generate_md(start_date, end_date, min_popularity)