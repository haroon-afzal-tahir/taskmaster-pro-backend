import express from "express";
import { TaskController } from "../controllers";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const router = express.Router();

router.get("/", AuthMiddleware.authenticate, TaskController.getTasks);
router.post("/", AuthMiddleware.authenticate, TaskController.createTask);
router.patch("/:id", AuthMiddleware.authenticate, TaskController.updateTask);
router.delete("/:id", AuthMiddleware.authenticate, TaskController.deleteTask);
router.patch("/:id/complete", AuthMiddleware.authenticate, TaskController.completeTask);

export { router };
