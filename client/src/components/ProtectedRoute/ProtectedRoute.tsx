import { ReactNode, useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthorizationContext";
import { MenuContext } from "../../context/MenuContext";
import "./Protected Route.css";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { loggedUser } = useContext(AuthContext);
  const { isMenuOpen } = useContext(MenuContext);
  const navigate = useNavigate();

  // const redirectTo = useNavigate()
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
      {/* <h1>Inside a ProtectedRoute</h1>
        {children} */}

      {/* {isAuthenticated ? children : <h1>You need to login to see your profile</h1> 
    setTimeout(navigate("/login");
        }, 5000);  */}

      {/* USE A TIMEOUT ABOVE that will redirect after a few seconds 
  INSTEAD OF CALLING THE FUNCTION    redirectTo("/")  MAYBE CREATE ANOTHER COMPONENT*/}
      {/* {isAuthenticated ? children : redirectTo("/")} */}
    </>
  );
}

export default ProtectedRoute;
