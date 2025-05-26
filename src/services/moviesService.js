import axios from "axios";

const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGFhMTIwOTgzNWU5Mzk0YWNhMDNiNzE5M2NjM2VkYyIsIm5iZiI6MTY2NzA1ODQ5MC43NjYsInN1YiI6IjYzNWQ0YjNhOWJhODZhMDA3YTE3OTA2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OYnanhkEiz9BosEkVVCIR7Z5zSBPBDfEFhpDmtbSexc";
const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization: API_KEY,
  },
};

export const fetchTrendingMovies = () => {
  return axios.get(`${BASE_URL}/trending/movie/day`, options);
};

export const searchMovies = (query) => {
  return axios.get(`${BASE_URL}/search/movie?query=${query}`, options);
};

export const fetchMovieDetails = (movieId) => {
  return axios.get(`${BASE_URL}/movie/${movieId}`, options);
};

export const fetchMovieCast = (movieId) => {
  return axios.get(`${BASE_URL}/movie/${movieId}/credits`, options);
};

export const fetchMovieReviews = (movieId) => {
  return axios.get(`${BASE_URL}/movie/${movieId}/reviews`, options);
};
