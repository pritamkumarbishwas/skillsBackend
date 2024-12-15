import Joi from "joi";

const createTask = {
  body: Joi.object().keys({
    title: Joi.string().trim().required().messages({
      "string.empty": "Title is required",
      "any.required": "Title is required",
    }),
    description: Joi.string().trim().optional(),
    deadline: Joi.date().optional(),
    projectId: Joi.string().hex().length(24).optional().messages({
      "string.hex": "Project ID must be a valid ID",
      "string.length": "Project ID must be 24 characters",
    }),
    status: Joi.string().valid("To-Do", "In Progress", "Completed").optional(),
    assignedUserId: Joi.string().hex().length(24).optional().messages({
      "string.hex": "assignedUserId must be a valid user ID",
      "string.length": "assignedUserId must be 24 characters",
    }),
  }),
};

const updateTask = {
  body: Joi.object().keys({
    title: Joi.string().trim().optional(),
    description: Joi.string().trim().optional(),
    deadline: Joi.date().optional(),
    projectId: Joi.string().hex().length(24).optional().messages({
      "string.hex": "Project ID must be a valid ID",
      "string.length": "Project ID must be 24 characters",
    }),
    status: Joi.string().valid("To-Do", "In Progress", "Completed").optional(),
    assignedUserId: Joi.string().hex().length(24).optional().messages({
      "string.hex": "assignedUserId must be a valid user ID",
      "string.length": "assignedUserId must be 24 characters",
    }),
  }),
};

const getTaskById = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required().messages({
      "string.hex": "Invalid task ID format",
      "string.length": "Task ID must be 24 characters",
      "any.required": "Task ID is required",
    }),
  }),
};

const softDeleteTask = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required().messages({
      "string.hex": "Invalid task ID format",
      "string.length": "Task ID must be 24 characters",
      "any.required": "Task ID is required",
    }),
  }),
};

export { createTask, updateTask, getTaskById, softDeleteTask };
