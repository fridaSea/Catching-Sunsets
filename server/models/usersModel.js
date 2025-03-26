import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: [5, "E-Mail Adress is too short, should be bigger than 5"],
    },
    password: {
      type: String,
      required: true,
      // Length of the password can`t be checked, because the hashed password is always super long
      // minLength: [
      //   6,
      //   "Password is too short, should have more than 6 characters",
      // ],
    },
    username: {
      type: String,
      required: false,
      unique: true,
      // validate: {
      //   validator: function (v) {
      //     return v.length > 3;
      //   },
      //   message: `username {VALUE} is too short, should be bigger than 3`,
      //   // message: (props) => {
      //   //   console.log('props :>> ', props);
      //   //   return `username {VALUE} is too short, should be bigger than 3`
      //   // }
      // },
    },
    img: {
      type: String,
      required: false,
      default:
        "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg",
    },
    postedSunsets: [
      {
        require: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sunset",
      },
    ],
    // postedSunsets: [
    //   {
    //     img: { type: String, required: true },
    //     country: { type: String, required: true },
    //     description: { type: String, required: true },
    //     //likes: Number,
    //   },
    // ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_At" } }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
