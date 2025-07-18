import express from "express";
import userController from "../controllers/userController.js";

const publicRouter = express.Router();

publicRouter.post("/create", userController.createUser);

publicRouter.post("/login", userController.findOneByEmailAndPw);

export default publicRouter;
