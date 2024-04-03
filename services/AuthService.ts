import { OTP, User } from "../models";
import { IUser } from "../types";
import jwt from "jsonwebtoken";
import { Validators } from "../utils/validator";
import bcrypt from "bcrypt";
import { EmailLib } from "../lib/email";

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
      const newUser = new User(payload);
      await newUser.save();

      // JWT token
      const token = jwt.sign({
        email: payload.email,
        name: payload.name,
        username: payload.username,
        id: newUser._id,
      }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

      return token;

    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async login(payload: IUser) {
    try {
      const { email, password } = payload;

      const user = await User.findOne({ email});
      
      if (!user) throw new Error("User not found");

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) throw new Error("Invalid credentials");

      // JWT token
      const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1d" });

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

      // Update password
      await User.updateOne({ email }, { password: hashedPassword });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
