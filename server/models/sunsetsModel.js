import mongoose from "mongoose";

// 1st define the schema
const sunsetSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  likes: {
    type: Number,
    required: false,
    unique: true,
  },
  location: {
    type: String,
    required: false,
    unique: true,
  },
  recorded: {
    type: Date,
    required: false,
    unique: true,
  },
  senses: {
    type: String,
    required: false,
    unique: true,
  },
});

// 2nd turn the schema into a modal
const SunsetModel = mongoose.model("Sunset", sunsetSchema);

export default SunsetModel;
