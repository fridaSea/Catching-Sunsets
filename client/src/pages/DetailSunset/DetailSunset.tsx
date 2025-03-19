import { FormEvent, useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import { deleteSunsetApi, getSunsetApi } from "../../api/sunset";
import { NewSunset } from "../../types/customTypes";
import { MenuContext } from "../../context/MenuContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Alert, IconButton, Snackbar } from "@mui/material";
import "./DetailSunset.css";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { updateSunsetApi } from "../../api/sunset";
import { AuthContext } from "../../context/AuthorizationContext";

function DetailSunset() {
  const [openSnackbar, setOpenSnackbar] = useState(false); // Zustand für Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Nachricht für Snackbar
  const navigate = useNavigate();
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  const { id } = useParams();
  const [sunset, setSunset] = useState<NewSunset | null>(null);
  const { updateSunset } = useContext(AuthContext);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const getSunset = async () => {
    getSunsetApi(id).then(
      (sunset) => {
        setSunset(sunset);
        console.log("sunset :>> ", sunset);
      },
      (error) => {
        console.log("error :>> ", error);
      }
    );
  };

  useEffect(() => {
    getSunset();
  }, []);

  const handleUpdateSunset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const [sunset, setSunset] = useState<NewSunset | null>(null);

    const formdata = new FormData(e.target as HTMLFormElement);

    const countryUpdate: string =
      (formdata.get("newCountry") as string) || sunset?.country;

    const descriptionUpdate: string =
      (formdata.get("newDescription") as string) || sunset?.description;
    try {
      await updateSunsetApi({
        id: sunset.id,
        //NEW 19.03
        imgUrl: sunset?.img,
        country: countryUpdate,
        description: descriptionUpdate,
      });

      updateSunset({
        ...sunset,
        country: countryUpdate,
        description: descriptionUpdate,
      });

      // Erfolgreiche Update-Bestätigung
      setSnackbarMessage("Sunset updated successfully!");
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/sunsets"); // Zur Liste der Sunsets navigieren
      }, 1500); // Wartezeit für Snackbar
    } catch (error) {
      setSnackbarMessage("Failed to update Sunset!");
      setOpenSnackbar(true);
    }
  };

  // const handleSunsetDelete = async (e: MouseEvent) => {
  //   e.preventDefault();
  //   deleteSunsetApi(sunset.id);
  // };
  //NEW 19.03
  const handleSunsetDelete = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      await deleteSunsetApi(sunset.id);
      //navigate("/sunsets"); // Navigate to list of sunsets or another appropriate page
      // Erfolgreiche Update-Bestätigung
      setSnackbarMessage("Sunset deleted successfully!");
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/sunsets"); // Zur Liste der Sunsets navigieren
      }, 1500); // Wartezeit für Snackbar
    } catch (error) {
      setSnackbarMessage("Failed to update Sunset!");
      setOpenSnackbar(true);
    }
  };

  return (
    <div
      className={`detail-sunset profile component-content-container ${
        isMenuOpen ? "content-container-menu-open" : ""
      }`}
    >
      <button className="back-button" onClick={() => navigate(-1)}>
        <ArrowBackRoundedIcon />
      </button>
      {/* <div>
        <NavLink to="/sunsets">
          <IconButton className="arrow-back-icon">
            <ArrowBackIcon />
          </IconButton>
        </NavLink>
      </div> */}
      <br />
      <div>
        <img src={sunset?.img} width={"50%"}></img>
        <br />
        {sunset?.country}
        <br />
        {sunset?.description}
      </div>
      <div>
        <p>Change/ Update your Text Inputs</p>
        <form onSubmit={handleUpdateSunset}>
          <p>Country:</p>
          <input
            type="text"
            name="newCountry"
            id="newCountry"
            defaultValue={sunset?.country}
          />
          <br />
          <p>Description:</p>
          <input
            type="text"
            name="newDescription"
            id="newDescription"
            defaultValue={sunset?.description}
          />
          <br />
          <button type="submit">Save</button>
        </form>
      </div>
      <button onClick={handleSunsetDelete}> Delete Sunset</button>

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

export default DetailSunset;
