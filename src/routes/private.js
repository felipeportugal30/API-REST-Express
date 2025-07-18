import express from "express";
import docController from "../controllers/docController";
import userController from "../controllers/userController";

const privateRouter = express.Router();

privateRouter.delete("/delete", userController.deleteUser);
privateRouter.post("/upload");
