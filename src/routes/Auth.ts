import express from "express";
import { AuthController } from "../controllers";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/forgot-password", AuthController.generateOtp);
router.post("/match-otp", AuthController.matchOtp);
router.patch("/update-password", AuthController.updatePassword);
router.get("/logout", AuthMiddleware.authenticate, AuthController.logout);

export { router };
