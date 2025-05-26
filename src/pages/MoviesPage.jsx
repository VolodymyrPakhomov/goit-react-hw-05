import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { searchMovies } from "../services/moviesService";
import MovieList from "../components/MovieList/MovieList";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const [inputValue, setInputValue] = useState(""); // 💡 добавили локальный стейт для поля ввода

  const [debouncedQuery] = useDebounce(query, 300);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const nextSearchParams = new URLSearchParams(searchParams);

    if (inputValue !== "") {
      nextSearchParams.set("query", inputValue);
    } else {
      nextSearchParams.delete("query");
    }

    setSearchParams(nextSearchParams);
  };

  useEffect(() => {
    if (!debouncedQuery) {
      setMovies([]);
      return;
    }

    async function fetchMovies() {
      try {
        setLoading(true);
        const response = await searchMovies(debouncedQuery);
        setMovies(
          Array.isArray(response.data?.results) ? response.data.results : []
        );
        console.log(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [debouncedQuery]);

  // 💡 новый useEffect для сброса inputValue после загрузки фильмов
  useEffect(() => {
    if (movies.length > 0 || (!loading && debouncedQuery)) {
      setInputValue("");
    }
  }, [movies, loading, debouncedQuery]);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}

// import { useState, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
// import { useDebounce } from "use-debounce";
// import { searchMovies } from "../services/moviesService";
// import MovieList from "../components/MovieList/MovieList";

// export default function MoviesPage() {
//   const [movies, setMovies] = useState([]);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const query = searchParams.get("query") ?? "";

//   const [loading, setLoading] = useState(false);
//   const [debouncedQuery] = useDebounce(query, 300);

//   const changeSearchQuery = (event) => {
//     const newQuery = event.target.value;
//     const nextSearchParams = new URLSearchParams(searchParams);

//     if (newQuery !== "") {
//       nextSearchParams.set("query", newQuery);
//     } else {
//       nextSearchParams.delete("query");
//     }
//     setSearchParams(nextSearchParams);
//   };

//   useEffect(() => {
//     if (!debouncedQuery) {
//       setMovies([]);
//       return;
//     }

//     async function fetchMovies() {
//       try {
//         setLoading(true);
//         const response = await searchMovies(debouncedQuery);
//         setMovies(
//           Array.isArray(response.data?.results) ? response.data.results : []
//         );
//         console.log(response.data.results);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//         setMovies([]);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchMovies();
//   }, [debouncedQuery]);

//   return (
//     <div>
//       <form onSubmit={(e) => e.preventDefault()}>
//         <input type="text" value={query} onChange={changeSearchQuery} />
//         <button type="submit">Search</button>
//       </form>

//       {loading && <p>Loading...</p>}
//       {movies.length > 0 && <MovieList movies={movies} />}
//     </div>
//   );
// }
