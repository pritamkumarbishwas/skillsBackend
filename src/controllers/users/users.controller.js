import * as UsersService from "../../services/user.service.js";
import { ApiError } from "../../utils/ApiError.js";
import httpStatus from "http-status";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await UsersService.getAllUsers();
  return res
    .status(httpStatus.OK)
    .json(new ApiResponse(httpStatus.OK, users, "Users fetched successfully"));
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await UsersService.getUserById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return res
    .status(httpStatus.OK)
    .json(new ApiResponse(httpStatus.OK, user, "User fetched successfully"));
});

const registerUser = asyncHandler(async (req, res) => {
  const newUser = await UsersService.createUser(req);
  return res
    .status(httpStatus.CREATED)
    .json(
      new ApiResponse(httpStatus.CREATED, newUser, "User created successfully")
    );
});

const updateUserById = asyncHandler(async (req, res) => {
  const updatedUser = await UsersService.updateUserById(
    req.params.id,
    req.body
  );

  return res
    .status(httpStatus.OK)
    .json(
      new ApiResponse(httpStatus.OK, updatedUser, "Users updated successfully")
    );
});

const softDeleteUserById = asyncHandler(async (req, res) => {
  const deletedUser = await UsersService.softDeleteUserById(req.params.id);
  if (!deletedUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  return res
    .status(httpStatus.OK)
    .json(new ApiResponse(httpStatus.OK, [], "User deleted successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const response = await UsersService.login(email, password);

  return res
    .status(httpStatus.OK)
    .json(new ApiResponse(httpStatus.OK, response, "Login successfully"));
});

const logout = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const response = await UsersService.logout(userId);

  return res
    .status(httpStatus.OK)
    .json(new ApiResponse(httpStatus.OK, {}, "Logout successful"));
});

export {
  registerUser,
  getAllUsers,
  getUserById,
  updateUserById,
  softDeleteUserById,
  login,
  logout,
};
