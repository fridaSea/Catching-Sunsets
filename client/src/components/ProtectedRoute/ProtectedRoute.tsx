import { ReactNode, useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../context/AuthorizationContext";
import { MenuContext } from "../../context/MenuContext";
import "./Protected Route.css";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { loggedUser } = useContext(AuthContext);
  const { isMenuOpen } = useContext(MenuContext);

  const isAuthenticated = loggedUser ? true : false;

  return (
    <>
      <div
        className={`protected-route component-content-container ${
          isMenuOpen ? "content-container-menu-open" : ""
        }`}
      >
        {isAuthenticated ? (
          children
        ) : (
          <div>
            <h1>Looks like you are not logged in.</h1>

            <h3>
              Please{" "}
              <NavLink to="/login" className="login-link">
                log in
              </NavLink>{" "}
              to access this page!
            </h3>
          </div>
        )}
      </div>
    </>
  );
}

export default ProtectedRoute;
