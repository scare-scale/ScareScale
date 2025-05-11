import argparse
from datetime import datetime, timedelta
from movieDBUtils import fetch_horror_movies, save_as_md

def add_popular_movies(start_date, end_date, top_x, min_popularity=50):
    """Fetch and save the top x popular horror movies within the specified date range."""
    horror_movies = fetch_horror_movies(start_date, end_date, min_popularity)
    sorted_movies = sorted(horror_movies, key=lambda m: m.get("popularity", 0), reverse=True)[:top_x]
    
    print(f"Adding the top {top_x} popular horror movies between {start_date} and {end_date}.")
    for movie in sorted_movies:
        movie_data = {
            "name": movie.get("title"),
            "tmdbId": movie.get("id"),
            "tmdbPosterId": movie.get("poster_path"),
            "tmdbBackdropId": movie.get("backdrop_path"),
            "description": movie.get("overview"),
            "releaseDate": datetime.strptime(movie.get("release_date"), "%Y-%m-%d").date()  # Ensure date object
        }
        print(f"Saving movie: {movie_data['name']}")
        save_as_md(movie_data)

def get_user_input(prompt, default_value):
    """Prompt the user for input with a default value."""
    user_input = input(f"{prompt} [default: {default_value}]: ") or default_value
    return user_input

# Default date range
today = datetime.today()
default_start_date = (today - timedelta(days=6 * 30)).date()  # Use date object
default_end_date = (today + timedelta(days=12 * 30)).date()  # Use date object

parser = argparse.ArgumentParser(description="Add top popular horror movies as markdown files.")
parser.add_argument("--start-date", type=str, help="Start date (YYYY-MM-DD)")
parser.add_argument("--end-date", type=str, help="End date (YYYY-MM-DD)")
parser.add_argument("--top-x", type=int, help="Number of top popular movies to add")
parser.add_argument("--min-popularity", type=int, help="Minimum popularity threshold")

args = parser.parse_args()

start_date = datetime.strptime(args.start_date, "%Y-%m-%d").date() if args.start_date else default_start_date
end_date = datetime.strptime(args.end_date, "%Y-%m-%d").date() if args.end_date else default_end_date
top_x = args.top_x if args.top_x else int(get_user_input("Enter the number of top popular movies to add", "10"))
min_popularity = args.min_popularity if args.min_popularity else int(get_user_input("Enter the minimum popularity", "50"))

add_popular_movies(start_date, end_date, top_x, min_popularity)
