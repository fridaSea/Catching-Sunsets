import express from "express";

const testRouter = express.Router();
testRouter.get("/test", (request, response) => {
  console.log("I am triggering a test route".bgBlue);
  response.json("This is a test route.");
});

// const testRouter = express.Router();
// testRouter.get("/test", (req, res) => {
//     res.send({ msg: "Test route." });
//   });

export default testRouter;
