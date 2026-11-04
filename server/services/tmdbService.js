const BASE_URL = "https://api.themoviedb.org/3";

const tmdbFetch = async (endpoint, params = {}) => {
  const token = process.env.TMDB_READ_ACCESS_TOKEN;

  if (!token) {
    throw new Error("TMDB API token is missing.");
  }

  const url = new URL(`${BASE_URL}${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    const error = new Error(
      errorData.status_message ||
      `TMDB request failed with status ${response.status}`
    );

    error.status = response.status;
    throw error;
  }

  return response.json();
};

module.exports = tmdbFetch;