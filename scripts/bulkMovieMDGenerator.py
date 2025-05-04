from movieDBUtils import get_movie_details, fetch_horror_movies, save_as_md, generate_filename
import os
from datetime import datetime, timedelta

def bulk_generate_md(start_date, end_date, min_popularity=50):
    horror_movies = fetch_horror_movies(start_date, end_date, min_popularity)
    print(f"Found {len(horror_movies)} horror movies between {start_date} and {end_date} with minimum popularity of {min_popularity}.")
    for movie in horror_movies:
        movie_id = movie.get("id")
        movie_name = movie.get("title")
        filename = generate_filename(movie_name)

        if not os.path.exists(filename):
            print(f"Generating markdown for movie: {movie_name} (ID: {movie_id})")
            movie_data = get_movie_details(movie_id)
            save_as_md(movie_data)
        else:
            print(f"Markdown file already exists for movie: {movie_name} (ID: {movie_id})")

# Prompting the user for input
today = datetime.today()
default_start_date = (today - timedelta(days=6 * 30)).strftime("%Y-%m-%d")
default_end_date = (today + timedelta(days=12 * 30)).strftime("%Y-%m-%d")

start_date = input(f"Enter the start date (YYYY-MM-DD) [default: {default_start_date}]: ") or default_start_date
end_date = input(f"Enter the end date (YYYY-MM-DD) [default: {default_end_date}]: ") or default_end_date
min_popularity = input("Enter the minimum popularity (default is 50): ")

if start_date and end_date:
    min_popularity = int(min_popularity) if min_popularity.isdigit() else 50
    bulk_generate_md(start_date, end_date, min_popularity)
else:
    print("Invalid input. Please enter valid start and end dates.")
