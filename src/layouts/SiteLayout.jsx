import { NavLink, Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function SiteLayout() {
  return (
    <div className="appShell">
      <header className="navbar">
        <div className="container navInner">
          <div className="brand"><NavLink to="/">EMILIA GRAMA</NavLink></div>

          <nav className="navLinks">
            
            <NavLink to="/components">UI experiments</NavLink>
            
          </nav>
        </div>
      </header>

      <main className="mainContent">
        <Outlet />
      </main>

      <Footer /> 
    </div>
  );
}