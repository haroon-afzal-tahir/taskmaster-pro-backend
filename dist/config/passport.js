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
exports.passport = void 0;
const models_1 = require("../models");
const passport_1 = __importDefault(require("passport"));
exports.passport = passport_1.default;
const passport_local_1 = require("passport-local");
const bcrypt_1 = __importDefault(require("bcrypt"));
const localOptions = {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
};
const localStrategy = new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, (req, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield models_1.User.findOne({ email }).exec();
        if (!user)
            return done(null, false, { message: "User not found" });
        const pass = yield bcrypt_1.default.compare(password, user.password);
        if (!pass)
            return done(null, false, { message: "Invalid password" });
        return done(null, user);
    }
    catch (error) {
        return done(error, false);
    }
}));
passport_1.default.use(localStrategy);
passport_1.default.serializeUser(models_1.User.serializeUser());
passport_1.default.deserializeUser(models_1.User.deserializeUser());
//# sourceMappingURL=passport.js.map