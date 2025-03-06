import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import UserModel from "../models/usersModel.js";
import * as dotenv from "dotenv";
dotenv.config(); // Initialise dotenv

const jwtOptions = {
  //what this option does: whenever we send the request, we gonna put the token in the header of the request and this method will go to the header and exstract the token
  // we gonna send it as a specific type of token: a Bearer Token
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // we need the secretOrKey, that we used to create the token, because it`s gonna be the way to know if the token is valid or not
  secretOrKey: process.env.JWT_SECRET,
};

const passportStrategy = new JwtStrategy(jwtOptions, async function (
  jwt_payload,
  done
) {
  try {
    const user = await UserModel.findOne({ _id: jwt_payload.sub });

    if (!user) {
      console.log("Create new account.");
      return done(null, false);
    }
    if (user) {
      console.log("User found.");
      return done(null, user);
    }
  } catch (err) {
    console.log("Token invalid.");
    return done(err, false);
  }
});

export default passportStrategy;
