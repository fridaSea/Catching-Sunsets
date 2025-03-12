import express from "express";
import { imageUpload } from "../controller/usersController.js";
import jwtAuth from "../middelware/jwtAuth.js";
import multerUpload from "../middelware/multer.js";

// 1. Create a router
const imageRouter = express.Router();

// 2. defining the endpoint (api/favorit and define registerNewUser, then come back and import it here
imageRouter.post("/upload", multerUpload.single("image"), imageUpload);

export default imageRouter;
