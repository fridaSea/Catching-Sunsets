import express from "express";
import { getAllSunsets } from "../controller/sunsetsController.js";

// 1. Create a router
const sunsetsRouter = express.Router();

// 2. defining the endpoint (api/favoritesunsets/all) -> afterwards, go to index.js and tell my App, listen to whatever is coming through
sunsetsRouter.get("/all", getAllSunsets);

// sunsetsRouter.get("/all", (request, response) => {
//   console.log("I am triggering a test route".bgBlue);
//   response.json("This is a test route.");
// });

// const testRouter = express.Router();
// testRouter.get("/test", (req, res) => {
//     res.send({ msg: "Test route." });
//   });

export default sunsetsRouter;
