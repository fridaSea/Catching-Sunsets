import { MenuContext } from "../../context/MenuContext";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthorizationContext";
import { baseUrl } from "../../utilities/urls";
import { ImageUploadOkResponse, NewSunset } from "../../types/customTypes";
import {
  deleteProfileApi,
  getUserSunsetsApi,
  updateProfileApi,
} from "../../api/authorisation";
import { Link, NavLink, useNavigate } from "react-router";
import {
  Alert,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import "./Profile.css";
import SettingsIcon from "@mui/icons-material/Settings";

function Profile() {
  //   location.reload();
  // return false;

  // function refresh() {
  //   setTimeout(function () {
  //     location.reload();
  //   }, 100);
  // }
  // refresh();
  const { isMenuOpen } = useContext(MenuContext);
  const { loggedUser, getUserProfile, updateUser } = useContext(AuthContext);

  const [openSnackbar, setOpenSnackbar] = useState(false); // Zustand für Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Nachricht für Snackbar
  const navigate = useNavigate();

  const [sunsets, setSunsets] = useState<NewSunset[]>([]);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (loggedUser === null) {
      getUserProfile();
    }
  }, [loggedUser, getUserProfile]);
  // REVIEW why putting getUserProfile in the dependency array? what behaviour would you expect with it?

  const [selectedFile, setSelectedFile] = useState<File | string>("");

  const handleAttachFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target :>> ", e);
    const file = e.target.files?.[0];
    if (file instanceof File) {
      console.log("Selected File set");
      setSelectedFile(file);
    }
  };

  const handleImageUpload = async () => {
    console.log("selectedFile :>> ", selectedFile);
    const formdata = new FormData();
    formdata.append("image", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        `${baseUrl}/api/image/upload`,
        requestOptions
      );

      const result = (await response.json()) as ImageUploadOkResponse;
      return result.imgUrl;

      console.log("result :>> ", result, loggedUser);
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  // CHANGE USERNAME
  // const [newUsername, setNewUsername] = useState<string>(
  //   loggedUser?.username || ""
  // );

  // const handleUsernameChange = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const formdata = new FormData(e.target as HTMLFormElement);
  //   const userNameUpdate: string =
  //     (formdata.get("newUsername") as string) || loggedUser?.username;

  //   await updateProfileApi({
  //     id: loggedUser.id,
  //     img: loggedUser.img,
  //     email: loggedUser.email,
  //     username: userNameUpdate,
  //   });

  //   updateUser({
  //     ...loggedUser,
  //     username: userNameUpdate,
  //   });
  // };

  // CHANGE Email
  // const [newEmail, setNewEmail] = useState<string>(loggedUser?.password || "");

  // const handleEmailChange = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const formdata = new FormData(e.target as HTMLFormElement);
  //   const emailUpdate: string =
  //     (formdata.get("newEmail") as string) || loggedUser?.email;

  //   await updateProfileApi({
  //     id: loggedUser.id,
  //     img: loggedUser.img,
  //     username: loggedUser.username,
  //     email: emailUpdate,
  //   });

  //   updateUser({
  //     ...loggedUser,
  //     email: emailUpdate,
  //   });
  // };

  {
    /* CHANGE USERNAME & EMAIL  */
  }
  // const [newUsername, setNewUsername] = useState<string>(
  //   loggedUser?.username || ""
  // );

  // const handleEmailChange = async (newEmail: string) => {
  //   // Prüfen, ob die neue E-Mail mit der aktuellen E-Mail des Nutzers übereinstimmt
  //   if (newEmail === loggedUser.email) {
  //     // Zeige eine Fehlermeldung, wenn die E-Mail die gleiche ist
  //     alert("Die E-Mail-Adresse ist bereits aktuell.");
  //   } else {
  //     // Ansonsten, setze die neue E-Mail-Adresse
  //     const updatedUser = { ...loggedUser, email: newEmail };
  //     await updateProfileApi(updatedUser);
  //     updateUser(updatedUser);
  //     console.log("Profil erfolgreich aktualisiert", updatedUser);
  //   }
  // };

  const handleUserChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imageUrl = await handleImageUpload();

    const formdata = new FormData(e.target as HTMLFormElement);

    const emailUpdate: string =
      (formdata.get("newEmail") as string) || loggedUser?.email;

    const userNameUpdate: string =
      (formdata.get("newUsername") as string) || loggedUser?.username;

    await updateProfileApi({
      id: loggedUser.id,
      img: imageUrl,
      username: userNameUpdate,
      email: emailUpdate,
    });

    updateUser({
      ...loggedUser,
      email: emailUpdate,
      username: userNameUpdate,
      img: imageUrl,
    });
    try {
      setSnackbarMessage("Profil updated successfully!");
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (error) {
      setSnackbarMessage("Failed to update Profile!");
      setOpenSnackbar(true);
    }
  };

  const handleUserDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    deleteProfileApi(loggedUser.id);
    try {
      setSnackbarMessage("Userprofil deleted successfully!");
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/sunsets");
      }, 1500);
    } catch (error) {
      setSnackbarMessage("Failed to delete Profile!");
      setOpenSnackbar(true);
    }
  };

  // TO DO - ERROR HANDLING ??
  useEffect(() => {
    const fetchUserSunsets = async () => {
      const sunsets = await getUserSunsetsApi();
      setSunsets(sunsets);
    };
    fetchUserSunsets();
  }, []);

  return (
    <div
      className={`profile component-content-container ${
        isMenuOpen ? "content-container-menu-open" : ""
      }`}
    >
      <h1>Your Profile</h1>

      <br />

      <div>
        {loggedUser && (
          <div>
            <h3>Hi {loggedUser.username}</h3>

            <div>
              <img
                className="avatar-img"
                src={loggedUser.img ? loggedUser.img : null}
                alt={`Avatar image of user ${loggedUser.username}`}
              />
            </div>

            <br />
            <p>E-Mail: {loggedUser.email}</p>
            <p>Username: {loggedUser.username}</p>

            <br />
            {/* Image Upload */}
            <h2>Change your Profile Informations</h2>
            {/* CHANGE USERNAME & EMAIL  */}
            <div>
              <form onSubmit={handleUserChange}>
                <input
                  type="file"
                  name="imageupload"
                  id="image-input"
                  // accept="image/*"
                  onChange={handleAttachFile}
                  aria-label="Uploade your Profil Image"
                />
                <br />
                <input
                  type="text"
                  name="newUsername"
                  id="newUsername"
                  defaultValue={loggedUser.username}
                  aria-label="Update your username"
                />
                <br />
                {/* <input
                  type="email"
                  name="newEmail"
                  id="newEmail"
                  defaultValue={loggedUser.email}
                />
                <br /> */}

                <button type="submit" className="button">
                  Save
                </button>
              </form>
            </div>

            {/* Change Username */}
            {/* <div>
              <p>Change your Username</p>
              <div>
                <form onSubmit={handleUsernameChange}>
                  <input
                    type="text"
                    name="newUsername"
                    id="newUsername"
                    defaultValue={loggedUser.username}
                  />
                  <br />
                  <button type="submit">Change Username</button>
                </form>
              </div>
            </div> */}

            {/* Change EMAIL */}
            {/* <div>
              <p>Change your Email</p>
              <div>
                <form onSubmit={handleEmailChange}>
                  <input
                    type="text"
                    name="newEmail"
                    id="newEmail"
                    defaultValue={loggedUser.email}
                  />
                  <br />
                  <button type="submit">Change Email</button>
                </form>
              </div>
            </div> */}
            <br />
            <hr />
            <h2>Delete your Account</h2>
            <button onClick={handleUserDelete} className="button">
              Delete Account
            </button>
          </div>
        )}
        <br />
        <hr />
        <div>
          <h2>Your own Sunsets</h2>
        </div>

        {/* DISPLAYING Users Sunsets */}
        {sunsets && sunsets.length > 0 ? (
          <Grid container spacing={2}>
            {sunsets.map((sunset) => (
              <Grid
                //size={{ xs: 12, sm: 6, md: 3, lg: 2 }}
                size={{ xs: 12, sm: 6, md: 4 }}
                key={sunset.id}
                className="card-container"
              >
                <Card className="card">
                  {/* Card Media for image */}
                  <NavLink
                    to={`/sunsets/${sunset._id}`}
                    // key={index}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={sunset.img} //
                      alt={`Sunset image of user with the username ${loggedUser.username}`}
                    />
                  </NavLink>
                  {/* Card Content */}
                  <CardContent>
                    <Typography variant="body2" className="no-wrap">
                      {sunset.country}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {/* Edit/Update-Button nur anzeigen, wenn der Benutzer der Ersteller ist */}
                    {loggedUser &&
                      sunset.ownerUserId &&
                      loggedUser.id === sunset.ownerUserId && (
                        <IconButton
                          className="icon"
                          aria-label="Button to get to the update sunset page"
                        >
                          <Link to={`/sunsets/${sunset._id}/update`}>
                            <SettingsIcon aria-label="Button to get to the update sunset page" />
                          </Link>
                        </IconButton>
                      )}

                    {/* <IconButton className="icon" aria-label="update">
                      <Link to={`/sunsets/${sunset.id}/update`}>
                        <SettingsIcon />
                      </Link>
                    </IconButton> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <p>You haven't uploaded any sunsets yet.</p>
        )}

        {/* {sunsets && sunsets.length === 0 ? (
          <p>You haven't uploaded any sunsets yet.</p>
        ) : (
          <div className="sunset-gallery">
            {sunsets.map((sunset) => (
              <div key={sunset.id} className="sunset-item">
                <img
                  src={sunset.img}
                  // alt={sunset.title}
                  alt={`Sunseg image of user ${loggedUser.username}`}
                  style={{ width: "150px", height: "auto" }}
                />
                <h3>{sunset.country}</h3>
                <p>{sunset.description}</p>
              </div>
            ))}
          </div>
        )} */}

        {/* Snackbar für Bestätigungsmeldungen */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000} // Dauer für die Anzeige der Snackbar
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarMessage.includes("Failed") ? "error" : "success"}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default Profile;
