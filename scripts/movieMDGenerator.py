from movieDBUtils import get_movie_details, save_as_md

# Prompting the user for input
movie_id = input("Enter the TMDB movie ID: ")
if movie_id.isdigit():
    movie_data = get_movie_details(int(movie_id))
    save_as_md(movie_data)
else:
    print("Invalid input. Please enter a numeric movie ID.")