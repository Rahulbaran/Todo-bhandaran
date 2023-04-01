import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="mode-container">
        <button className="dark-mode-btn" title="change color mode">
          <span className="material-icons">light_mode</span>
          <span className="material-icons">dark_mode</span>
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
