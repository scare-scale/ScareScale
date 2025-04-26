import requests
import re

API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZWZiZWVkZWVkM2M3MzAyYTk1ZGM1NDA1NTIwMDNlYiIsIm5iZiI6MTczOTIwNjgxNS41MzYsInN1YiI6IjY3YWEzMDlmZDE2ZGM3Njc3MzM5ZTkyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.avnlX7_8bo-Ium38ycsa9C79YmLkLynHFkV2C82YRl4"
BASE_URL = "https://api.themoviedb.org/3"
GENRE_ID_HORROR = 27  # TMDB genre ID for horror

headers = {
    "accept": "applicatheadersion/json",
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
            "description": data.get("overview")
        }
        return movie_info
    else:
        print(f"Error: Unable to fetch data. Status code {response.status_code}")
        return None

def save_as_md(movie_data):
    if movie_data:
         
        parsedName = str(re.sub(r'[^a-zA-Z0-9 ]', '', movie_data['name'])).lower().replace(" ", "-")
        filename = f"../src/content/movie/{parsedName}.md"
        with open(filename, "w", encoding="utf-8") as md_file:
            md_file.write("---\n")
            md_file.write(f"name: '{movie_data['name']}'\n")
            md_file.write(f"tmdbId: '{movie_data['tmdbId']}'\n")
            md_file.write(f"tmdbPosterId: '{movie_data['tmdbPosterId']}'\n")
            md_file.write(f"categoryRatings:\n")
            md_file.write(f"    gore: 0\n")
            md_file.write(f"    creepy: 0\n")
            md_file.write(f"    jumpscares: 0\n")
            md_file.write(f"    suspense: 0\n")
            md_file.write(f"    psychological: 0\n")
            md_file.write("---\n")
            md_file.write(f"{movie_data['description']}\n")
 
        print(f"Markdown file '{filename}' created successfully!")

# Prompting the user for input
movie_id = input("Enter the TMDB movie ID: ")
if movie_id.isdigit():  # Ensuring the input is a valid number
    movie_data = get_movie_details(int(movie_id))
    save_as_md(movie_data)
else:
    print("Invalid input. Please enter a numeric movie ID.")
