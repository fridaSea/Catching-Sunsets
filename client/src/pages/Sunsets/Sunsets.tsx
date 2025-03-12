import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { MenuContext } from "../../context/MenuContext";
import { baseUrl } from "../../utilities/urls";
import useFetch from "../../hooks/useFetch";
import { ImageUploadOkResponse } from "../../types/customTypes";
import { updateProfileApi } from "../../api/authorisation";
import { AuthContext } from "../../context/AuthorizationContext";
import { NavLink } from "react-router";
import "./Sunsets.css";

function Sunsets() {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  const { loggedUser, updateUser } = useContext(AuthContext);
  // Image Upload

  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const handleAttachFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target :>> ", e);
    const file = e.target.files?.[0];
    if (file instanceof File) {
      console.log("Selected File set");
      setSelectedFile(file);
    }
  };

  // Upload New Post
  // const [textContent, setTextContent] = useState<string>("");

  const handleImageUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("selectedFile :>> ", selectedFile);
    // Code from Postman for the Image Upload
    const formdata = new FormData();
    formdata.append("image", selectedFile);
    // formdata.append("description", textContent);
    // formdata.append("country", textContent);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        // `${baseUrl}/api/users/uploadImage`,
        `${baseUrl}/api/image/upload`,
        requestOptions
      );

      const result = (await response.json()) as ImageUploadOkResponse;
      const sunsetUpdate =
        // const userUpdate = { ...loggedUser!, img: result.imgUrl };
        // await updateProfileApi(userUpdate);
        // updateUser(userUpdate);

        console.log("result :>> ", result, loggedUser);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <div
      className={`sunset component-content-container ${
        isMenuOpen ? "content-container-menu-open" : ""
      }`}
    >
      <div>
        <h1>List of Sunsets</h1>
        <p>sunset pictures and places</p>
      </div>
      <br />
      <div>
        <h3>Post a new picture</h3>
        <div>
          <form onSubmit={handleImageUpload}>
            <label>Choose your Image:</label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleAttachFile}
            />
            <button>Upload Image</button>
            <br />

            <div>
              <label>Country:</label>
              <input
                type="text"
                // value={textContent}
                // onChange={handleTextChange}
                placeholder="Enter Country"
              />
            </div>

            <div>
              <label>Description:</label>
              <input
                type="text"
                // value={textContent}
                // onChange={handleTextChange}
                placeholder="Enter description"
              />
            </div>
            <button type="submit" className="button">
              Post
            </button>
          </form>
        </div>
        {/* <div>
          <img
            src={loggedUser.img ? loggedUser.img : null}
            alt={`image of a sunset`}
            style={{ width: "150px", height: "auto" }}
          />
        </div> */}
      </div>
      <br />

      {/* Add new post/ picture */}
      {/* <p>Post a new sunset picture</p>
      <p>
        <NavLink to="/add">
          Click <span className="icon icon-camera5"></span> here
        </NavLink>
      </p> */}
    </div>
  );
}

export default Sunsets;
