// this is gonna be the file, that contains the functions that I gonna trigger with the operations I want to do with my sunsets, like get them all, create a new one, delete one, modify an existing on
// every operation that we will do with our database is gonna be an asynchronus operation
// all of the functions need to be async
// they ALL gonna get as first and second parameters always the request and the response (req, res)

import SunsetModel from "../models/sunsetsModel.js";

const getAllSunsets = async (req, res) => {
  console.log("get ALL sunsets is running");

  try {
    // const allSunsets = []; // to fake that the lenght is egal to 0
    const allSunsets = await SunsetModel.find({});
    console.log("allSunsets :>> ", allSunsets);

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

  // Add the postman "filter" by location AND Likes
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
        // sunsetsByLocationAndLikes,
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

export { getAllSunsets, getSunsetsByLocation };
