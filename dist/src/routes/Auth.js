"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const router = express_1.default.Router();
exports.router = router;
router.post("/register", controllers_1.AuthController.register);
router.post("/login", controllers_1.AuthController.login);
router.post("/forgot-password", controllers_1.AuthController.generateOtp);
router.post("/match-otp", controllers_1.AuthController.matchOtp);
router.patch("/update-password", controllers_1.AuthController.updatePassword);
router.get("/logout", AuthMiddleware_1.AuthMiddleware.authenticate, controllers_1.AuthController.logout);
