import { useContext } from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router";
import { MenuContext } from "../../context/MenuContext";
import { AuthContext } from "../../context/AuthorizationContext";

const NavBar = () => {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  const { loggedUser, login, logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logoutUser = () => {
    logout();
    setIsMenuOpen(false);
  };

  const loginUser = () => {
    login("email", "password");
    setIsMenuOpen(false);
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
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Sunsets
        </NavLink>
        <ul className="nav-item">
          {loggedUser ? (
            <NavLink
              to="/sunsets"
              className={({ isActive }) =>
                isActive ? "nav-link nav-active" : "nav-link"
              }
              onClick={logoutUser}
              color="inherit"
            >
              Log out
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              // variant="danger"
              className={({ isActive }) =>
                isActive ? "nav-link nav-active" : "nav-link"
              }
              // onClick={login}
              //onClick={() => login("email", "password")}
              onClick={loginUser}
            >
              Login
            </NavLink>
          )}
        </ul>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "nav-link active-link" : "nav-link"
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Profile
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
