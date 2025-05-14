import express from "express";

// 1. Create a router
const chatRouter = express.Router();

// 2. defining the endpoint (api/favoritesunsets/all) -> afterwards, go to index.js and tell my App, listen to whatever is coming through
chatRouter.get("/all", getAllChatss);
chatRouter.post("/add", jwtAuth, addNewChat);

// sunsetsRouter.get("/mine", jwtAuth, getUserSunsets);
//REVIEW Naming is hard, that we know, but maybe there is a better name for that path, like "userSunset"
// sunsetsRouter.put("/:id/like", jwtAuth, likeSunsetById);
// sunsetsRouter.delete("/:id/like", jwtAuth, disLikeSunsetById);

chatRouter.get("/:id", getChatById);
chatRouter.put("/:id", jwtAuth, updateChatById); //REVIEW PUT method is to replace the entire data. If you are updating some properties, PATH would be the indicated one.
chatRouter.delete("/:id", jwtAuth, deleteChatById);

export default chatRouter;
