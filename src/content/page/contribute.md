![Scare Scale Logo](/logo/logo_wide_background.png)
# Contribution Guide

Welcome to **Scare Scale**, a project built with Astro JS to categorize and rate horror movies based on their elements. If you'd like to add a new movie entry, follow the steps below!

## Prerequisites
- Ensure you have Astro JS installed and the project set up locally.
- Movie entries must be in markdown (`.md`) format.
- Follow the specified structure to maintain consistency.

## Adding a Movie Entry
  - 📌 **[Click Here to read the scoring guide](/score-guide)** – Learn more about the rating system!

  - #### 🤖 Option 1. Run the script
    1. **1. Setup**
          - Download and install python (3.10)
          - Navigate to `/scripts/`
          - Update API_KEY in `movieMDGenerator.py` with your own bearer token from the movie database (TMDB)
    2. **2. Run**
          - Run the python script e.g:
              - ```bash
                python movieMDGenerator.py
                ```
          - When prompted paste in the TMDB movie id.
    3. **3. Commit and Submit Your Contribution**  
      - Ensure markdown syntax is correct.
      - Run the following commands to run the app and view your changes:
          - ```bash
            npm install
            npm start
            ```
      - Commit your changes & submit a pull request with a clear title and summary.

  - #### 🧑‍💻 Option 2. Add a manual entry
    2. **2. Locate the movies directory**  
          - Navigate to `/src/content/movie/` within the project.

    3. **3. Create a new file**  
      - Use the movie title in kebab case as the filename (e.g., `talk-to-me.md`).
      - Place it inside the movies directory.

    4. **4. Use the following format**  
      - Copy and fill in the details:
        - ```md
          ---
          name: '<MOVIE_NAME>'
          tmdbId: '<TMDB_ID>'
          tmdbPosterId: '<TMDB_POSTER_PATH>'
          releaseDate: '<YYYY-MM-DD>'
          categoryRatings:
              gore: <RATING_0-10>
              creepy: <RATING_0-10>
              jumpscares: <RATING_0-10>
              suspense: <RATING_0-10>
              psychological: <RATING_0-10>
          ---
          <SHORT_MOVIE_DESCRIPTION>
              ```

      - Example entry:
        - ```md
          ---
          name: 'Talk to Me'
          tmdbId: '1008042'
          tmdbPosterId: '/kdPMUMJzyYAc4roD52qavX0nLIC.jpg'
          releaseDate: '2023-07-26'
          categoryRatings:
              gore: 7
              creepy: 7
              jumpscares: 5
              suspense: 3
              psychological: 6
          ---
          When a group of friends discover how to conjure spirits using an embalmed hand, they become hooked on the new thrill, until one of them goes too far and unleashes terrifying supernatural forces.
          ```

    5. **5. Commit and Submit Your Contribution**  
      - Ensure markdown syntax is correct.
      - Run the following commands to run the app and view your changes:
          - ```bash
            npm install
            npm start
            ```
      - Commit your changes & submit a pull request with a clear title and summary.