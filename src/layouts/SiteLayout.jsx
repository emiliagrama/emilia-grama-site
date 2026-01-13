import { NavLink, Outlet } from "react-router-dom";

const navClass = ({ isActive }) =>
  isActive ? "navLink navLinkActive" : "navLink";

export default function SiteLayout() {
  return (
    <div>
      <header className="navbar">
        <div className="container navbarInner">
          <div className="brand">
            <span style={{ color: "var(--accent)" }}>●</span>
            <span>Emilia Grama</span>
          </div>

          <nav className="navLinks">
            <NavLink to="/" end className={navClass}>
              Home
            </NavLink>

            <NavLink to="/components" className={navClass}>
              Components
            </NavLink>

            <a
              className="btn btnPrimary"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=emiliagrama@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              Email me
            </a>
          </nav>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
