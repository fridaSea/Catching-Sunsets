import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { deleteSunsetApi, getSunsetApi } from "../../api/sunset";
import { NewSunset } from "../../types/customTypes";
import { MenuContext } from "../../context/MenuContext";
import { Alert, Snackbar } from "@mui/material";
import "./DetailSunset.css";
import { updateSunsetApi } from "../../api/sunset";
import { AuthContext } from "../../context/AuthorizationContext";

function DetailSunset() {
  const [openSnackbar, setOpenSnackbar] = useState(false); // Zustand für Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Nachricht für Snackbar
  const navigate = useNavigate();
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  const { id } = useParams();
  const [sunset, setSunset] = useState<NewSunset | null>(null);
  const { updateSunset, loggedUser } = useContext(AuthContext);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const getSunset = async () => {
    getSunsetApi(id).then(
      (sunset) => {
        setSunset(sunset);
        //console.log("sunset :>> ", sunset);
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

    const formdata = new FormData(e.target as HTMLFormElement);

    const countryUpdate: string =
      (formdata.get("newCountry") as string) || sunset?.country;

    const descriptionUpdate: string =
      (formdata.get("newDescription") as string) || sunset?.description;
    try {
      await updateSunsetApi({
        id: sunset.id,
        imgUrl: sunset?.img,
        country: countryUpdate,
        description: descriptionUpdate,
      });

      updateSunset({
        ...sunset,
        country: countryUpdate,
        description: descriptionUpdate,
      });

      setSnackbarMessage("Sunset updated successfully!");
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/sunsets");
      }, 1500);
    } catch (error) {
      setSnackbarMessage("Failed to update Sunset!");
      setOpenSnackbar(true);
    }
  };

  const handleSunsetDelete = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      await deleteSunsetApi(sunset.id);
      setSnackbarMessage("Sunset deleted successfully!");
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/sunsets");
      }, 1500);
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
      <button
        className="icon-arrow-left2"
        onClick={() => navigate(-1)}
      ></button>
      <br />
      <div className="card-container">
        <img className="card-image" src={sunset?.img} width={"50%"}></img>
        <br />
        <p className="bold">Country:</p>
        <p> {sunset?.country}</p>
        <p className="bold">Description: </p>
        <p>{sunset?.description}</p>
      </div>
      <br />
      {/* <div>
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
      </div> */}
      {loggedUser && sunset && loggedUser.id === sunset.ownerUserId && (
        <button className="button" onClick={handleSunsetDelete}>
          Delete Sunset
        </button>
      )}
      {/* <button onClick={handleSunsetDelete}> Delete Sunset</button> */}
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
  );
}

export default DetailSunset;
