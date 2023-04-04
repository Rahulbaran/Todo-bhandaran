import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { ThemeContext } from "../context/Theme";

export default function Header() {
  const themeCnxt = useContext(ThemeContext);

  return (
    <header className="header">
      <div className="mode-container">
        <button
          className={`dark-mode-btn${themeCnxt.dark ? " dark-active-btn" : ""}`}
          title="change color mode"
          onClick={themeCnxt.toggleTheme}
        >
          <span className="material-icons">dark_mode</span>
          <span className="material-icons">light_mode</span>
        </button>
      </div>

      <nav className="navigation">
        <NavLink to="/" className="navigation-link">
          Home
        </NavLink>
        <NavLink to="/create" className="navigation-link">
          Create
        </NavLink>
      </nav>
    </header>
  );
}
