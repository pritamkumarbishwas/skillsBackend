import * as ProjectsService from "../../services/project.service.js";
import { ApiError } from "../../utils/ApiError.js";
import httpStatus from "http-status";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await ProjectsService.getAllProjects(req);
  return res
    .status(httpStatus.OK)
    .json(
      new ApiResponse(httpStatus.OK, projects, "Projects fetched successfully")
    );
});

const getProjectById = asyncHandler(async (req, res) => {
  const project = await ProjectsService.getProjectById(req.params.id);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
  }
  return res
    .status(httpStatus.OK)
    .json(
      new ApiResponse(httpStatus.OK, project, "Project fetched successfully")
    );
});

const createProject = asyncHandler(async (req, res) => {
  const newProject = await ProjectsService.createProject(req);
  return res
    .status(httpStatus.CREATED)
    .json(
      new ApiResponse(
        httpStatus.CREATED,
        newProject,
        "Project created successfully"
      )
    );
});

const updateProjectById = asyncHandler(async (req, res) => {
  const updatedProject = await ProjectsService.updateProjectById(
    req.params.id,
    req.body
  );
  return res
    .status(httpStatus.OK)
    .json(
      new ApiResponse(
        httpStatus.OK,
        updatedProject,
        "Project updated successfully"
      )
    );
});

const softDeleteProjectById = asyncHandler(async (req, res) => {
  const deletedProject = await ProjectsService.softDeleteProjectById(
    req.params.id
  );
  if (!deletedProject) {
    throw new ApiError(httpStatus.NOT_FOUND, "Project not found");
  }
  return res
    .status(httpStatus.OK)
    .json(new ApiResponse(httpStatus.OK, [], "Project deleted successfully"));
});

export {
  getAllProjects,
  getProjectById,
  createProject,
  updateProjectById,
  softDeleteProjectById,
};
