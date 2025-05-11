import os
from movieDBUtils import get_movie_details, save_as_md

md_dir = "../src/content/movie"
for md_file in os.listdir(md_dir):
    if md_file.endswith(".md"):
        file_path = os.path.join(md_dir, md_file)
        with open(file_path, "r", encoding="utf-8") as f:
            lines = f.readlines()
            tmdb_id = None
            for line in lines:
                if line.startswith("tmdbId:"):
                    tmdb_id = line.split(":", 1)[1].strip().strip("\"")  # Extract and clean tmdbId
                    break
        if tmdb_id and tmdb_id.isdigit():
            movie_data = get_movie_details(int(tmdb_id))
            save_as_md(movie_data)
