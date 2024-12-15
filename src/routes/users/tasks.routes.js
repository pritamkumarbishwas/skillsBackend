import { Router } from "express";
import * as TasksController from "../../controllers/users/tasks.controller.js";
import * as TasksValidation from "../../validations/tasks.validation.js";
import validate from "../../middlewares/validate.js";
import { verifyJWT } from "../../middlewares/users.auth.middleware.js";

const router = Router();

router.get("/", verifyJWT, TasksController.getAllTasks);

router.get(
  "/:id",
  verifyJWT,
  validate(TasksValidation.getTaskById),
  TasksController.getTaskById
);

router.post(
  "/",
  validate(TasksValidation.createTask),
  TasksController.createTask
);

router.put(
  "/:id",
  verifyJWT,
  validate(TasksValidation.updateTaskById),
  TasksController.updateTaskById
);

router.delete(
  "/:id",
  verifyJWT,
  validate(TasksValidation.softDeleteTaskById),
  TasksController.softDeleteTaskById
);

export default router;
