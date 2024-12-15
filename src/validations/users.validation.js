import Joi from "joi";

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().trim().required().messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),
    email: Joi.string().email().trim().required().messages({
      "string.email": "Email must be a valid email",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
    password: Joi.string().trim().required().messages({
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
  }),
};

const updateUser = {
  body: Joi.object().keys({
    name: Joi.string().trim().optional(),
    email: Joi.string().email().trim().optional().messages({
      "string.email": "Email must be a valid email",
    }),
    password: Joi.string().trim().optional(),
  }),
};

const loginUser = {
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      "string.email": "Email must be a valid email",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
  }),
};

const softDeleteUser = {
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required().messages({
      "string.hex": "Invalid user ID format",
      "string.length": "User ID must be 24 characters",
      "any.required": "User ID is required",
    }),
  }),
};

export { createUser, updateUser, loginUser, softDeleteUser };
