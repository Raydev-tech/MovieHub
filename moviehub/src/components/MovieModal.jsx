import {
  X,
  Star,
  Play,
  Bookmark,
  Users,
  Clapperboard,
} from "lucide-react";

export default function MovieModal({
  movie,
  onClose,
  isSaved,
  onToggleSave,
  isLoading = false,
}) {
  if (!movie) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#111827]"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/70 p-2 hover:bg-violet-600"
          aria-label="Close details"
        >
          <X size={20} />
        </button>

        <div className="relative h-56 sm:h-80">
          <img
            src={movie.backdrop}
            alt=""
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-black/30 to-transparent" />
        </div>

        <div className="relative -mt-14 space-y-5 p-6">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-400">
            {movie.category} · {movie.genres?.join(", ") || movie.genre}
          </span>

          <h2 className="text-3xl font-black sm:text-4xl">
            {movie.title}
          </h2>

          {movie.tagline && (
            <p className="text-sm italic text-slate-400">
              {movie.tagline}
            </p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <span>{movie.year}</span>

            <span className="flex items-center gap-1 text-amber-400">
              <Star size={15} fill="currentColor" />
              {movie.rating}/10
            </span>

            <span>{movie.duration}</span>
          </div>

          <p className="text-sm leading-7 text-slate-300">
            {movie.description}
          </p>

          {isLoading && (
            <p className="text-sm text-violet-400">
              Loading full movie details...
            </p>
          )}

          {movie.cast?.length > 0 && (
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 font-bold">
                <Users size={18} className="text-violet-400" />
                Main Cast
              </h3>

              <div className="flex flex-wrap gap-2">
                {movie.cast.map((person) => (
                  <span
                    key={person.cast_id || person.id}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300"
                  >
                    {person.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {movie.providers?.length > 0 && (
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 font-bold">
                <Clapperboard size={18} className="text-violet-400" />
                Available streaming providers in Nigeria
              </h3>

              <div className="flex flex-wrap gap-3">
                {movie.providers.map((provider) => (
                  <div
                    key={provider.provider_id}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2"
                  >
                    {provider.logo_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                        alt=""
                        className="h-8 w-8 rounded-lg object-cover"
                      />
                    )}

                    <span className="text-xs text-slate-300">
                      {provider.provider_name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={movie.trailer}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-violet-600 px-5 py-3 text-sm font-bold hover:bg-violet-500"
            >
              <Play size={16} fill="currentColor" />
              Watch trailer
            </a>

            <button
              onClick={() => onToggleSave(movie.id)}
              className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-bold hover:bg-white/10"
            >
              <Bookmark
                size={16}
                fill={isSaved ? "currentColor" : "none"}
              />
              {isSaved ? "Saved" : "Add to watchlist"}
            </button>
          </div>

          <p className="text-xs text-slate-500">
            Streaming availability can vary by location and may change.
          </p>
        </div>
      </div>
    </div>
  );
}