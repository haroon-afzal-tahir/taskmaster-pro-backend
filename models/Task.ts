import mongoose from "mongoose";
import type { ObjectId } from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  dueDate: { type: Date, required: true },
  completed: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  tagId: { type: Object, required: true },
});

taskSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  }
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
