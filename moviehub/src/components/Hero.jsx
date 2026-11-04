import { Play, Info, Star } from "lucide-react";

export default function Hero({ movie, onSelect }) {
  return (
    <section className="relative min-h-[540px] overflow-hidden sm:min-h-[620px]">
      <img
        src={movie.backdrop}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="hero-overlay absolute inset-0" />

      <div className="relative mx-auto flex min-h-[540px] max-w-7xl items-center px-5 py-20 sm:min-h-[620px] lg:px-8">
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
            <span className="h-2 w-2 rounded-full bg-violet-500" />
            Featured movie
          </div>

          <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {movie.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
            <span>{movie.year}</span>
            <span className="flex items-center gap-1 text-amber-400">
              <Star size={15} fill="currentColor" />
              {movie.rating}/10
            </span>
            <span>{movie.genre}</span>
            <span>{movie.duration}</span>
          </div>

          <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            {movie.description}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onSelect(movie)}
              className="flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3.5 text-sm font-bold transition hover:bg-violet-500"
            >
              <Play size={17} fill="currentColor" />
              Explore movie
            </button>

            <button
              onClick={() => onSelect(movie)}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold backdrop-blur hover:bg-white/10"
            >
              <Info size={17} />
              More details
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}