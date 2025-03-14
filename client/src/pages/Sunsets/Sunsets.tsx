import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { MenuContext } from "../../context/MenuContext";
import { baseUrl } from "../../utilities/urls";
import useFetch from "../../hooks/useFetch";
import { ImageUploadOkResponse } from "../../types/customTypes";
import { updateProfileApi } from "../../api/authorisation";
import { AuthContext } from "../../context/AuthorizationContext";
import { Link, NavLink } from "react-router";
import "./Sunsets.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Sunsets() {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);

  // Zustand für gespeicherte Daten
  // const SunsetURL: string = `${baseUrl}/api/sunsets/all`;
  const [sunsets, setSunsets] = useState<any[]>([]); // anpassen, je nach Struktur der API-Daten
  const [error, setError] = useState<string | null>(null);

  const [data, setData] = useState<T | null>(null);

  //useFetch(`${baseUrl}/api/sunsets/all`);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseUrl}/api/sunsets/all`);
      const result = (await response.json()) as T;
      console.log("result:>>", result);
      setData(result);
      console.log("data :>> ", data);
    };
    fetchData();
  }, []);

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

      {/* DISPLAYING CARDS */}
      <Grid2 container spacing={2}>
        {data && data.allSunsets && data.allSunsets.length > 0 ? (
          data.allSunsets.map((sunset, index: number) => (
            <Grid2
              item
              xs={12}
              sm={6}
              md={4}
              key={sunset._id}
              className="card-container"
            >
              <Card className="card">
                {/* Card Media for image */}
                <CardMedia
                  component="img"
                  height="140"
                  image={sunset.img || "defaultImage.jpg"} // Fallback image if sunset.img is empty
                  alt={`Sunset in ${sunset.country}`}
                />

                {/* Card Content */}
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {sunset.description}
                  </Typography>
                  <Typography gutterBottom variant="body2" component="div">
                    {sunset.country}
                  </Typography>
                </CardContent>

                {/* Card Actions */}
                <CardActions>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <Button size="small">
                    <Link to={`/api/sunsets/${sunset._id}`} key={index}>
                      Learn More
                    </Link>
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
          ))
        ) : (
          <p>No sunsets available</p>
        )}
      </Grid2>

      <br />
      <div>
        <h3>Post a new picture</h3>
        {/* <div>
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
        </div> */}
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
