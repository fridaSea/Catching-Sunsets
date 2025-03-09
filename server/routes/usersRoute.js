import express from "express";
import {
  getProfile,
  loginNewUser,
  registerNewUser,
} from "../controller/usersController.js";
import jwtAuth from "../middelware/jwtAuth.js";

// 1. Create a router
const userRouter = express.Router();

// 2. defining the endpoint (api/favorit and define registerNewUser, then come back and import it here

userRouter.post("/register", registerNewUser);
userRouter.post("/login", loginNewUser);
userRouter.get("/profile", jwtAuth, getProfile);

export default userRouter;
