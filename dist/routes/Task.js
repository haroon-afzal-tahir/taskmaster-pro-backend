"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const router = express_1.default.Router();
exports.router = router;
router.get("/", AuthMiddleware_1.AuthMiddleware.authenticate, controllers_1.TaskController.getTasks);
router.post("/", AuthMiddleware_1.AuthMiddleware.authenticate, controllers_1.TaskController.createTask);
router.patch("/:id", AuthMiddleware_1.AuthMiddleware.authenticate, controllers_1.TaskController.updateTask);
router.delete("/:id", AuthMiddleware_1.AuthMiddleware.authenticate, controllers_1.TaskController.deleteTask);
router.patch("/:id/complete", AuthMiddleware_1.AuthMiddleware.authenticate, controllers_1.TaskController.completeTask);
//# sourceMappingURL=Task.js.map