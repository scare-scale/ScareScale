import os
import csv
import frontmatter
from datetime import datetime

def parse_md_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        post = frontmatter.load(f)
    return post

# Include all movies
def should_include_movie(data):
    return True

def get_created_at(file_path):
    stat = os.stat(file_path)
    return datetime.fromtimestamp(stat.st_mtime).isoformat()

def main():
    movie_dir = '../src/content/movie'
    csv_file = 'movies.csv'

    with open(csv_file, 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['id', 'created_at', 'tmdbPosterId', 'releaseDate', 'tmdbBackdropId', 'synopsis', 'name']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()

        for filename in os.listdir(movie_dir):
            if filename.endswith('.md'):
                file_path = os.path.join(movie_dir, filename)
                data = parse_md_file(file_path)
                if should_include_movie(data):
                    row = {
                        'id': data.get('tmdbId', ''),
                        'created_at': get_created_at(file_path),
                        'tmdbPosterId': data.get('tmdbPosterId', ''),
                        'releaseDate': str(data.get('releaseDate', '')),
                        'tmdbBackdropId': data.get('tmdbBackdropId', ''),
                        'synopsis': data.get('synopsis', ''),
                        'name': data.get('name', '')
                    }
                    writer.writerow(row)

if __name__ == '__main__':
    main()