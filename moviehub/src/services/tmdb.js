import axios from "axios";

const api = axios.create({
  baseURL: "/api/tmdb",
  timeout: 15000,
});

export const getTrending = async () => {
  const { data } = await api.get("/trending");
  return data.results || [];
};

export const getPopularMovies = async () => {
  const { data } = await api.get("/movies/popular");
  return data.results || [];
};

export const getTopRatedMovies = async () => {
  const { data } = await api.get("/movies/top-rated");
  return data.results || [];
};

export const getUpcomingMovies = async () => {
  const { data } = await api.get("/movies/upcoming");
  return data.results || [];
};

export const getPopularTV = async () => {
  const { data } = await api.get("/tv/popular");
  return data.results || [];
};

export const getGenres = async (type) => {
  const { data } = await api.get(`/genres/${type}`);
  return data.genres || [];
};

export const searchMedia = async (type, query, page = 1) => {
  const { data } = await api.get(`/search/${type}`, {
    params: { query, page },
  });

  return data.results || [];
};

export const getDetails = async (type, id) => {
  const { data } = await api.get(`/details/${type}/${id}`);
  return data;
};

// Convert TMDB data into the format used by MovieHub components.
export const normalizeMedia = (item, type, genreMap = {}) => {
  const mediaType = item.media_type || type;

  const isMovie = mediaType === "movie";

  const title =
    item.title ||
    item.name ||
    "Untitled";

  const genreNames = item.genres?.length
    ? item.genres.map((genre) => genre.name)
    : (item.genre_ids || []).map(
        (id) => genreMap[id]
      ).filter(Boolean);

  const trailer = item.videos?.results?.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer" &&
      video.official
  ) || item.videos?.results?.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer"
  );

  const poster = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : "https://placehold.co/500x750/111827/ffffff?text=MovieHub";

  const backdrop = item.backdrop_path
    ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
    : poster;

  return {
    id: `${mediaType}-${item.id}`,
    tmdbId: item.id,
    mediaType,
    category: isMovie ? "Movie" : "TV Show",

    title,

    year: (
      item.release_date ||
      item.first_air_date ||
      ""
    ).slice(0, 4) || "N/A",

    rating: Number(item.vote_average || 0).toFixed(1),

    genre: genreNames[0] || "Other",
    genres: genreNames,

    duration: isMovie
      ? item.runtime
        ? `${item.runtime} min`
        : "Movie"
      : "TV Series",

    description:
      item.overview || "No description available.",

    tagline: item.tagline || "",

    poster,
    backdrop,

    trailer: trailer
      ? `https://www.youtube.com/watch?v=${trailer.key}`
      : `https://www.youtube.com/results?search_query=${encodeURIComponent(
          title + " official trailer"
        )}`,

    cast: item.credits?.cast?.slice(0, 8) || [],

    providers:
      item["watch/providers"]?.results?.NG?.flatrate || [],
  };
};

export default api;