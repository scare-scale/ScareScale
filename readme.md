<a href="https://scarescale.com">
    <p align="center">
        <img src="public/logo/logo_white_background.png" width="200">
    </p>
</a>

Welcome to **Scare Scale**, a community-driven project designed to categorise and rate horror movies based on their elements such as gore, creepiness, jumpscares, and suspense. Built with Astro JS, this project aims to help horror enthusiasts find movies that match their preferences.

## Features

- **Movie Ratings**: Rate movies based on specific categories.
- **Community Contributions**: Add new movies or update existing entries.
- **Dynamic Content**: Automatically generate markdown files for movies using a Python script.

## Prerequisites

- Install dependencies using `npm install`.

## How to Contribute

### Option 1: Use the Python Script

1. Navigate to the `/scripts/` directory.
2. Set the `TMDB_BEARER_TOKEN` environment variable with your TMDB API key.
3. Run the script:
   ```bash
   python movieMDGenerator.py
   ```
4. Enter the TMDB movie ID when prompted.
5. Commit the generated markdown file and submit a pull request.

### Option 2: Add a Manual Entry

1. Navigate to `/src/content/movie/`.
2. Create a new markdown file using the movie title in kebab case (e.g., `talk-to-me.md`).
3. Follow the structure below:
   ```markdown
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
   <MOVIE_DESCRIPTION>
   ```

### Testing Your Changes

1. Run the app locally:
   ```bash
   npm start
   ```
2. Verify your changes in the browser.
3. Commit your changes and submit a pull request.

## Useful Commands

- `npm install` - Install dependencies.
- `npm start` - Start the development server.
- `npm run build` - Build the project for production.
- `npm run test` - Run all acceptance tests.

## License

This project is open-source and available under the [GNU AFFERO GENERAL PUBLIC LICENSE](LICENSE).
