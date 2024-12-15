import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { generateAccessAndRefreshTokens } from "../utils/tokenUtils.js";

const checkUniqueEmail = async (email, excludeId = null) => {
  if (email) {
    const emailExists = await User.findOne({ email, _id: { $ne: excludeId } });
    if (emailExists) {
      throw new ApiError(httpStatus.CONFLICT, "Email is already taken.");
    }
  }
};

const getAllUsers = async () => {
  return await User.find().sort({ createdAt: -1 });
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return user;
};

const createUser = async (req) => {
  const { name, email, password } = req.body;
  console.log("body", req.body);
  if (!name) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Name is required.");
  }

  if (!email) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is required.");
  }

  await checkUniqueEmail(email?.trim());

  const userData = {
    name: name.trim(),
    email: email.trim(),
    password: password?.trim() || "",
  };

  const newUser = new User(userData);
  return await newUser.save();
};

const updateUserById = async (id, data) => {
  const { name, email, password } = data;

  const updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (password) updateData.password = password;

  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!updatedUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return updatedUser;
};

const softDeleteUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (user.isDeleted) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User is already deleted");
  }

  user.isDeleted = true;
  await user.save();
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const resultData = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return {
    ...resultData.toObject(),
    accessToken,
    refreshToken,
  };
};

const logout = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "user not found");
  }

  user.refreshToken = null;
  await user.save();

  return true;
};

export {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  softDeleteUserById,
  login,
  logout,
};
