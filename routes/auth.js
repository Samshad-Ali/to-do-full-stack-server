import express from "express";
import { loginController, registerController, logoutController,myProfile } from "../controllers/authControllers.js";
import { authMiddleware } from "../middlewares/requiredAuth.js";
import { isUserVerified } from "../middlewares/isVerified.js";

const authRouter = express.Router();

authRouter.post('/register',authMiddleware,registerController)
authRouter.post('/login',authMiddleware,loginController)
authRouter.get('/logout',logoutController)
authRouter.get('/me',isUserVerified,myProfile)
export default authRouter;