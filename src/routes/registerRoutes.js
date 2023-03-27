import express from "express";
import { userRegister } from "../controllers/usersController.js";

const registerRouter = express.Router()

registerRouter.post("/", userRegister)

export default registerRouter;