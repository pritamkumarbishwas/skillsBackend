import Joi from "joi";

const createProject = {
  body: Joi.object().keys({
    title: Joi.string().trim().required().messages({
      "string.empty": "Title is required",
      "any.required": "Title is required",
    }),
    description: Joi.string().trim().optional(),
    projectOwner: Joi.string().trim().optional(),
    creationDate: Joi.string().trim().optional(),
  }),
};

const updateProject = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required().messages({
      "string.hex": "Invalid project ID format",
      "string.length": "Project ID must be 24 characters",
      "any.required": "Project ID is required",
    }),
  }),
  body: Joi.object().keys({
    title: Joi.string().trim().optional().messages({
      "string.empty": "Title cannot be empty",
    }),
    description: Joi.string().trim().optional(),
    projectOwner: Joi.string().trim().optional(),
    creationDate: Joi.string().trim().optional(),
  }),
};

const softDeleteProject = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required().messages({
      "string.hex": "Invalid project ID format",
      "string.length": "Project ID must be 24 characters",
      "any.required": "Project ID is required",
    }),
  }),
};

export { createProject, updateProject, softDeleteProject };
