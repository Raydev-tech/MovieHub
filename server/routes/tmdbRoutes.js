const express = require("express");
const tmdbFetch = require("../services/tmdbService");

const router = express.Router();

// Trending movies and TV shows
router.get("/trending", async (req, res) => {
  try {
    const data = await tmdbFetch("/trending/all/week", {
      language: "en-US",
    });

    res.json(data);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message,
    });
  }
});

// Popular movies
router.get("/movies/popular", async (req, res) => {
  try {
    const data = await tmdbFetch("/movie/popular", {
      language: "en-US",
      page: req.query.page || 1,
    });

    res.json(data);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message,
    });
  }
});

// Top rated movies
router.get("/movies/top-rated", async (req, res) => {
  try {
    const data = await tmdbFetch("/movie/top_rated", {
      language: "en-US",
      page: req.query.page || 1,
    });

    res.json(data);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message,
    });
  }
});

// Upcoming movies
router.get("/movies/upcoming", async (req, res) => {
  try {
    const data = await tmdbFetch("/movie/upcoming", {
      language: "en-US",
      page: req.query.page || 1,
    });

    res.json(data);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message,
    });
  }
});

// Popular TV shows
router.get("/tv/popular", async (req, res) => {
  try {
    const data = await tmdbFetch("/tv/popular", {
      language: "en-US",
      page: req.query.page || 1,
    });

    res.json(data);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message,
    });
  }
});

// Search movies or TV shows
router.get("/search/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const { query, page = 1 } = req.query;

    const endpoints = {
      movie: "/search/movie",
      tv: "/search/tv",
    };

    if (!endpoints[type]) {
      return res.status(400).json({
        message: "Invalid search type. Use movie or tv.",
      });
    }

    if (!query || !query.trim()) {
      return res.status(400).json({
        message: "Search query is required.",
      });
    }

    const data = await tmdbFetch(endpoints[type], {
      query: query.trim(),
      language: "en-US",
      page,
    });

    res.json(data);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message,
    });
  }
});

// Movie and TV genres
router.get("/genres/:type", async (req, res) => {
  try {
    const { type } = req.params;

    if (!["movie", "tv"].includes(type)) {
      return res.status(400).json({
        message: "Type must be movie or tv.",
      });
    }

    const data = await tmdbFetch(`/genre/${type}/list`, {
      language: "en-US",
    });

    res.json(data);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message,
    });
  }
});


// Movie or TV details, including cast, videos and streaming providers
router.get("/details/:type/:id", async (req, res) => {
  try {
    const { type, id } = req.params;

    if (!["movie", "tv"].includes(type)) {
      return res.status(400).json({
        message: "Type must be movie or tv.",
      });
    }

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        message: "Invalid TMDB ID.",
      });
    }

    const [details, providers] = await Promise.all([
      tmdbFetch(`/${type}/${id}`, {
        language: "en-US",
        append_to_response: "credits,videos",
      }),

      tmdbFetch(`/${type}/${id}/watch/providers`),
    ]);

    details["watch/providers"] = providers;

    res.json(details);

  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message,
    });
  }
});


module.exports = router;