import express from "express";
//import docController from "../controllers/docController.js";
import userController from "../controllers/userController.js";

const privateRouter = express.Router();

privateRouter.delete("/delete", userController.deleteUser);
privateRouter.post("/upload", userController.updateUser);

export default privateRouter;
