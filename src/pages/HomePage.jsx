import { fetchTrendingMovies } from "../services/moviesService";
import { useEffect, useState } from "react";
import MovieList from "../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function dataTrendingMovies() {
      try {
        const response = await fetchTrendingMovies();
        setMovies(response.data.results);
        console.log(response.data.results);
      } catch (error) {}
    }

    dataTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
