import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import ScrollToHash from "../components/ScrollToHash";

export default function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="appShell">
      <header className="navbar">
        <div className="container navInner">
          <div className="brand">
            <NavLink to="/" onClick={closeMenu}>
              EMILIA GRAMA
            </NavLink>
          </div>

          <button
            type="button"
            className={`navToggle ${menuOpen ? "is-open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`navLinks ${menuOpen ? "is-open" : ""}`}>
            <NavLink
              to="/experiments"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
            >
              UI experiments
            </NavLink>

            <NavLink
              to="/contact"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "navLink active" : "navLink")}
            >
              Contact
            </NavLink>
          </nav>
        </div>
      </header>

      <ScrollToHash />

      <main className="mainContent">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}