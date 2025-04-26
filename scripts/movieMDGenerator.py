import requests
import re
import os

API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZWZiZWVkZWVkM2M3MzAyYTk1ZGM1NDA1NTIwMDNlYiIsIm5iZiI6MTczOTIwNjgxNS41MzYsInN1YiI6IjY3YWEzMDlmZDE2ZGM3Njc3MzM5ZTkyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.avnlX7_8bo-Ium38ycsa9C79YmLkLynHFkV2C82YRl4"
BASE_URL = "https://api.themoviedb.org/3"

headers = {
    "accept": "application/json",
    "Authorization": API_KEY
}

def get_movie_details(movie_id):
    url = f"{BASE_URL}/movie/{movie_id}"
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        movie_info = {
            "name": data.get("title"),
            "tmdbId": data.get("id"),
            "tmdbPosterId": data.get("poster_path"),
            "description": data.get("overview"),
            "releaseDate": data.get("release_date")  # New field added
        }
        return movie_info
    else:
        print(f"Error: Unable to fetch data. Status code {response.status_code}")
        return None

def save_as_md(movie_data):
    if movie_data:
        parsedName = str(re.sub(r'[^a-zA-Z0-9 ]', '', movie_data['name'])).lower().replace(" ", "-")
        filename = f"../src/content/movie/{parsedName}.md"

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
            "name": f"'{movie_data['name']}'",
            "tmdbId": f"'{movie_data['tmdbId']}'",
            "tmdbPosterId": f"'{movie_data['tmdbPosterId']}'",
            "releaseDate": f"'{movie_data['releaseDate']}'",  # New field added
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

# Prompting the user for input
movie_id = input("Enter the TMDB movie ID: ")
if movie_id.isdigit():
    movie_data = get_movie_details(int(movie_id))
    save_as_md(movie_data)
else:
    print("Invalid input. Please enter a numeric movie ID.")