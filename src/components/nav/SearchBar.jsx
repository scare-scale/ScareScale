import React from "react";
import { movies } from "../../lib/movies";

export default () => {
  const [query, setQuery] = React.useState("");
  const [filteredMovies, setFilteredMovies] = React.useState([]);

  const onSearchChange = (e) => {
    setQuery(e.target.value);
    setFilteredMovies(
      movies.getAll().filter((movie) => {
        const title = movie.name.toLowerCase();
        const matchesSearch = title.includes(e.target.value);
        return matchesSearch;
      }).slice(0, 5)
    );
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
  
  return (
    <div className="flex items-center flex-grow md:flex-none md:ml-4 px-4 md:px-0">
      <div className="relative w-full md:w-auto">
        <input
          type="text"
          id="searchInput"
          placeholder="Search..."
          aria-label="Search for horror movies"
          className="text-black rounded-md py-2 pl-4 pr-10 w-full md:w-auto outline-none ring-2 ring-black focus:ring-[#d60c16]"
          onChange={onSearchChange}
          onKeyDown={handleKeyDown}
          value={query}
        />
        <button
          id="searchButton"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-white"
          onClick={handleSearchRedirect}
        >
          <img src="/icons/search.svg" alt="🔍" width={25} height={25} loading="eager" />
        </button>

        <ul
          id="autocompleteList"
          className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredMovies.map((movie) => (
            <li className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <img
                  src={movie.posterUrl}
                  alt={movie.name}
                  className="w-10 h-14 object-cover rounded-sm flex-shrink-0"
                />
                <span className="text-sm text-black">
                  {`${movie.name} (${movie.releaseYear})`}
                </span>
            </li>
          ))}

        </ul>
      </div>
    </div>
  );
};