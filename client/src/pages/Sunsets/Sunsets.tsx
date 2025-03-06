import React, { useContext } from "react";
import { MenuContext } from "../../context/MenuContext";

function Sunsets() {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  return (
    <div
      className={`component-content-container ${
        isMenuOpen ? "content-container-menu-open" : ""
      }`}
    >
      <h1>List of Sunsets</h1>
    </div>
  );
}

export default Sunsets;
