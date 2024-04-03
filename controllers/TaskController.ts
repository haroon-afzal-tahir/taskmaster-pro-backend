import { Request, Response } from "express";

export class TaskController {
  public static async getTasks(req: Request, res: Response) {
    try {
      return res.status(200).json({ message: "Get tasks" });
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  public static async createTask(req: Request, res: Response) {
    try {
      return res.status(200).json({ message: "Create tasks" });
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  public static async updateTask(req: Request, res: Response) {
    try {
      return res.status(200).json({ message: "Update tasks" });
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  public static async deleteTask(req: Request, res: Response) {
    try {
      return res.status(200).json({ message: "Delete tasks" });
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}
