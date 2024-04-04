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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const services_1 = require("../services");
const passport_1 = require("../config/passport");
class AuthController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                if (!user || !user.email || !user.password) {
                    return res.status(400).json({ message: "User data not found" });
                }
                const [token, newUser] = yield services_1.AuthService.register(user);
                // Send token in response cookie
                res.cookie("id_token", token, { httpOnly: true, sameSite: 'none', secure: true, });
                return res.status(200).json({ message: "User registered successfully", token, user: newUser });
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                if (!user || !user.email || !user.password) {
                    return res.status(400).json({ message: "User data not found" });
                }
                passport_1.passport.authenticate("local", { session: false }, (err, user, info) => {
                    if (err) {
                        return res.status(500).json({ message: err.message });
                    }
                    if (!user) {
                        return res.status(401).json({ message: info.message });
                    }
                    // JWT token
                    const token = services_1.AuthService.generateToken(user);
                    // Send token in response cookie
                    res.cookie("id_token", token, { httpOnly: true, sameSite: 'none', secure: true, });
                    return res.status(200).json({ message: "User logged in successfully", token, user });
                })(req, res);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    static generateOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                yield services_1.AuthService.generateOtp(email);
                return res.status(200).json({ message: `OTP sent to email: ${email}` });
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    static matchOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = req.body;
                yield services_1.AuthService.matchOtp(email, otp);
                return res.status(200).json({ message: "OTP matched successfully" });
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    static updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                yield services_1.AuthService.updatePassword(email, password);
                return res.status(200).json({ message: "Password updated successfully" });
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Clear cookie
                res.clearCookie("id_token");
                // passport logout
                req.logout(function (err) {
                    if (err) {
                        return res.status(500).json({ message: err.message });
                    }
                });
                return res.status(200).json({ message: "User logged out successfully" });
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map