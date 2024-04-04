import { Request, Response } from "express";
import { Tag } from "../models";

export class TagController {
  public static async getTags(req: Request, res: Response) {
    try {
      const tags = await Tag.find();
      // find count of each tags present in the Task collection
      const tagCount = await Tag.aggregate([
        {
          $lookup: {
            from: "tasks",
            localField: "_id",
            foreignField: "tag",
            as: "tasks",
          },
        },
        {
          $project: {
            name: 1,
            count: { $size: "$tasks" },
            icon: 1,
          },
        },
      ]);

      console.log(tagCount);

      return res.status(200).json(tagCount);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}
