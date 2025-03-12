import { useContext } from "react";
import "./Navbar.css";
import { NavLink } from "react-router";
import { MenuContext } from "../../context/MenuContext";

const NavBar = () => {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/" className="logo">
          Catching Sunsets
        </a>
      </div>

      <button
        className={`hamburger-menu ${isMenuOpen ? "hamburger-menu--open" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={"navbar-links" + (isMenuOpen ? " " + "active" : "")}>
        <NavLink
          to="/sunsets"
          className={({isActive}) => isActive ? 'nav-link active-link' : 'nav-link'}
          onClick={() => setIsMenuOpen(false)}
        >
          Sunsets
        </NavLink>

        <NavLink
          to="/login"
          className={({isActive}) => isActive ? 'nav-link active-link' : 'nav-link'}
          onClick={() => setIsMenuOpen(false)}
        >
          Login
        </NavLink>

        <NavLink
          to="/profile"
          className={({isActive}) => isActive ? 'nav-link active-link' : 'nav-link'}
          onClick={() => setIsMenuOpen(false)}
        >
          Profile
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
