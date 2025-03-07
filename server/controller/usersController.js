import UserModel from "../models/usersModel.js";
import {
  hashingPassword,
  verifyPassword,
} from "../utilities/passwordServices.js";
import { generateToken } from "../utilities/tokenServices.js";

const registerNewUser = async (req, res) => {
  const { email, password, username, img } = req.body;
  //   console.log("req.body :>> ", req.body);

  // Check if user exist in database
  try {
    const existingUser = await UserModel.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        message: "E-Mail already exists in the datbase",
      });
    }

    if (!existingUser) {
      // Hash the password - see utilities
      const hashedPassword = await hashingPassword(password);
      //   console.log("hashedPassword :>> ", hashedPassword);

      if (!hashedPassword) {
        return res.status(500).json({
          error: "Couldn`t register the user, problem with the password",
        });
      }
      if (hashedPassword) {
        // console.log("creating user");
        const newUserObject = new UserModel({
          username: username,
          email: email,
          password: hashedPassword,
          img: img
            ? img
            : "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg",
        });
        console.log("newUserObject :>> ", newUserObject);

        const newUser = await newUserObject.save();
        console.log("newUser :>> ", newUser);
        if (!newUser) {
          return res.status(500).json({
            error: "User could not be saved",
          });
        }
        // console.log("newUser :>> ", newUser);
        if (newUser) {
          return res.status(201).json({
            message: "User registered successfully",
            user: {
              id: newUser._id,
              username: newUser.username,
              email: newUser.email,
              img: newUser.img,
            },
          });
        }
      }
    }
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong during registration",
      // errorStack: error,
      message: error.message,
    });
  }
};

const loginNewUser = async (req, res) => {
  const { email, password } = req.body;

  //1. Find user in database
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.status(404).json({
        message: "User doesn`t have an account. You have to register first.",
      });
    }
    if (existingUser) {
      // 2. Verify password
      const isPasswordCorrect = await verifyPassword(
        req.body.password,
        existingUser.password
      );

      if (!isPasswordCorrect) {
        return res.status(401).json({
          message: "Incorrect Password. Please try again.",
        });
      }

      if (isPasswordCorrect) {
        // 3. Generate Token
        const token = generateToken(existingUser._id);
        if (!token) {
          return res.status(500).json({
            error: "Soemthing went wrong, try to login later.",
          });
        }

        if (token) {
          return res.status(200).json({
            message: "Login successful.",
            user: {
              id: existingUser._id,
              username: existingUser.username,
              email: existingUser.email,
              img: existingUser.img,
            },
            token: token,
            // token -> you can also only write this, it is the same as the above
          });
        }
      }
    }
  } catch (error) {
    console.log("error :>> ", error);
    return res.status(500).json({
      error: "Something went wrong during login",
      errorMessage: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  console.log("get profile");
  console.log("req.user :>> ", req.user);
  if (!req.user) {
    return res.status(404).json({
      error: "User needs to login again",
    });
  }
  if (req.user) {
    return res.status(200).json({
      message: "User profile",
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        img: req.user.img,
      },
    });
  }
};

export { registerNewUser, loginNewUser, getProfile };
