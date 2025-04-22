***REMOVED***

API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZWZiZWVkZWVkM2M3MzAyYTk1ZGM1NDA1NTIwMDNlYiIsIm5iZiI6MTczOTIwNjgxNS41MzYsInN1YiI6IjY3YWEzMDlmZDE2ZGM3Njc3MzM5ZTkyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.avnlX7_8bo-Ium38ycsa9C79YmLkLynHFkV2C82YRl4"
***REMOVED***
GENRE_ID_HORROR = 27  # TMDB genre ID for horror

***REMOVED***
    "accept": "applicatheadersion/json",
    "Authorization": API_KEY
***REMOVED***

***REMOVED***
    url = f"{BASE_URL***REMOVED***/movie/{movie_id***REMOVED***"

***REMOVED***
    
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
            "description": data.get("overview")
        ***REMOVED***
***REMOVED***
***REMOVED***
        print(f"Error: Unable to fetch data. Status code {response.status_code***REMOVED***")
***REMOVED***

***REMOVED***
***REMOVED***
        parsedName = str(movie_data['name']).lower().replace(" ", "-")
        filename = f"../src/content/movie/{parsedName***REMOVED***.md"
***REMOVED***
***REMOVED***
            md_file.write(f"name: '{movie_data['name']***REMOVED***'\n")
            md_file.write(f"tmdbId: '{movie_data['tmdbId']***REMOVED***'\n")
            md_file.write(f"tmdbPosterId: '{movie_data['tmdbPosterId']***REMOVED***'\n")
***REMOVED***
            md_file.write(f"{movie_data['description']***REMOVED***\n")
        print(f"Markdown file '{filename***REMOVED***' created successfully!")

# Prompting the user for input
movie_id = input("Enter the TMDB movie ID: ")
if movie_id.isdigit():  # Ensuring the input is a valid number
    movie_data = get_movie_details(int(movie_id))
    save_as_md(movie_data)
else:
    print("Invalid input. Please enter a numeric movie ID.")
