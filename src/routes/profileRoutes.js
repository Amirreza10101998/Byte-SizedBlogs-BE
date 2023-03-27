import express from "express";
import { authenticateUser } from "../controllers/usersController.js"
import { authenticateJWT } from "../middleware/authMiddleware.js"

const profileRouter = express.Router();

profileRouter.get("/", authenticateJWT, authenticateUser)

export default profileRouter;