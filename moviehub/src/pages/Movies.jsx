import { useEffect, useMemo, useState } from "react";

import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

import {
  searchMedia,
  normalizeMedia,
} from "../services/tmdb";

export default function Movies({
  movies,
  watchlist,
  onSelect,
  onToggleSave,
  genreMap = {},
  category = "Movie",
  heading = "Explore Movies",
}) {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const type = category === "Movie" ? "movie" : "tv";

  // Live TMDB search with a small debounce
  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      setSearchLoading(false);
      setSearchError("");
      return;
    }

    let cancelled = false;

    const timer = setTimeout(async () => {
      try {
        setSearchLoading(true);
        setSearchError("");

        const results = await searchMedia(type, search);

        if (!cancelled) {
          setSearchResults(
            results.map((item) =>
              normalizeMedia(item, type, genreMap)
            )
          );
        }
      } catch (error) {
        if (!cancelled) {
          setSearchError(
            error.response?.data?.message ||
            "Search failed. Please try again."
          );
        }
      } finally {
        if (!cancelled) {
          setSearchLoading(false);
        }
      }
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [search, type, genreMap]);

  const source = search.trim() ? searchResults : movies;

  const genreOptions = useMemo(
    () => [
      "All",
      ...new Set(
        source.flatMap((movie) => movie.genres || [])
      ),
    ],
    [source]
  );

  const filteredMovies = source.filter((movie) => {
    return (
      genre === "All" ||
      movie.genres?.includes(genre) ||
      movie.genre === genre
    );
  });

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-12 lg:px-8">
      <div className="mb-10 space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
          Powered by TMDB
        </p>

        <h1 className="text-4xl font-black sm:text-5xl">
          {heading}
        </h1>

        <p className="text-sm text-slate-400">
          Discover movies, explore genres and find your next favourite.
        </p>
      </div>

      <div className="mb-7 max-w-2xl">
        <SearchBar
          value={search}
          onChange={setSearch}
        />
      </div>

      <div className="movie-scroll mb-9 flex gap-2 overflow-x-auto pb-2">
        {genreOptions.map((item) => (
          <button
            key={item}
            onClick={() => setGenre(item)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-xs font-semibold transition ${
              genre === item
                ? "bg-violet-600 text-white"
                : "border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {searchLoading ? (
        <div className="py-20 text-center text-slate-400">
          Searching TMDB...
        </div>
      ) : searchError ? (
        <div className="py-20 text-center text-red-400">
          {searchError}
        </div>
      ) : (
        <>
          <p className="mb-5 text-sm text-slate-400">
            {filteredMovies.length} results found
          </p>

          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onSelect={onSelect}
                  isSaved={watchlist.includes(movie.id)}
                  onToggleSave={onToggleSave}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] py-20 text-center">
              <h3 className="text-xl font-bold">
                No results found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Try another movie title or genre.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setGenre("All");
                }}
                className="mt-5 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-bold"
              >
                Clear filters
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}