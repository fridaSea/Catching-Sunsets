import express from "express";
import colors from "colors";
import cors from "cors";
import testRouter from "./routes/testRoute.js";
import * as dotenv from "dotenv";
dotenv.config(); // Initialise dotenv
import mongoose from "mongoose";
import sunsetsRouter from "./routes/sunsetsRoute.js";
import userRouter from "./routes/usersRoute.js";
import passport from "passport";
import passportStrategy from "./config/passportConfig.js";
import cloudinaryConfig from "./config/cloudinaryConfig.js";
import imageRouter from "./routes/imageRoute.js";

const app = express();

const port = process.env.PORT || 4004;
// we define on which port our backend is going to run. you can put any number here between 4000 and 6000.
// process.env.PORT- it`s alreday ready for when we deploy it. Local it runs on 4444, but we don`t now on which port it will run when we deployed it

function addMiddleWares() {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  // console.log("process.env.MONGODB_URI :>> ".yellow, process.env.MONGODB_URI);
  cloudinaryConfig();
  passport.initialize();
  passport.use(passportStrategy);
}

function startServer() {
  app.listen(port, () => {
    console.log(`Server is running on  port ${port}`.bgGreen);
    //   console.log("Server is running on " + port + "port".bgGreen);
  });
}

function loadRoutes() {
  app.use("/api/", testRouter); //REVIEW do not forget to get rid of the test route after the tests are done
  app.use("/api/image", imageRouter);
  app.use("/api/sunsets", sunsetsRouter);
  app.use("/api/users", userRouter);
}

async function DBConnection() {
  try {
    const mongoDBConnection = await mongoose.connect(process.env.MONGODB_URI);
    if (mongoDBConnection) {
      console.log("Connected with MongoDB".blue);
    }
  } catch (error) {
    console.log("error connecting to MONGODB :>> ".red, error);
  }
}

// async function controller () {
//   await DBConnection();

//   addMiddleWares();
//   loadRoutes();
//   startServer();
// }
// controller()

// IIFE (Immediately Invoked Function Expression) () ()
(async function () {
  await DBConnection();

  addMiddleWares();
  loadRoutes();
  startServer();
})();
