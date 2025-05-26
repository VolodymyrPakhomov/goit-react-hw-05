import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import css from "./App.module.css";

import Navigation from "../Navigation/Navigation";

const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));
const HomePage = lazy(() => import("../../pages/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage"));
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage"));
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));
lazy();

function App() {
  return (
    <div className={css.container}>
      <Navigation />

      <Suspense fallback={<strong>Loading page...</strong>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
