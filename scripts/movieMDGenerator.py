***REMOVED***
***REMOVED***
***REMOVED***

API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZWZiZWVkZWVkM2M3MzAyYTk1ZGM1NDA1NTIwMDNlYiIsIm5iZiI6MTczOTIwNjgxNS41MzYsInN1YiI6IjY3YWEzMDlmZDE2ZGM3Njc3MzM5ZTkyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.avnlX7_8bo-Ium38ycsa9C79YmLkLynHFkV2C82YRl4"
***REMOVED***

***REMOVED***
***REMOVED***
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
***REMOVED***
***REMOVED***
        ***REMOVED***
***REMOVED***
***REMOVED***
        print(f"Error: Unable to fetch data. Status code {response.status_code***REMOVED***")
***REMOVED***

***REMOVED***
***REMOVED***
***REMOVED***
        filename = f"../src/content/movie/{parsedName***REMOVED***.md"

        existing_content = {***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED***
***REMOVED***
            "name": f"'{movie_data['name']***REMOVED***'",
            "tmdbId": f"'{movie_data['tmdbId']***REMOVED***'",
            "tmdbPosterId": f"'{movie_data['tmdbPosterId']***REMOVED***'",
            "releaseDate": f"'{movie_data['releaseDate']***REMOVED***'",  # New field added
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
            ***REMOVED***
        ***REMOVED***

***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
                    md_file.write(f"{key***REMOVED***:\n")
***REMOVED***
                        md_file.write(f"    {sub_key***REMOVED***: {sub_value***REMOVED***\n")
            ***REMOVED***
                    md_file.write(f"{key***REMOVED***: {value***REMOVED***\n")
***REMOVED***
            md_file.write(f"{movie_data['description']***REMOVED***\n")

        print(f"Markdown file '{filename***REMOVED***' updated successfully!")

# Prompting the user for input
movie_id = input("Enter the TMDB movie ID: ")
if movie_id.isdigit():
    movie_data = get_movie_details(int(movie_id))
    save_as_md(movie_data)
else:
    print("Invalid input. Please enter a numeric movie ID.")