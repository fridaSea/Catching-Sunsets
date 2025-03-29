import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../../context/MenuContext";
import { baseUrl } from "../../utilities/urls";
import { NavLink } from "react-router";
import "./Sunsets.css";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { NewSunset } from "../../types/customTypes";

function Sunsets() {
  const { isMenuOpen } = useContext(MenuContext);
  const [data, setData] = useState<NewSunset[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Ladeindikator einschalten
      const response = await fetch(`${baseUrl}/api/sunsets/all`);
      const result = await response.json();

      // Extrahiere das 'allSunsets'-Array aus dem Ergebnis
      const sunsets = result.allSunsets as NewSunset[];
      setData(sunsets);
      console.log("result :>> ", result);
      setIsLoading(false); // Ladeindikator ausschalten
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
        <h1>All the Sunset Magic</h1>
      </div>
      <div>
        <NavLink to="/sunsets/add">
          <button className="button">Post a new picture</button>
        </NavLink>
      </div>
      <br />

      {isLoading ? (
        <div className="loading-container">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <Grid container spacing={2}>
          {data && data.length > 0 ? (
            data.map((sunset) => (
              <Grid
                size={{ xs: 12, sm: 6, md: 3, lg: 2 }}
                key={sunset._id}
                className="card-container"
              >
                <Card className="card">
                  <NavLink to={`/sunsets/${sunset._id}`} key={sunset._id}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={sunset.img}
                      alt={`Sunset in ${sunset.country}`}
                    />
                  </NavLink>

                  <CardContent>
                    <Typography gutterBottom variant="body2" component="div">
                      {sunset.country}
                      {/* {sunset._id} */}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    {/* <IconButton className="icon" aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton> */}
                    {/* <Button size="small"></Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <p>No sunsets available</p>
          )}
        </Grid>
      )}
    </div>
  );
}

export default Sunsets;
