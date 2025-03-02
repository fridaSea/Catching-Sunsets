import { useContext } from "react";
import Hero from "../../src/assets/Hero.jpeg";
import { MenuContext } from "../../context/MenuContext";

const Home = () => {
  const { isMenuOpen } = useContext(MenuContext);
  return (
    <>
      {/* <img src={Hero} alt="Sunset Picture" /> */}
      <div
        className={`component-content-container ${
          isMenuOpen ? "content-container-menu-open" : ""
        }`}
      >
        <h1>Happy Welcome :) </h1>
        <p> Here you can find a lot of interesting content.</p>
      </div>
    </>
  );
};

export default Home;
