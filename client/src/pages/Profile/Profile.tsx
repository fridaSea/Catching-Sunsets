import React, { useContext } from "react";
import { Form } from "react-router";
import { MenuContext } from "../../context/MenuContext";

function Profile() {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  return (
    <div
      className={`component-content-container ${
        isMenuOpen ? "content-container-menu-open" : ""
      }`}
    >
      <h1>Your Profile</h1>

      <p>E-Mail: !!dynamisch einfügen!!</p>

      <div>
        <p>Username:</p>
      </div>
      <input type="submit" value="Save"></input>
    </div>
  );
}

export default Profile;
