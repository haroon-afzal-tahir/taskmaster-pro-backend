import { Request, Response } from "express";
import { Tag } from "../models";

export class TagController {
  public static async getTags(req: Request, res: Response) {
    try {
      const tags = await Tag.getAll();
      return res.status(200).json(tags);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}
