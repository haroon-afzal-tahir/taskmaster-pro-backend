import { User } from "../models";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

const localOptions = { 
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
};

const localStrategy = new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, async (req, email, password, done) => {
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) return done(null, false, { message: "User not found" });

    const pass = await bcrypt.compare(password, user.password);
    if (!pass) return done(null, false, { message: "Invalid password" });

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
})

passport.use(localStrategy);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


export { passport };
