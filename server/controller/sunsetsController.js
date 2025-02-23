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

export { getAllSunsets };
