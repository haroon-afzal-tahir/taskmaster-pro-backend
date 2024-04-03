import { Request, Response } from "express";
import { Task } from "../models";

export class TaskController {
  public static async getTasks(req: Request, res: Response) {
    try {
      const tasks = await Task.getAll();
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  public static async createTask(req: Request, res: Response) {
    try {
      const user = req.user;
      const { title, dueDate, tag } = req.body;

      const newTask = new Task({
        title,
        dueDate,
        tag,
        completed: false,
        user: user.id,
      });

      await newTask.save();
      return res.status(200).json({ message: "Task created successfully", task: newTask });
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
