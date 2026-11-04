import MovieCard from "../components/MovieCard";
import { Bookmark } from "lucide-react";

export default function Watchlist({
  movies,
  watchlist,
  onSelect,
  onToggleSave,
}) {
  const savedMovies = movies.filter((movie) =>
    watchlist.includes(movie.id)
  );

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-14 lg:px-8">
      <div className="mb-10">
        <div className="mb-3 flex items-center gap-3">
          <Bookmark className="text-violet-400" size={25} />
          <h1 className="text-4xl font-black">My Watchlist</h1>
        </div>
        <p className="text-sm text-slate-400">
          Your saved movies and TV shows in one place.
        </p>
      </div>

      {savedMovies.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {savedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={onSelect}
              isSaved={true}
              onToggleSave={onToggleSave}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-20 text-center">
          <Bookmark size={40} className="mx-auto text-slate-600" />
          <h2 className="mt-5 text-xl font-bold">
            Your watchlist is empty
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Save movies you love and find them here later.
          </p>
        </div>
      )}
    </main>
  );
}