import { useContext } from "react";
import { MenuContext } from "../../context/MenuContext";
import HeroImage from "../../assets/Hero.png";
import "./Home.css";

const Home = () => {
  const { isMenuOpen } = useContext(MenuContext);
  return (
    <>
      <div
        className={`home component-content-container ${
          isMenuOpen ? "content-container-menu-open" : ""
        }`}
      >
        <div className="hero-container">
          <div className="hero-text">
            <h1>Happy Welcome to Catching Sunsets</h1>
            <br />
            <p>
              Let us enjoy the magic of sunsets together.
              <br />
              It's like the world is holding its breath for a moment, just to
              show us how beautiful it can be.
            </p>
            <br />
            <img className="hero-image" src={HeroImage} alt="Sunset" />
            <br />
            <p>
              Let us catch some sunsets
              <br />
              😊
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
