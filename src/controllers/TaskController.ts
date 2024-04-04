import { Request, Response } from "express";
import { Task } from "../models";
import { Schema } from "mongoose";

export class TaskController {
  public static async getTasks(req: Request, res: Response) {
    try {
      const tagId = req.query.tagId;
      let tasks = [];
      if (!tagId) {
        tasks = await Task.getAll();
      } else {
        tasks = await Task.getTasksByTagId(tagId as string);
      }
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
      // Update the status of the task
      const taskId = req.params.id;
      const { title, tag, completed } = req.body;
      
      const task = await Task.findById(taskId);

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      task.title = title;
      task.tag = tag;
      task.completed = completed;

      await task.save();
      return res.status(200).json({ message: `${task.title} updated successfully`, task });
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  public static async deleteTask(req: Request, res: Response) {
    try {
      const taskId = req.params.id;

      const task = await Task.deleteOne({
        _id: taskId,
      });

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.status(200).json({ message: "Task Deleted Successfully" });
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  public static async completeTask(req: Request, res: Response) {
    try {
      const taskId = req.params.id;
      const task = await Task.findById(taskId);

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      task.completed = true;
      await task.save();

      return res.status(200).json({ message: `${task.title} completed successfully` });
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}
