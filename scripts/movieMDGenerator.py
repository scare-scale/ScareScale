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