import { Project } from "../models/project.model.js";
import { ApiError } from "../utils/ApiError.js";
import httpStatus from "http-status";

const getAllProjects = async (req) => {
  const userId = req.user.id;
  return await Project.find({ userId, isDeleted: false }).sort({
    createdAt: -1,
  });
};

const getProjectById = async (id) => {
  const project = await Project.findOne({ _id: id, isDeleted: false });
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
  }
  return project;
};

const createProject = async (req) => {
  const { title, description, projectOwner, creationDate } = req.body;
  const userId = req.user.id;

  if (!title?.trim()) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Title is required.");
  }

  const projectData = {
    title: title.trim(),
    userId,
    description: description?.trim() || "",
    projectOwner: projectOwner?.trim() || "",
    creationDate: creationDate || Date.now(),
  };

  const newProject = new Project(projectData);
  return await newProject.save();
};

const updateProjectById = async (id, data) => {
  const { title, description, projectOwner, creationDate } = data;

  const updateData = {};
  if (title) {
    updateData.title = title.trim();
  }
  if (description) updateData.description = description.trim();
  if (projectOwner) updateData.projectOwner = projectOwner.trim();
  if (creationDate) updateData.creationDate = creationDate;

  const updatedProject = await Project.findOneAndUpdate(
    { _id: id, isDeleted: false },
    updateData,
    { new: true }
  );
  if (!updatedProject) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
  }
  return updatedProject;
};

const softDeleteProjectById = async (id) => {
  const project = await Project.findOne({ _id: id, isDeleted: false });
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
  }

  if (project.isDeleted) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Project is already deleted");
  }

  project.isDeleted = true;
  await project.save();
  return project;
};

export {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  softDeleteProjectById,
};
