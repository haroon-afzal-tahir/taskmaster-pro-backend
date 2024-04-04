import { User } from "../models";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

export { passport };
