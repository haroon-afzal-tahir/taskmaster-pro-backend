import { Request, Response } from "express";
import { IUser } from "../types";
import { AuthService } from "../services";
import { logger } from "../config/winston";

export class AuthController {
  public static async register(req: Request, res: Response) {
    try {
      const user = req.body as IUser;
      if (!user || !user.email || !user.password) {
        logger.error("User data not found");
        return res.status(400).json({ message: "User data not found" });
      }
      const token = await AuthService.register(user);

      // Send token in response cookie
      res.cookie("id_token", token, { httpOnly: true, sameSite: 'none', secure: true, });

      return res.status(200).json({ message: "User registered successfully", token });
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  public static async login(req: Request, res: Response) {
    try {
      const user = req.body as IUser;
      const token = await AuthService.login(user);

      // Send token in response cookie
      res.cookie("id_token", token, { httpOnly: true, sameSite: 'none', secure: true, });

      return res.status(200).json({ message: "User registered successfully", token });
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  public static async generateOtp(req: Request, res: Response) {
    try {
      const email = req.body.email;
      await AuthService.generateOtp(email);
      return res.status(200).json({ message: `OTP sent to email: ${email}` });
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  public static async matchOtp(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;
      await AuthService.matchOtp(email, otp);
      return res.status(200).json({ message: "OTP matched successfully" });
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  public static async updatePassword(req: Request, res: Response) {
    
  }
}
