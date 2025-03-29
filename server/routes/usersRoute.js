import express from "express";
import {
  deleteUser,
  getAllUsers,
  getProfile,
  imageUpload,
  loginNewUser,
  registerNewUser,
  updateUser,
} from "../controller/usersController.js";
import jwtAuth from "../middelware/jwtAuth.js";
import multerUpload from "../middelware/multer.js";

// 1. Create a router
const userRouter = express.Router();

// 2. defining the endpoint (api/favorit and define registerNewUser, then come back and import it here
userRouter.get("/all", getAllUsers);
userRouter.post("/register", registerNewUser);
userRouter.post("/login", loginNewUser);
userRouter.get("/profile", jwtAuth, getProfile);
userRouter.put("/profile", jwtAuth, updateUser); //REVIEW As commented before, you can find more information about HTTP methods here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods
userRouter.delete("/profile", jwtAuth, deleteUser);

// TODO Refeactor code in react app to use imageRoute to upload a new image and then remove this
userRouter.post("/uploadImage", multerUpload.single("image"), imageUpload);

export default userRouter;
