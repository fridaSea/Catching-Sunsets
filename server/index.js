import express from "express";
import colors from "colors";

const app = express();

const port = process.env.PORT || 4444;
// we define on which port our backend is going to run. you can put any number here between 4000 and 6000.
// process.env.PORT- it`s alreday ready for when we deploy it. Local it runs on 4444, but we don`t now on which port it will run when we deployed it

app.listen(port, () => {
  console.log(`Server is running on  port ${port}`.bgGreen);
  //   console.log("Server is running on " + port + "port".bgGreen);
});
