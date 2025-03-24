import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { MenuContext } from "../../context/MenuContext";
import { createSunsetApi } from "../../api/sunset";
import { NavLink, useNavigate } from "react-router";
import "./AddSunset.css";
import { baseUrl } from "../../utilities/urls";
import { SunsetImageUploadOkResponse } from "../../types/customTypes";
import { uploadNewImageApi } from "../../api/image";
import { AuthContext } from "../../context/AuthorizationContext";
import { Alert, Snackbar } from "@mui/material";

function AddSunset() {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  const { loggedUser } = useContext(AuthContext);
  // REVIEW the variables and handler for the snackbar are repeated in several components. Maybe an snackbar context could've been useful?
  const [openSnackbar, setOpenSnackbar] = useState(false); // Zustand für Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Nachricht für Snackbar
  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const [selectedFile, setSelectedFile] = useState<File>(null);
  const [newSunset, setNewSunset] = useState<{
    img: string;
    country: string;
    description: string;
    ownerUserId: string;
    id: string;
  }>({
    img: "",
    country: "",
    description: "",
    ownerUserId: "",
    id: "",
  });

  const handleAttachFile = (e: ChangeEvent<HTMLInputElement>) => {
    //console.log("e.target :>> ", e);
    const file = e.target.files?.[0];
    if (file instanceof File) {
      //console.log("Selected File set");
      setSelectedFile(file);
    }
  };

  const submitNewSunset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) {
      setSnackbarMessage("Please select an image!");
      setOpenSnackbar(true);
      return;
    }

    // Bild wird hochgeladen
    const uploadedSunsetImage = await uploadNewImageApi(selectedFile);
    if (!uploadedSunsetImage.imgUrl) {
      //console.log("img couldn't be uploaded");
      setSnackbarMessage("Image upload failed!");
      setOpenSnackbar(true);
      return;
    }
    setNewSunset({ ...newSunset, img: uploadedSunsetImage.imgUrl });

    try {
      const uploadedSunset = await createSunsetApi({
        country: newSunset.country,
        description: newSunset.description,
        img: uploadedSunsetImage.imgUrl,
        // ownerUserId: loggedUser.id,
        //NEW 19.03
        //sunsetOwner: loggedUser.id,
        ownerUserId: loggedUser.id,
        id: newSunset.id,
      });
      // if (uploadedSunsetImage.imgUrl) {

      if (uploadedSunset.message === "New Sunset Post added successfully") {
        setSnackbarMessage("Sunset posted successfully!");
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/sunsets"); // Nach erfolgreichem Upload weiter zur Sunset-Liste
        }, 2000);
        //     navigate("/sunsets");
        //     console.log("result/ Sunset upload sueccessfully :>> ", uploadedSunset);
        //   }
        //   if (uploadedSunset.message !== "New Sunset Post added successfully") {
        //     alert("couldn't upload the sunset");
        //   }
        //   // navigate("/sunsets");
      } else {
        setSnackbarMessage("Couldn't upload the sunset!");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage("Error posting sunset!");
      setOpenSnackbar(true);
    }

    // console.log("result before submitting sunset :>> ", result);
    console.log("uploadedSunsetImage :>> ", uploadedSunsetImage);
  };

  // New Sunset Image

  const handleNewSunsetInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewSunset({ ...newSunset!, [e.target.name]: e.target.value });
    //console.log("e.target :>> ", e.target.name, e.target.id, newSunset);
  };

  // Update Post
  //const [updatedSunset, setUpdatedSunset] = useState
  // const handleSunsetChange = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const formdata = new FormData(e.target as HTMLFormElement);

  //   const countryUpdate: string =
  //     (formdata.get("newCountry") as string) || newSunset?.country;
  //   const descriptionUpdate: string =
  //     (formdata.get("newDescription") as string) || loggedUser?.description;

  //   await updateSunsetApi({
  //     id: loggedUser.id,
  //     //img: loggedUser.img,
  //     username: userNameUpdate,
  //     email: emailUpdate,
  //   });

  //   updateUser({
  //     ...loggedUser,
  //     email: emailUpdate,
  //     username: userNameUpdate,
  //   });
  // };

  return (
    <div
      className={`profile component-content-container ${
        isMenuOpen ? "content-container-menu-open" : ""
      }`}
    >
      <h2>Post something new</h2>
      {/* Image Upload  */}
      <div>
        <h3>Choose your Sunset Picture</h3>
        <form
          // onSubmit={handleImageUpload}
          onSubmit={submitNewSunset}
        >
          <input
            type="file"
            id="username-input"
            accept="image/*"
            onChange={handleAttachFile}
          />
          <br />
          <input
            type="text"
            id="country-input"
            name="country"
            placeholder="country"
            // pattern="^[A-Za-z0-9]{3,16}$"
            // allow the user to make use of any characters apart from special characters and whitespaces
            onChange={handleNewSunsetInputChange}
            // onBlur={handleBlur}
          />
          <br />
          <input
            type="text"
            id="description-input"
            name="description"
            placeholder="description"
            // pattern="^[A-Za-z0-9]{3,16}$"
            // allow the user to make use of any characters apart from special characters and whitespaces
            onChange={handleNewSunsetInputChange}
            // onBlur={handleBlur}
          />
          <br />
          <button>Save</button>
          {/* TO DO - If Sunset upload sucessfully -> redirect to Detais or Listing Page */}
        </form>
      </div>
      <div>
        <NavLink to="/sunsets">
          <button className="button">Back to the Sunset Magic</button>
        </NavLink>
      </div>
      {/* Snackbar für Bestätigungsmeldungen */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Dauer für die Anzeige der Snackbar
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AddSunset;
