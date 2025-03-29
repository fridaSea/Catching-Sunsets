import "./AddSunset.css";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { MenuContext } from "../../context/MenuContext";
import { createSunsetApi } from "../../api/sunset";
import { useNavigate } from "react-router";
import { uploadNewImageApi } from "../../api/image";
import { AuthContext } from "../../context/AuthorizationContext";
import { Alert, Snackbar } from "@mui/material";

function AddSunset() {
  const { isMenuOpen } = useContext(MenuContext);
  const { loggedUser } = useContext(AuthContext);
  // REVIEW the variables and handler for the snackbar are repeated in several components. Maybe an snackbar context could've been useful?
  const [openSnackbar, setOpenSnackbar] = useState(false); // Zustand für Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Nachricht für Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info"
  >("info"); // Severity für Snackbar
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
      setSnackbarSeverity("info"); // Info severity für die Nachricht
      setOpenSnackbar(true);
      return;
    }

    const uploadedSunsetImage = await uploadNewImageApi(selectedFile);
    if (!uploadedSunsetImage.imgUrl) {
      //console.log("img couldn't be uploaded");
      setSnackbarMessage("Image upload failed!");
      setSnackbarSeverity("error"); // Error severity für diese Nachricht
      setOpenSnackbar(true);
      return;
    }
    setNewSunset({ ...newSunset, img: uploadedSunsetImage.imgUrl });

    try {
      const uploadedSunset = await createSunsetApi({
        country: newSunset.country,
        description: newSunset.description,
        img: uploadedSunsetImage.imgUrl,
        ownerUserId: loggedUser.id,
        id: newSunset.id,
      });
      // if (uploadedSunsetImage.imgUrl) {

      if (uploadedSunset.message === "New Sunset Post added successfully") {
        setSnackbarMessage("Sunset posted successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/sunsets");
        }, 2000);
      } else {
        setSnackbarMessage("Failed to upload the sunset!");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage("Failed posting sunset!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }

    console.log("uploadedSunsetImage :>> ", uploadedSunsetImage);
  };

  // New Sunset Image
  const handleNewSunsetInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewSunset({ ...newSunset!, [e.target.name]: e.target.value });
    //console.log("e.target :>> ", e.target.name, e.target.id, newSunset);
  };

  const handleResizeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto"; // Setzt die Höhe zurück
    textarea.style.height = `${textarea.scrollHeight}px`; // Setzt die Höhe auf die Scrollhöhe
  };

  return (
    <div
      className={`add-sunset profile component-content-container ${
        isMenuOpen ? "content-container-menu-open" : ""
      }`}
    >
      <button
        className="icon-arrow-left2"
        onClick={() => navigate(-1)}
      ></button>
      <h1>Create a new post</h1>
      <div className="card-container">
        <h2>Choose your Sunset Picture</h2>
        <form onSubmit={submitNewSunset}>
          <div className="card-image">
            <input
              type="file"
              id="image-input"
              accept="image/*"
              onChange={handleAttachFile}
              aria-label="Upload your profil picture here"
            />
          </div>

          <div className="card-input">
            <h2>Choose your Sunset Information</h2>
            <p>Country: </p>
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

            <p>Description: </p>
            <textarea
              id="description-input"
              name="description"
              placeholder="description"
              rows={4} // Startgröße (4 Zeilen hoch)
              onChange={handleNewSunsetInputChange}
              onInput={handleResizeTextarea} // Dynamisch anpassen der Größe beim Tippen
              // onBlur={handleBlur}
            />
          </div>
          <button className="button">Save a new sunset</button>
        </form>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Dauer für die Anzeige der Snackbar
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AddSunset;
