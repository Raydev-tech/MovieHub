import Movies from "./Movies";

export default function TVShows(props) {
  return (
    <Movies
      {...props}
      category="TV Show"
      heading="Explore TV Shows"
    />
  );
}