import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Camera, Clapperboard, Code2 } from "lucide-react";

import Navbar from "./components/Navbar";
import MovieModal from "./components/MovieModal";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import Watchlist from "./pages/Watchlist";

import {
  getTrending,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getPopularTV,
  getGenres,
  getDetails,
  normalizeMedia,
} from "./services/tmdb";

export default function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [popularTV, setPopularTV] = useState([]);

  const [movieGenres, setMovieGenres] = useState({});
  const [tvGenres, setTVGenres] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [watchlist, setWatchlist] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("moviehub-watchlist")
      ) || [];
    } catch {
      return [];
    }
  });

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // Fetch all homepage content
  useEffect(() => {
    const loadMovieHub = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          trendingData,
          popularData,
          topRatedData,
          upcomingData,
          tvData,
          movieGenreData,
          tvGenreData,
        ] = await Promise.all([
          getTrending(),
          getPopularMovies(),
          getTopRatedMovies(),
          getUpcomingMovies(),
          getPopularTV(),
          getGenres("movie"),
          getGenres("tv"),
        ]);

        const movieMap = Object.fromEntries(
          movieGenreData.map((g) => [g.id, g.name])
        );

        const tvMap = Object.fromEntries(
          tvGenreData.map((g) => [g.id, g.name])
        );

        setMovieGenres(movieMap);
        setTVGenres(tvMap);

        const normalizeMovies = (data, type, map) =>
          data.map((item) =>
            normalizeMedia(item, type, map)
          );

        const trending = trendingData.map((item) => {
          const type = item.media_type;

          return normalizeMedia(
            item,
            type,
            type === "tv" ? tvMap : movieMap
          );
        });

        setTrendingMovies(
          trending.filter((item) => item.mediaType === "movie")
        );

        setPopularMovies(
          normalizeMovies(popularData, "movie", movieMap)
        );

        setTopRated(
          normalizeMovies(topRatedData, "movie", movieMap)
        );

        setUpcoming(
          normalizeMovies(upcomingData, "movie", movieMap)
        );

        setPopularTV(
          normalizeMovies(tvData, "tv", tvMap)
        );

      } catch (err) {
        console.error("MovieHub loading error:", err);

        setError(
          err.response?.data?.message ||
          "Unable to load movies. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadMovieHub();
  }, []);

  // Save watchlist
  useEffect(() => {
    localStorage.setItem(
      "moviehub-watchlist",
      JSON.stringify(watchlist)
    );
  }, [watchlist]);

  const toggleWatchlist = (id) => {
    setWatchlist((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  // Fetch full movie or TV details
  const handleSelectMovie = async (movie) => {
    setSelectedMovie(movie);
    setDetailsLoading(true);

    try {
      const details = await getDetails(
        movie.mediaType,
        movie.tmdbId
      );

      const genreMap =
        movie.mediaType === "tv"
          ? tvGenres
          : movieGenres;

      setSelectedMovie(
        normalizeMedia(
          details,
          movie.mediaType,
          genreMap
        )
      );
    } catch (err) {
      console.error("Details loading error:", err);
    } finally {
      setDetailsLoading(false);
    }
  };

  const movieCatalog = [
    ...popularMovies,
    ...topRated,
    ...upcoming,
    ...trendingMovies,
  ].filter(
    (movie, index, array) =>
      array.findIndex((item) => item.id === movie.id) === index
  );

  const sharedProps = {
    watchlist,
    onSelect: handleSelectMovie,
    onToggleSave: toggleWatchlist,
  };

  return (
    <div className="min-h-screen bg-[#080b14] text-white">
      <Navbar watchlistCount={watchlist.length} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              trendingMovies={trendingMovies}
              popularMovies={popularMovies}
              topRated={topRated}
              upcoming={upcoming}
              popularTV={popularTV}
              loading={loading}
              error={error}
              {...sharedProps}
            />
          }
        />

        <Route
          path="/movies"
          element={
            <Movies
              movies={movieCatalog}
              genreMap={movieGenres}
              {...sharedProps}
            />
          }
        />

        <Route
          path="/tv-shows"
          element={
            <TVShows
              movies={popularTV}
              genreMap={tvGenres}
              {...sharedProps}
            />
          }
        />

        <Route
          path="/watchlist"
          element={
            <Watchlist
              movies={movieCatalog.concat(popularTV)}
              {...sharedProps}
            />
          }
        />

        <Route
          path="*"
          element={
            <div className="flex min-h-[60vh] flex-col items-center justify-center">
              <h1 className="text-5xl font-black">404</h1>
              <p className="mt-3 text-slate-400">
                Page not found.
              </p>
              <Link
                to="/"
                className="mt-5 text-violet-400"
              >
                Back to homepage
              </Link>
            </div>
          }
        />
      </Routes>

      <footer className="border-t border-white/10 bg-[#0b0f1a]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <Clapperboard className="text-violet-500" size={23} />
              <span className="text-xl font-black">
                Movie<span className="text-violet-500">Hub</span>
              </span>
            </Link>

            <p className="mt-3 max-w-sm text-xs leading-6 text-slate-500">
              Discover movies, explore TV shows and find your
              next entertainment experience.
            </p>
          </div>

          <div className="flex gap-5 text-sm text-slate-400">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/movies" className="hover:text-white">Movies</Link>
            <Link to="/tv-shows" className="hover:text-white">TV Shows</Link>
          </div>

          <div className="flex gap-3">
            <a
              href="https://github.com/hee-sholar"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-full border border-white/10 p-3 hover:bg-white/10"
            >
              <Code2 size={18} />
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-white/10 p-3 hover:bg-white/10"
            >
              <Camera size={18} />
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 py-5 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} MovieHub.
          Powered by TMDB data.
        </div>
      </footer>

      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        isLoading={detailsLoading}
        isSaved={
          selectedMovie
            ? watchlist.includes(selectedMovie.id)
            : false
        }
        onToggleSave={toggleWatchlist}
      />
    </div>
  );
}