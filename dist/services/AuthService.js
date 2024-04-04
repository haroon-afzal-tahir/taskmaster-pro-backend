"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validator_1 = require("../utils/validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const email_1 = require("../lib/email");
class AuthService {
    static register(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.User.findOne({ email: payload.email });
                if (user)
                    throw new Error("User already exists");
                if (!validator_1.Validators.validateEmail(payload.email))
                    throw new Error("Invalid email");
                if (!validator_1.Validators.validateUsername(payload.username))
                    throw new Error("Invalid username");
                // Hashed password
                const hashedPassword = yield bcrypt_1.default.hash(payload.password, 10);
                payload.password = hashedPassword;
                // User creation
                const newUser = yield models_1.User.register(new models_1.User({
                    name: payload.name,
                    username: payload.username,
                    email: payload.email,
                    password: hashedPassword,
                }), hashedPassword);
                // JWT token
                const token = jsonwebtoken_1.default.sign({
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    name: newUser.name,
                }, process.env.JWT_SECRET, { expiresIn: "1d" });
                return [token, newUser];
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static generateOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Generate OTP of 6 digits
                const otp = Math.floor(100000 + Math.random() * 900000);
                console.log(otp);
                // Send OTP to email
                yield email_1.EmailLib.sendEmail(email, "OTP for password reset", `Your OTP is ${otp}`);
                // Save OTP in database
                yield models_1.OTP.create({ email, otp });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static matchOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get latest OTP for email
                const latestOtp = yield models_1.OTP.findOne({ email }).sort({ createdAt: -1 });
                if (!latestOtp)
                    throw new Error("OTP not found");
                if (latestOtp.otp !== otp)
                    throw new Error("Invalid OTP");
                return;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static updatePassword(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Hashed password
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                // Get user by email
                const user = yield models_1.User.findOne({ email });
                if (!user)
                    throw new Error("User not found");
                yield models_1.User.updateOne({ email }, { password: hashedPassword });
                // Update password
                user.setPassword(hashedPassword, (err, user) => {
                    if (err)
                        throw new Error(err.message);
                    user.save();
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static generateToken(user) {
        return jsonwebtoken_1.default.sign({
            id: user._id,
            username: user.username,
            email: user.email,
            name: user.name,
        }, process.env.JWT_SECRET, { expiresIn: "1d" });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map