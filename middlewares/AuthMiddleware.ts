import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

export class AuthMiddleware {
  public static async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header("Authorization");
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decoded;
      next();
    } catch (error) {
      console.log("Error authenticating user", error);
      res.status(401).json({ message: "Unauthorized" });
    }
  }

  public static async googleAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header("Authorization");
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decoded;
      next();
    } catch (error) {
      console.log("Error authenticating user", error);
      res.status(401).json({ message: "Unauthorized" });
    }
  }
}
