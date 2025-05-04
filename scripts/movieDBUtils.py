import os
import requests

def get_tmdb_headers():
    """Retrieve TMDB API headers."""
    bearer_token = os.getenv("TMDB_BEARER_TOKEN")  # Read Bearer token from environment variable
    if not bearer_token:
        raise ValueError("Bearer token is missing. Set the TMDB_BEARER_TOKEN environment variable.")
    return {
        "accept": "application/json",
        "Authorization": f"Bearer {bearer_token}"
    }

BASE_URL = "https://api.themoviedb.org/3"

def get_movie_details(movie_id):
    headers = get_tmdb_headers()
    url = f"{BASE_URL}/movie/{movie_id}"
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        return {
            "name": data.get("title"),
            "tmdbId": data.get("id"),
            "tmdbPosterId": data.get("poster_path"),
            "description": data.get("overview"),
            "releaseDate": data.get("release_date")
        }
    else:
        print(f"Error: Unable to fetch data. Status code {response.status_code}")
        return None

def fetch_horror_movies(start_date, end_date, min_popularity=50):
    headers = get_tmdb_headers()
    url = f"{BASE_URL}/discover/movie"
    params = {
        "with_genres": "27",  # Genre ID for Horror
        "primary_release_date.gte": start_date,
        "primary_release_date.lte": end_date,
        "sort_by": "popularity.desc",
        "page": 1
    }

    all_movies = []
    while True:
        response = requests.get(url, headers=headers, params=params)
        if response.status_code == 200:
            data = response.json()
            filtered_movies = [movie for movie in data.get("results", []) if movie.get("popularity", 0) >= min_popularity]
            all_movies.extend(filtered_movies)
            if data.get("page") >= data.get("total_pages"):
                break
            params["page"] += 1
        else:
            print(f"Error: Unable to fetch movies. Status code {response.status_code}")
            break

    return all_movies

def generate_filename(movie_name):
    """Generate a markdown filename based on the movie name."""
    parsed_name = str(movie_name).lower().replace(" ", "-").replace(":", "").replace("'", "").replace('"', "")
    return f"../src/content/movie/{parsed_name}.md"

def save_as_md(movie_data):
    if movie_data:
        filename = generate_filename(movie_data['name'])

        existing_content = {}
        if os.path.exists(filename):
            with open(filename, "r", encoding="utf-8") as md_file:
                lines = md_file.readlines()
                for line in lines:
                    if ":" in line:
                        key, value = line.split(":", 1)
                        existing_content[key.strip()] = value.strip()

        # Update existing values or add new ones
        updated_content = {
            "name": f"\"{movie_data['name']}\"",  # Use double quotes for the outer string
            "tmdbId": f"\"{movie_data['tmdbId']}\"",
            "tmdbPosterId": f"\"{movie_data['tmdbPosterId']}\"",
            "releaseDate": f"\"{movie_data['releaseDate']}\"",
            "categoryRatings": {
                "gore": existing_content.get("gore", "0"),
                "creepy": existing_content.get("creepy", "0"),
                "jumpscares": existing_content.get("jumpscares", "0"),
                "suspense": existing_content.get("suspense", "0"),
                "psychological": existing_content.get("psychological", "0"),
            }
        }

        with open(filename, "w", encoding="utf-8") as md_file:
            md_file.write("---\n")
            for key, value in updated_content.items():
                if isinstance(value, dict):  # Handling nested categoryRatings
                    md_file.write(f"{key}:\n")
                    for sub_key, sub_value in value.items():
                        md_file.write(f"    {sub_key}: {sub_value}\n")
                else:
                    md_file.write(f"{key}: {value}\n")
            md_file.write("---\n")
            md_file.write(f"{movie_data['description']}\n")

        print(f"Markdown file '{filename}' updated successfully!")
