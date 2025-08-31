import os
import csv
import frontmatter
import json

def parse_md_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        post = frontmatter.load(f)
    return post

def should_include_movie(data):
    ratings = data.get('categoryRatings', {})
    return any(rating > 0 for rating in ratings.values())

def reduce_ratings(ratings):
    return {k: max(v - 1, 0) for k, v in ratings.items()}

def main():
    movie_dir = '../src/content/movie'
    csv_file = 'reviews.csv'

    with open(csv_file, 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['type', 'categories', 'movie_id']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()

        for filename in os.listdir(movie_dir):
            if filename.endswith('.md'):
                print(filename)
                file_path = os.path.join(movie_dir, filename)
                data = parse_md_file(file_path)
                if should_include_movie(data):
                    movie_id = data.get('tmdbId', '')
                    ratings = data.get('categoryRatings', {})
                    reduced_ratings = reduce_ratings(ratings)
                    filtered_ratings = {k: v for k, v in reduced_ratings.items() if v > 0}
                    if filtered_ratings:
                        row = {
                            'type': 'ai',
                            'categories': json.dumps(filtered_ratings),
                            'movie_id': movie_id
                        }
                        writer.writerow(row)

if __name__ == '__main__':
    main()