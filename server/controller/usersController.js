import UserModel from "../models/usersModel.js";
import { hashingPassword } from "../utilities/hashingPassword.js";

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
      message: error.message,
    });
  }
};

export { registerNewUser };
