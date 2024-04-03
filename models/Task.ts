import mongoose, { Model, Schema } from "mongoose";
import { ObjectId } from "mongoose";
import { ITask } from "../types";

interface TaskModel extends Model<ITask> {
  getAll(): Promise<ITask[]>;
}

const taskSchema = new mongoose.Schema<ITask, TaskModel>({
  title: { type: String, required: true },
  dueDate: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  tag: { type: Schema.Types.ObjectId, required: true, ref: "Tag" },
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

taskSchema.statics.getAll = function () {
  return Task.find().populate("tag").populate("user");
}

taskSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  }
});

const Task = mongoose.model<ITask, TaskModel>("Task", taskSchema);

export default Task;
