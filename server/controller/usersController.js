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

const updateUser = async (req, res) => {
  const { id, imgUrl } = req.body;
  // const {id, username} = req.body;

  // Check if user exist in database
  try {
    const existingUser = await UserModel.findById(id);

    console.log("IMG URL", req.body);

    if (existingUser) {
      existingUser.img = imgUrl;
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

// TODO Move to imageController.ts
const imageUpload = async (req, res) => {
  console.log("Image upload is working");
  console.log("req :>> ", req);

  // ist hier nicht sehr genau das error handling
  if (!req.file) {
    return res.status(500).json({
      error: "File Type not supported",
    });
  }
  if (req.file) {
    //we could check the file size here (or do it diretly in Multer)
    // TO Do - calculate how much  size: 49983 in Bytes,  is in  megabytes and then you decide how many Megabytes you want to allow to upload
    // 5 Megabytes

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

export { registerNewUser, loginNewUser, getProfile, imageUpload, updateUser };
