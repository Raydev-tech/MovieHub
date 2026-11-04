import Hero from "../components/Hero";
import MovieRow from "../components/MovieRow";

export default function Home({
  trendingMovies,
  popularMovies,
  topRated,
  upcoming,
  popularTV,
  watchlist,
  onSelect,
  onToggleSave,
  loading,
  error,
}) {
  const featured = trendingMovies[0] || popularMovies[0];

  const rowProps = {
    onSelect,
    watchlist,
    onToggleSave,
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-5 py-20">
        <div className="animate-pulse space-y-8">
          <div className="h-72 rounded-3xl bg-white/5 sm:h-96" />
          <div className="h-8 w-48 rounded bg-white/5" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[2/3] rounded-xl bg-white/5"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error && !featured) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
        <h2 className="text-2xl font-black">
          Something went wrong
        </h2>
        <p className="mt-3 text-sm text-slate-400">
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 rounded-full bg-violet-600 px-6 py-3 text-sm font-bold"
        >
          Try again
        </button>
      </main>
    );
  }

  return (
    <>
      {featured && (
        <Hero
          movie={featured}
          onSelect={onSelect}
        />
      )}

      <main className="mx-auto max-w-7xl space-y-14 px-5 py-14 lg:px-8">
        {error && (
          <p className="text-sm text-amber-400">{error}</p>
        )}

        <MovieRow
          title="Trending Movies"
          movies={trendingMovies}
          {...rowProps}
        />

        <MovieRow
          title="Popular Movies"
          movies={popularMovies}
          {...rowProps}
        />

        <MovieRow
          title="Popular TV Shows"
          movies={popularTV}
          {...rowProps}
        />

        <MovieRow
          title="Top Rated Movies"
          movies={topRated}
          {...rowProps}
        />

        <MovieRow
          title="Coming Soon"
          movies={upcoming}
          {...rowProps}
        />
      </main>
    </>
  );
}