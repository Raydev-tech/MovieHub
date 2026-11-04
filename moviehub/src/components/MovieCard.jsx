import { Star, Bookmark, Play } from "lucide-react";

export default function MovieCard({
  movie,
  onSelect,
  isSaved,
  onToggleSave,
}) {
  return (
    <article className="group min-w-0">
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-slate-800">
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/500x750/111827/ffffff?text=MovieHub";
          }}
        />

        <div className="poster-overlay absolute inset-0 opacity-0 transition group-hover:opacity-100" />

        <button
          onClick={() => onToggleSave(movie.id)}
          aria-label={isSaved ? "Remove from watchlist" : "Add to watchlist"}
          className={`absolute right-2 top-2 rounded-full p-2 transition ${
            isSaved
              ? "bg-violet-600 text-white"
              : "bg-black/60 text-white hover:bg-violet-600"
          }`}
        >
          <Bookmark size={17} fill={isSaved ? "currentColor" : "none"} />
        </button>

        <button
          onClick={() => onSelect(movie)}
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-violet-600 px-4 py-2 text-xs font-bold opacity-0 transition hover:bg-violet-500 group-hover:opacity-100"
        >
          <Play size={14} fill="currentColor" />
          View details
        </button>

        <span className="absolute left-2 top-2 rounded-md bg-black/70 px-2 py-1 text-xs text-white">
          {movie.category}
        </span>
      </div>

      <div className="pt-3">
        <h3 className="truncate text-sm font-bold text-white">
          {movie.title}
        </h3>

        <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
          <span>{movie.year}</span>
          <span className="flex items-center gap-1 text-amber-400">
            <Star size={13} fill="currentColor" />
            {movie.rating}
          </span>
        </div>
      </div>
    </article>
  );
}