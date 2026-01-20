import { NavLink, Outlet } from "react-router-dom";

export default function SiteLayout() {
  return (
    <div className="appShell">
      <header className="navbar">
        <div className="container navInner">
          <div className="brand">Emilia Grama</div>

          <nav className="navLinks">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/components">Components</NavLink>
            <a href="mailto:YOUR_EMAIL_HERE">Email me</a>
          </nav>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
