import { ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";

export default function MovieRow({
  title,
  movies,
  onSelect,
  watchlist,
  onToggleSave,
}) {
  if (!movies.length) return null;

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black sm:text-2xl">{title}</h2>
          <p className="mt-1 text-xs text-slate-500">
            Discover your next favourite
          </p>
        </div>

        <button
          onClick={() => onSelect(movies[0])}
          className="flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300"
        >
          Explore
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="movie-scroll grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onSelect={onSelect}
            isSaved={watchlist.includes(movie.id)}
            onToggleSave={onToggleSave}
          />
        ))}
      </div>
    </section>
  );
}