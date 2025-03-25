import { NavLink } from "react-router";
import { MenuContext } from "../../context/MenuContext";
import { useContext } from "react";
import "./ErrorPage.css";
import ErrorImage from "../../assets/ErrorImage.png";

function ErrorPage() {
  const { isMenuOpen } = useContext(MenuContext);

  return (
    <div
      className={`error-page sunset component-content-container ${
        isMenuOpen ? "content-container-menu-open" : ""
      }`}
    >
      <div className="container">
        <h2>Sorry, page could not be found.</h2>
        <br />
        <img className="error-image" src={ErrorImage} alt="Sunset" />
        <br />
        <p>
          Have you looked up at the sky today?
          <br />
          Watched the clouds?
          <br />
          <br />
          Take a moment.
          <br />
          <br />
          Breath in.
          <br />
          Breath out.
          <br />
          <br />
          Now, you can go back and enjoy some more sunsets online or go outside
          and enjoy some real sunset magic.
        </p>

        <div className="footer-item">
          <NavLink to="/sunsets">
            <button className="button">Back to the Sunset Magic</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
