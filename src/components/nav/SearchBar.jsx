import React from "react";
import { movies } from "../../lib/movies";

const SearchBar = () => {
  const [query, setQuery] = React.useState("");
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [isFocused, setIsFocused] = React.useState(false);

  const onSearchChange = (e) => {
    const input = e.target.value;
    setQuery(input);
    setFilteredMovies([]);

    if (input.length > 1) {
      const lowerQuery = input.toLowerCase();
      const filtered = [];

      for (const movie of movies.getAll()) {
        if (movie.name.toLowerCase().includes(lowerQuery)) {
          filtered.push(movie);
          if (filtered.length === 5) break;
        }
      }

      setFilteredMovies(filtered);
    }
  };

  const handleSearchRedirect = () => {
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchRedirect();
    }
  };

  const showAutocomplete = isFocused && filteredMovies.length > 0;

  return (
    <div className="flex items-center flex-grow md:flex-none md:ml-4 px-4 md:px-0">
      <div className="relative w-full md:w-60">
        <input
          type="text"
          id="searchInput"
          placeholder="Search..."
          aria-label="Search for horror movies"
          className="bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 rounded-lg py-2.5 pl-4 pr-12 w-full outline-none border border-white/20 focus:border-blood-400 focus:ring-2 focus:ring-blood-400/20 transition-all duration-200"
          onChange={onSearchChange}
          onKeyDown={handleKeyDown}
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)} // delay allows click
        />
        <button
          id="searchButton"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blood-400 transition-colors duration-200 p-1 rounded hover:bg-blood-600/20"
          onClick={handleSearchRedirect}
        >
          <img src="/icons/search.svg" alt="🔍" width={20} height={20} loading="eager" />
        </button>

        <ul
          id="autocompleteList"
          className={`${
            !showAutocomplete ? "hidden" : ""
          } absolute z-10 mt-2 w-full bg-dark-lighter/95 backdrop-blur-md border border-blood-600/30 rounded-lg shadow-xl max-h-60 overflow-y-auto`}
        >
          {filteredMovies.map((movie) => (
            <li
              key={movie.id}
              className="flex items-center gap-3 px-4 py-3 hover:bg-blood-600/20 cursor-pointer transition-colors duration-150 border-b border-blood-800/30 last:border-b-0"
              onMouseDown={() => {
                setQuery(movie.name);
                window.location.href = `/search?q=${encodeURIComponent(movie.name)}`;
              }}
            >
              <img
                src={movie.posterUrl}
                alt={movie.name}
                className="w-10 h-14 object-cover rounded flex-shrink-0 shadow-md"
              />
              <span className="text-sm text-white font-medium">
                {`${movie.name} (${movie.releaseYear})`}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;