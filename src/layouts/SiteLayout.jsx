import { NavLink, Outlet } from "react-router-dom";

export default function SiteLayout() {
  return (
    <div className="appShell">
      <header className="navbar">
        <div className="container navInner">
          <div className="brand"><NavLink to="/">EMILIA GRAMA</NavLink></div>

          <nav className="navLinks">
            
            <NavLink to="/components">Components</NavLink>
            <a href="mailto:emiliagrama@gmail.com">Email me</a>
          </nav>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
