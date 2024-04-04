"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const models_1 = require("../models");
class TaskController {
    static getTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tagId = req.query.tagId;
                let tasks = [];
                if (!tagId) {
                    tasks = yield models_1.Task.getAll();
                }
                else {
                    tasks = yield models_1.Task.getTasksByTagId(tagId);
                }
                return res.status(200).json(tasks);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    static createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { title, dueDate, tag } = req.body;
                const newTask = new models_1.Task({
                    title,
                    dueDate,
                    tag,
                    completed: false,
                    user: user.id,
                });
                yield newTask.save();
                return res.status(200).json({ message: "Task created successfully", task: newTask });
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    static updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Update the status of the task
                const taskId = req.params.id;
                const { title, tag, completed } = req.body;
                const task = yield models_1.Task.findById(taskId);
                if (!task) {
                    return res.status(404).json({ message: "Task not found" });
                }
                task.title = title;
                task.tag = tag;
                task.completed = completed;
                yield task.save();
                return res.status(200).json({ message: `${task.title} updated successfully`, task });
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    static deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskId = req.params.id;
                const task = yield models_1.Task.deleteOne({
                    _id: taskId,
                });
                if (!task) {
                    return res.status(404).json({ message: "Task not found" });
                }
                return res.status(200).json({ message: "Task Deleted Successfully" });
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    static completeTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskId = req.params.id;
                const task = yield models_1.Task.findById(taskId);
                if (!task) {
                    return res.status(404).json({ message: "Task not found" });
                }
                task.completed = true;
                yield task.save();
                return res.status(200).json({ message: `${task.title} completed successfully` });
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.TaskController = TaskController;
//# sourceMappingURL=TaskController.js.map