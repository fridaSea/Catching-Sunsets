import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSunsetApi } from "../../api/sunset";
import { NewSunset } from "../../types/customTypes";
import { MenuContext } from "../../context/MenuContext";

function DetailSunset() {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);
  const { id } = useParams();
  const [sunset, setSunset] = useState<NewSunset | null>(null);

  const getSunset = async () => {
    getSunsetApi(id).then(
      (sunset) => {
        setSunset(sunset);
      },
      (error) => {
        console.log("error :>> ", error);
      }
    );
  };

  useEffect(() => {
    getSunset();
  });

  return (
    <div
      className={`profile component-content-container ${
        isMenuOpen ? "content-container-menu-open" : ""
      }`}
    >
      {sunset?.description}
    </div>
  );
}

export default DetailSunset;
