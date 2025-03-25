import { MongooseError } from "mongoose";
import UserModel from "../models/usersModel.js";
import uploadToCloudinary from "../utilities/imageUpload.js";
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
      const hashedPassword = await hashingPassword(password);
      //   console.log("hashedPassword :>> ", hashedPassword);

      if (!hashedPassword) {
        return res.status(500).json({
          error: "Couldn`t register the user, problem with the password",
        });
      }
      if (hashedPassword) {
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
        if (newUser) {
          return res.status(201).json({
            message: "User registered successfully",
            user: {
              id: newUser._id,
              username: newUser.username,
              email: newUser.email,
              img: newUser.img,
              postedSunsets: newUser.postedSunsets,
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

const updateUser = async (req, res) => {
  // const {id, username} = req.body;

  // Check if user exist in database
  try {
    const existingUser = await UserModel.findById(req.body.id);

    console.log("IMG URL", req.body);

    if (existingUser) {
      existingUser.img = req.body.imgUrl;
      existingUser.username = req.body.username;
      existingUser.email = req.body.email;
      existingUser.postedSunsets = req.body.postedSunsets;

      const userAlreadyExist = await UserModel.findOne({
        email: req.body.email,
      });
      if (userAlreadyExist && userAlreadyExist.id !== existingUser.id) {
        return res.status(400).json({
          message: "The email address is already in use by another user",
          user: existingUser,
        });
      }

      await existingUser.save();

      return res.status(200).json({
        message: "User updated successfully",
        user: existingUser,
      });
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong during registration",
      // errorStack: error,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  // Check if user exist in database
  try {
    const existingUser = await UserModel.findById(req.body.id);

    if (existingUser) {
      await UserModel.findByIdAndDelete(req.body.id);

      return res.status(200).json({
        message: "User deleted successfully",
        // user: existingUser,
      });
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong during deleting the user",
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
              postedSunsets: existingUser.postedSunsets,
            },
            token: token,
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
        postedSunsets: req.user.postedSunsets,
      },
    });
  }
};

// TODO Move to imageController.ts
const imageUpload = async (req, res) => {
  console.log("USER PROFILE Image upload is working");
  // console.log("req :>> ", req);

  // ist hier nicht sehr genau das error handling
  if (!req.file) {
    return res.status(500).json({
      error: "File Type not supported",
    });
  }
  if (req.file) {
    //we could check the file size here (or do it diretly in Multer)

    //Upload it to Cloudinary
    const uploadedImage = await uploadToCloudinary(req.file);

    if (!uploadedImage) {
      return res.status(400).json({
        error: "Image couldn`t be uploaded",
      });
    }

    if (uploadedImage) {
      return res.status(200).json({
        message: "Image uploaded successfully",
        imgUrl: uploadedImage.secure_url,
      });
    }

    console.log("uploadedImage :>> ".green, uploadedImage);
  }
};

const getAllUsers = async (req, res) => {
  console.log("get ALL users is running");

  try {
    // GET ALL the informations from the postedSunset
    // const allUsers = await UserModel.find({}).populate("postedSunsets");

    // ONLY GET certain informations from the postedSunset
    const allUsers = await UserModel.find({}).populate({
      path: "postedSunsets",
      select: ["img", "country"],
    });

    //console.log("allUsers :>> ", allUsers);

    if (allUsers.length === 0) {
      res.status(200).json({
        message: "No records in the database",
        amount: allUsers.length,
        allUsers,
      });
    }
    res.status(200).json({
      message: "All the records from our database",
      amount: allUsers.length,
      allUsers,
    });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      error: "something went wrong",
    });
  }
};

export {
  registerNewUser,
  loginNewUser,
  getProfile,
  imageUpload,
  updateUser,
  deleteUser,
  getAllUsers,
};
