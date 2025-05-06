import argparse
import os
from datetime import datetime, timedelta
from movieDBUtils import get_movie_details, fetch_horror_movies, save_as_md, generate_filename

def bulk_generate_md(start_date, end_date, min_popularity=50):
    horror_movies = fetch_horror_movies(start_date, end_date, min_popularity)
    print(f"Found {len(horror_movies)} horror movies between {start_date} and {end_date} with minimum popularity of {min_popularity}.")
    
    for movie in horror_movies:
        movie_name = movie.get("title")

        movie_data =  { 
            "name": movie.get("title"),
            "tmdbId": movie.get("id"),
            "tmdbPosterId": movie.get("poster_path"),
            "description": movie.get("overview"),
            "releaseDate": movie.get("release_date")
        }
        
        print(f"Generating markdown for movie: {movie_name}")
        save_as_md(movie_data)


def get_user_input(prompt, default_value):
    user_input = input(f"{prompt} [default: {default_value}]: ") or default_value
    return user_input

today = datetime.today()
default_start_date = (today - timedelta(days=6 * 30)).strftime("%Y-%m-%d")
default_end_date = (today + timedelta(days=12 * 30)).strftime("%Y-%m-%d")

parser = argparse.ArgumentParser(description="Generate markdown files for horror movies.")
parser.add_argument("--start-date", type=str, help="Start date (YYYY-MM-DD)")
parser.add_argument("--end-date", type=str, help="End date (YYYY-MM-DD)")
parser.add_argument("--min-popularity", type=int, help="Minimum popularity threshold")

args = parser.parse_args()

start_date = args.start_date or get_user_input("Enter the start date (YYYY-MM-DD)", default_start_date)
end_date = args.end_date or get_user_input("Enter the end date (YYYY-MM-DD)", default_end_date)
min_popularity = args.min_popularity if args.min_popularity else int(get_user_input("Enter the minimum popularity", "5"))

bulk_generate_md(start_date, end_date, min_popularity)