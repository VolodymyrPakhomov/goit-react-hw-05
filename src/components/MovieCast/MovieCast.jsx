import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../services/moviesService";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function getMovieCast() {
      try {
        const response = await fetchMovieCast(movieId);
        setCast(response.data.cast);
        console.log(response.data.cast);
      } catch (error) {
        console.error("Error fetching movie cast:", error);
      }
    }

    getMovieCast();
  }, [movieId]);

  return (
    <div>
      <h3>Cast</h3>
      {cast.length > 0 ? (
        <ul>
          {cast.map((actor) => (
            <li key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "https://via.placeholder.com/200x300?text=No+Photo"
                }
                alt={actor.name}
                width="150"
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cast information available.</p>
      )}
    </div>
  );
}
