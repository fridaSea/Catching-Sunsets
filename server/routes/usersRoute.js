import express from "express";
import { registerNewUser } from "../controller/usersController.js";

// 1. Create a router
const userRouter = express.Router();

// 2. defining the endpoint (api/favorit and define registerNewUser, then come back and import it here

userRouter.post("/register", registerNewUser);

export default userRouter;
