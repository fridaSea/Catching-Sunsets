// this is gonna be the file, that contains the functions that I gonna trigger with the operations I want to do with my sunsets, like get them all, create a new one, delete one, modify an existing on
// every operation that we will do with our database is gonna be an asynchronus operation
// all of the functions need to be async
// they ALL gonna get as first and second parameters always the request and the response (req, res)

import SunsetModel from "../models/sunsetsModel.js";

const getAllSunsets = async (req, res) => {
  console.log("get ALL sunsets is running");

  try {
    // const allSunsets = []; // to fake that the lenght is egal to 0
    //const allSunsets = await SunsetModel.find().populate("ownerUserId");
    const allSunsets = await SunsetModel.find().populate({
      path: "ownerUserId",
      select: ["_id", "username", "email"],
    });
    //console.log("allSunsets :>> ", allSunsets);

    if (allSunsets.length === 0) {
      res.status(200).json({
        message: "No records in the database",
        amount: allSunsets.length,
        allSunsets,
      });
    }
    res.status(200).json({
      message: "All the records from our database",
      amount: allSunsets.length,
      allSunsets,
    });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      error: "something went wrong",
    });
  }
};

const getSunsetsByLocation = async (req, res) => {
  console.log("controller function running");
  // console.log("req :>> ", req);
  console.log("params :>> ", req.params);
  console.log("query :>> ", req.query);

  const location = req.params.location;
  // const {location} = req.params -> both work, you just have to decide for one

  if (req.query.likes) {
    console.log("request with likes coming");

    const sunsetsByLocationAndLikes = await SunsetModel.find({
      location: req.params.location,
      likes: { $gte: req.query.likes },
    });

    if (sunsetsByLocationAndLikes.length === 0) {
      const sunsetsByLocation = await SunsetModel.find({ location: location });
      const sunsetsByLikes = await SunsetModel.find({
        likes: { $gte: req.query.likes },
      });

      let errorMessage = "No sunsets found. ";

      if (sunsetsByLocation.length === 0 && sunsetsByLikes.length === 0) {
        errorMessage += `No sunsets found for neither the location ${location} nor with at least ${req.query.likes} likes.`;
      } else if (sunsetsByLocation.length === 0) {
        errorMessage += `for the location ${location}.`;
      } else if (sunsetsByLikes.length === 0) {
        errorMessage += `with at least ${req.query.likes} likes.`;
      }

      res.status(400).json({
        message: errorMessage,
        amount: sunsetsByLocationAndLikes.length,
      });
      return;
    }

    res.status(200).json({
      message: `Sunsets from ${req.params.location} with at least ${req.query.likes} likes`,
      sunsetsByLocationAndLikes,
    });

    return;
  }

  if (!req.query.likes) {
    try {
      const sunsetsByLocation = await SunsetModel.find({
        location: req.params.location,
      });

      if (sunsetsByLocation.length === 0) {
        res.status(400).json({
          message: `No sunsets for the location ${req.params.location} in the database`,
          amount: sunsetsByLocation.length,
          sunsetsByLocation,
        });
        return;
      }
      res.status(200).json({
        message: "All the records from our database",
        amount: sunsetsByLocation.length,
        sunsetsByLocation,
      });
    } catch (error) {
      console.log("error :>> ", error);
      res.status(500).json({
        error: "something went wrong",
      });
    }
  }
};

const getSunsetById = async (req, res) => {
  const { id } = req.params;
  //console.log("req.params :>> ", req.params);
  try {
    const existingSunset = await SunsetModel.findById(id);
    if (!existingSunset) {
      return res.status(404).json({
        message: "No sunset found",
      });
    }
    if (existingSunset) {
      return res.status(200).json({
        message: "Sunset Post",
        sunset: {
          id: existingSunset._id,
          country: existingSunset.country,
          description: existingSunset.description,
          img: existingSunset.img,
          ownerUserId: existingSunset.ownerUserId,
        },
      });
    }
  } catch (error) {
    console.log("error :>> ", error);
    return res.status(500).json({
      error: "Something went wrong during Sunset Abfrage",
      errorMessage: error.message,
    });
  }
};

const addNewSunset = async (req, res) => {
  const { imgUrl, description, country } = req.body;
  console.log("req.body :>> ", req.body);
  const { username, email } = req.user;
  console.log("req.user :>> ", req.user);

  if (!imgUrl) {
    return res.status(400).json({
      error: "Image is required",
    });
  }

  try {
    const newSunsetObject = new SunsetModel({
      img: imgUrl,
      country: country,
      description: description,
      ownerUserId: req.user._id,
    });
    console.log("newSunsetModel :>> ", newSunsetObject);

    const newSunset = await newSunsetObject.save();
    console.log("newSunset :>> ", newSunset);
    if (!newSunset) {
      return res.status(500).json({
        error: "New Sunset Post could not be saved",
      });
    }
    if (newSunset) {
      return res.status(201).json({
        message: "New Sunset Post added successfully",
        post: {
          id: newSunset._id,
          country: newSunset.country,
          description: newSunset.description,
          sunsetOwner: { username, email },
          img: imgUrl,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong while uploading a new post",
      message: error.message,
    });
  }
};

const updateSunsetById = async (req, res) => {
  const { id } = req.params;
  // Check if the image post exist in the database
  try {
    const existingSunset = await SunsetModel.findById(id);
    console.log("existingSunset :>> ", existingSunset);
    if (!existingSunset) {
      return res.status(404).json({
        message: "No sunset found",
      });
    }
    console.log("req.body :>> ", req.body);
    if (existingSunset) {
      existingSunset.country = req.body.country;
      existingSunset.description = req.body.description;
      existingSunset.img = req.body.imgUrl;
      existingSunset.ownerUserId = req.user._id;

      await existingSunset.save();
      console.log("existingSunset :>> ", existingSunset);

      return res.status(200).json({
        message: "Sunset Post updated successfully",
        sunset: existingSunset,
      });
    } else {
      return res.status(404).json({
        message: "Sunset Post not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong during updating Sunset Post",
      // errorStack: error,
      message: error.message,
    });
  }
};

const deleteSunsetById = async (req, res) => {
  try {
    const existingSunset = await SunsetModel.findById(req.body.id);
    if (existingSunset) {
      await SunsetModel.findByIdAndDelete(req.body.id);
      return res.status(200).json({
        message: "Sunset Post deleted successfully",
      });
    } else {
      return res.status(404).json({
        message: "Sunset Post not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong during deleting the Sunset Post",
      // errorStack: error,
      message: error.message,
    });
  }
};

const getUserSunsets = async (req, res) => {
  console.log("getUserSunsets controller function running");
  // console.log("params :>> ", req.params);
  // console.log("query :>> ", req.query);

  const userId = req.user._id;

  console.log(userId);
  const sunsetsByUser = await SunsetModel.find({ ownerUserId: userId });
  res.status(200).json({
    message: `Sunsets from ${req.user._id}`,
    sunsetsByUser,
  });

  return;
};

// const likeSunsetById = async (req, res) => {
//   console.log("LIKE SUNSET");
// };

// const disLikeSunsetById = async (req, res) => {
//   console.log("DISLIKE SUNSET");
// };

export {
  getAllSunsets,
  getSunsetsByLocation,
  addNewSunset,
  getSunsetById,
  updateSunsetById,
  deleteSunsetById,
  getUserSunsets,
  // likeSunsetById,
  // disLikeSunsetById,
};
