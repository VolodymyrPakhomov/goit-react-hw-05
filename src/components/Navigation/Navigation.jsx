import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const getActiveLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

export default function Navigation() {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <NavLink to="/" className={getActiveLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={getActiveLinkClass}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
}
