import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { NewSunset } from "../../types/customTypes";
import { getSunsetApi, updateSunsetApi } from "../../api/sunset";
import { AuthContext } from "../../context/AuthorizationContext";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { MenuContext } from "../../context/MenuContext";
import "./UpdateSunset.css";

function UpdateSunset() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();
  const { isMenuOpen } = useContext(MenuContext);
  const { id } = useParams();
  const [sunset, setSunset] = useState<NewSunset | null>(null);
  const { updateSunset } = useContext(AuthContext);
  const { loggedUser } = useContext(AuthContext);

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
        navigate("/profile");
      }, 1500);
    } catch (error) {
      setSnackbarMessage("Failed to update Sunset!");
      setOpenSnackbar(true);
    }
  };
  const handleResizeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto"; // Setzt die Höhe zurück
    textarea.style.height = `${textarea.scrollHeight}px`; // Setzt die Höhe auf die Scrollhöhe
  };

  return (
    <div
      className={`update-sunset component-content-container ${
        isMenuOpen ? "content-container-menu-open" : ""
      }`}
    >
      <button
        className="icon icon-arrow-left2"
        onClick={() => navigate(-1)}
      ></button>
      <div className="card-container">
        {loggedUser && sunset && loggedUser.id === sunset.ownerUserId && (
          <div>
            <img src={sunset?.img} className="card-image"></img>
            <h2>Change your text inputs</h2>
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
              {/* <input
                type="text"
                name="newDescription"
                id="newDescription"
                defaultValue={sunset?.description}
              /> */}
              <textarea
                id="description-input"
                name="newDescription"
                placeholder={sunset?.description}
                rows={4} // Startgröße (4 Zeilen hoch)
                //onChange={handleNewSunsetInputChange}

                onInput={handleResizeTextarea} // Dynamisch anpassen der Größe beim Tippen
              />
              <br />
              <button type="submit" className="button">
                Save your changes
              </button>
            </form>
          </div>
        )}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
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

export default UpdateSunset;
