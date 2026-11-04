require("dotenv").config();

const express = require("express");
const cors = require("cors");
const tmdbRoutes = require("./routes/tmdbRoutes");

const app = express();

const PORT = process.env.PORT || 1000;

if (!process.env.TMDB_READ_ACCESS_TOKEN) {
  console.error("TMDB_READ_ACCESS_TOKEN is missing.");
  process.exit(1);
}

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MovieHub API is running 🚀",
  });
});

app.use("/api/tmdb", tmdbRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "API route not found.",
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    message: "Internal server error.",
  });
});

app.listen(PORT, () => {
  console.log(`MovieHub server running on port ${PORT}`);
});