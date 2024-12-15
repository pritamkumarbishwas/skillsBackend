import { Task } from "../models/task.model.js";
import { ApiError } from "../utils/ApiError.js";
import httpStatus from "http-status";

const getAllTasks = async () => {
  return await Task.find()
    .populate("assignedUserId")
    .populate("projectId")
    .sort({ createdAt: -1 });
};

const getTaskById = async (id) => {
  const task = await Task.findById(id);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
  }
  return task;
};

const createTask = async (req) => {
  const { title, description, status, deadline, assignedUserId, projectId } =
    req.body;

  if (!title?.trim()) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Task title is required.");
  }

  if (!status) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Task status is required.");
  }

  const taskData = {
    title: title.trim(),
    description: description?.trim() || "",
    status: status,
    deadline: deadline,
    projectId: projectId,
    assignedUserId: assignedUserId || null,
  };

  const newTask = new Task(taskData);
  return await newTask.save();
};

const updateTaskById = async (id, data) => {
  const { title, description, status, deadline, assignedUserId, projectId } =
    data;

  const updateData = {};
  if (title) updateData.title = title;
  if (description) updateData.description = description;
  if (status) updateData.status = status;
  if (deadline) updateData.deadline = deadline;
  if (projectId) updateData.projectId = projectId;
  if (assignedUserId) updateData.assignedUserId = assignedUserId;

  const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!updatedTask) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
  }
  return updatedTask;
};

const softDeleteTaskById = async (id) => {
  const task = await Task.findById(id);
  if (!task) {
    throw new ApiError(httpStatus.NOT_FOUND, "Task not found");
  }

  if (task.isDeleted) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Task is already deleted");
  }

  task.isDeleted = true;
  await task.save();
  return task;
};

export {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskById,
  softDeleteTaskById,
};
