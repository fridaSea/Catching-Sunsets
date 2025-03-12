import { MenuContext } from "../../context/MenuContext";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthorizationContext";
import { baseUrl } from "../../utilities/urls";
import {
  ImageUploadOkResponse,
  UpdateOkResponse,
} from "../../types/customTypes";
import { updateProfileApi } from "../../api/authorisation";

function Profile() {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  const { loggedUser, updateUser } = useContext(AuthContext);
  //console.log('loggedUser :>> ', loggedUser);
  // console.log('result.user :>> ', result.user)

  // IMAGE UPLOAD - KANN ICH DAS IN EINE CONTEXT PACKEN??
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const handleAttachFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target :>> ", e);
    const file = e.target.files?.[0];
    if (file instanceof File) {
      console.log("Selected File set");
      setSelectedFile(file);
    }
  };
  const handleImageUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("selectedFile :>> ", selectedFile);
    // Code from Postman for the Image Upload
    const formdata = new FormData();
    formdata.append("image", selectedFile);

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
      const userUpdate = { ...loggedUser!, img: result.imgUrl };
      await updateProfileApi(userUpdate);
      updateUser(userUpdate);

      console.log("result :>> ", result, loggedUser);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  // CHANGE USERNAME
  const [newUsername, setNewUsername] = useState<string>(
    loggedUser?.username || ""
  );

  const handleUsernameChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formdata = new FormData();
    formdata.append("username", newUsername);

    if (newUsername && newUsername !== loggedUser?.username) {
      const userUpdate = { ...loggedUser, username: newUsername };
    }

    const requestOptions = {
      method: "PUT",
      body: formdata,
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await fetch(
        `${baseUrl}/api/users/profile`,
        requestOptions
      );

      if (response.ok) {
        const updateUser = await response.json();
        updateUser(updatedUser);
        console.log("User sucessfully updated :>> ", updatedUser);
      } else {
        console.log("Error while updating the name of the user");
      }
      // const result = (await response.json()) as UpdateOkResponse;
      // console.log("loggedUser :>> ", loggedUser);

      // await updateProfileApi(userUpdate);
      // updateUser(userUpdate);

      // console.log("result :>> ", result, loggedUser);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <div
      className={`profile component-content-container ${
        isMenuOpen ? "content-container-menu-open" : ""
      }`}
    >
      <h1>Your Profile</h1>

      <br />

      {/* if we have a user  */}
      <div>
        {loggedUser && (
          <div>
            <h2>Hi {loggedUser.username}</h2>
            {/* <img 
          src={loggedUser.img} 
          alt="users profile pic" 
          style={{width:"150px", height:"auto"}}/> */}

            <div>
              <img
                src={loggedUser.img ? loggedUser.img : null}
                alt={`Avatar image of user ${loggedUser.username}`}
                style={{ width: "150px", height: "auto" }}
              />
            </div>

            {/* Image Upload */}
            <p>Change your Password:</p>
            <div>
              <form onSubmit={handleImageUpload}>
                <input
                  type="file"
                  name="username"
                  id="username-input"
                  // accept="image/*"
                  onChange={handleAttachFile}
                />
                <br />
                <button>Upload Image</button>
              </form>
            </div>

            <br />
            <p>E-Mail: {loggedUser.email}</p>
            <p>Username: {loggedUser.username}</p>

            <br />
            {/* Change Username */}
            <div>
              <p>Change your Username</p>
              <div>
                <form onSubmit={handleUsernameChange}>
                  <input
                    type="text"
                    // name="image"
                    id="newUsername"
                    // accept="image/*"
                    onChange={handleAttachFile}
                  />
                  <br />
                  <button>Change Username</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
