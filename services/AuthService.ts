import { OTP, User } from "../models";
import { IUser } from "../types";
import jwt from "jsonwebtoken";
import { Validators } from "../utils/validator";
import bcrypt from "bcrypt";
import { EmailLib } from "../lib/email";
import { passport } from "../config/passport";

export class AuthService {
  public static async register(payload: IUser) {
    try {
      const user = await User.findOne({ email: payload.email });
      
      if (user) throw new Error("User already exists");
      if (!Validators.validateEmail(payload.email)) throw new Error("Invalid email");
      if (!Validators.validateUsername(payload.username)) throw new Error("Invalid username");

      // Hashed password
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      payload.password = hashedPassword;

      // User creation
      const newUser = await User.register(new User({
        name: payload.name,
        username: payload.username,
        email: payload.email,
        password: hashedPassword,
      }), hashedPassword);

      // JWT token
      const token = jwt.sign({
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        name: newUser.name,
      }, process.env.JWT_SECRET!, { expiresIn: "1d" });

      return token;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async generateOtp(email: string) {
    try {
      // Generate OTP of 6 digits
      const otp = Math.floor(100000 + Math.random() * 900000);

      // Send OTP to email
      await EmailLib.sendEmail(email, "OTP for password reset", `Your OTP is ${otp}`);

      // Save OTP in database
      await OTP.create({ email, otp });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async matchOtp(email: string, otp: string) {
    try {
      // Get latest OTP for email
      const latestOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });

      if (!latestOtp) throw new Error("OTP not found");

      if (latestOtp.otp !== otp) throw new Error("Invalid OTP");

      return;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async updatePassword(email: string, password: string) {
    try {
      // Hashed password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Get user by email
      const user = await User.findOne({ email });

      if (!user) throw new Error("User not found");

      await User.updateOne({ email }, { password: hashedPassword });


      // Update password
      user.setPassword(hashedPassword, (err: { message: string | undefined; }, user: { save: () => void; }) => {
        if (err) throw new Error(err.message);
        console.log(user);
        user.save();
      })
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static generateToken(user: IUser & { _id: string }) {
    return jwt.sign({
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
    }, process.env.JWT_SECRET!, { expiresIn: "1d" });
  }
}
