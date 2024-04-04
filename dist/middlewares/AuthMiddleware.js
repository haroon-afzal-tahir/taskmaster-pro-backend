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
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthMiddleware {
    static authenticate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                if (!token) {
                    return res.status(401).json({ message: "Unauthorized" });
                }
                // Verify token
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                req.user = decoded;
                next();
            }
            catch (error) {
                console.log("Error authenticating user", error);
                res.status(401).json({ message: "Unauthorized" });
            }
        });
    }
    static googleAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.header("Authorization");
                if (!token) {
                    return res.status(401).json({ message: "Unauthorized" });
                }
                // Verify token
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                req.user = decoded;
                next();
            }
            catch (error) {
                console.log("Error authenticating user", error);
                res.status(401).json({ message: "Unauthorized" });
            }
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=AuthMiddleware.js.map