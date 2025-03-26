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
  //app.use(cors()); - it is not needed for deployment, we us the following:
  // console.log("process.env.MONGODB_URI :>> ".yellow, process.env.MONGODB_URI);
  //Using CORS options to secure the origin of the requests
  const allowedOrigins = [
    "http://localhost:5173",
    "http://catching-sunsets.vercel.app/",
    "https://catching-sunsets.vercel.app/",
  ];
  const corsOptions = {
    origin: function (origin, callback) {
      // !origin will allow to accept direct calls to the api , with no heading, e.g. http://localhost:5001/api/cities/all
      //REVIEW[epic=deploy, seq=6] 6- !origin will allow requests with no header (origin===undefined), the direct ones (using directly the server url). This solution will now accept only request from those 2 origins, or with no header.
      //Accepting requests with no header might pose a security threat ...research how convinient the solution is.

      if (allowedOrigins.indexOf(origin) !== -1) {
        // if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };
  app.use(cors(corsOptions));
  //#endregion

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
  app.use("/api/", testRouter);
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
