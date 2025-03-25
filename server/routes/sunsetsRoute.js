import express from "express";
import {
  addNewSunset,
  deleteSunsetById,
  // disLikeSunsetById,
  getAllSunsets,
  getSunsetById,
  getSunsetsByLocation,
  getUserSunsets,
  // likeSunsetById,
  updateSunsetById,
} from "../controller/sunsetsController.js";
import jwtAuth from "../middelware/jwtAuth.js";

// 1. Create a router
const sunsetsRouter = express.Router();

// 2. defining the endpoint (api/favoritesunsets/all) -> afterwards, go to index.js and tell my App, listen to whatever is coming through
sunsetsRouter.get("/all", getAllSunsets);
sunsetsRouter.get("/all/country/:location", getSunsetsByLocation);
sunsetsRouter.post("/add", jwtAuth, addNewSunset);
sunsetsRouter.get("/mine", jwtAuth, getUserSunsets);
// sunsetsRouter.put("/:id/like", jwtAuth, likeSunsetById);
// sunsetsRouter.delete("/:id/like", jwtAuth, disLikeSunsetById);
sunsetsRouter.get("/:id", getSunsetById);
sunsetsRouter.put("/:id", jwtAuth, updateSunsetById);
sunsetsRouter.delete("/:id", jwtAuth, deleteSunsetById);

export default sunsetsRouter;
