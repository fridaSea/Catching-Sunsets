import express from "express";
import {
  addNewSunset,
  getAllSunsets,
  getSunsetById,
  getSunsetsByLocation,
} from "../controller/sunsetsController.js";
import jwtAuth from "../middelware/jwtAuth.js";

// 1. Create a router
const sunsetsRouter = express.Router();

// 2. defining the endpoint (api/favoritesunsets/all) -> afterwards, go to index.js and tell my App, listen to whatever is coming through
sunsetsRouter.get("/all", getAllSunsets);
sunsetsRouter.get("/all/country/:location", getSunsetsByLocation);
sunsetsRouter.post("/add", jwtAuth, addNewSunset);
sunsetsRouter.get("/:id", getSunsetById);
// sunsetsRouter.put("/:id", jwtAuth, updateSunsetById);
// sunsetsRouter.delete("/:id", jwtAuth, deleteSunsetById);

// userRouter.post("/register", registerNewUser);

//TODO implement createSunsetPost which saves an imageURL with meta data (like title, description) into the database
//sunsetsRouter.post("/", createSunsetPost);

// sunsetsRouter.get("/all", (request, response) => {
//   console.log("I am triggering a test route".bgBlue);
//   response.json("This is a test route.");
// });

export default sunsetsRouter;
