import { Routes, Route } from "react-router-dom";
import css from "./App.module.css";
import Navigation from "../Navigation/Navigation";
import NotFoundPage from "../../pages/NotFoundPage";
import HomePage from "../../pages/HomePage";

function App() {
  return (
    <div className={css.container}>
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<h1>Movies</h1>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
