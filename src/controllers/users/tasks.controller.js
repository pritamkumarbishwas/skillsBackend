import * as TasksService from "../../services/task.service.js"; // Service for tasks
import { ApiError } from "../../utils/ApiError.js";
import httpStatus from "http-status";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await TasksService.getAllTasks();
  return res
    .status(httpStatus.OK)
    .json(new ApiResponse(httpStatus.OK, tasks, "Tasks fetched successfully"));
});

const getTaskById = asyncHandler(async (req, res) => {
  const task = await TasksService.getTaskById(req.params.id);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
  }
  return res
    .status(httpStatus.OK)
    .json(new ApiResponse(httpStatus.OK, task, "Task fetched successfully"));
});

const createTask = asyncHandler(async (req, res) => {
  const newTask = await TasksService.createTask(req);
  return res
    .status(httpStatus.CREATED)
    .json(
      new ApiResponse(httpStatus.CREATED, newTask, "Task created successfully")
    );
});

const updateTaskById = asyncHandler(async (req, res) => {
  const updatedTask = await TasksService.updateTaskById(
    req.params.id,
    req.body
  );

  return res
    .status(httpStatus.OK)
    .json(
      new ApiResponse(httpStatus.OK, updatedTask, "Task updated successfully")
    );
});

const softDeleteTaskById = asyncHandler(async (req, res) => {
  const deletedTask = await TasksService.softDeleteTaskById(req.params.id);
  if (!deletedTask) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
  }

  return res
    .status(httpStatus.OK)
    .json(new ApiResponse(httpStatus.OK, [], "Task deleted successfully"));
});

export {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  softDeleteTaskById,
};
