import express from "express";
import { userLogin } from "../controllers/usersController.js";


const loginRouter = express.Router();

loginRouter.post("/", userLogin);

export default loginRouter;