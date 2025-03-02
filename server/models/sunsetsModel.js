import mongoose from "mongoose";

// 1st define the schema
const sunsetSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    recorded: {
      type: Date,
      required: false,
    },
    senses: {
      type: String,
      required: false,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_At" } }
);

// 2nd turn the schema into a modal
const SunsetModel = mongoose.model("Sunset", sunsetSchema);

export default SunsetModel;
