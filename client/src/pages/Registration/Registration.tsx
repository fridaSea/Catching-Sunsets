import React, { useContext } from "react";
import { MenuContext } from "../../context/MenuContext";

function Registration() {
  const { isMenuOpen } = useContext(MenuContext);
  return (
    <div
      className={`component-content-container ${
        isMenuOpen ? "content-container-menu-open" : ""
      }`}
    >
      <div>
        <h1>Register now!</h1>
      </div>

      <form>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="E-Mail Adress"
        />
        <input
          type="text"
          id="password"
          name="password"
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Registration;

// modal see: https://www.youtube.com/watch?v=QButPwQ51wQ
