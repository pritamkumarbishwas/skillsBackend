import { Router } from "express";
import * as ProjectsController from "../../controllers/users/project.controller.js";
import * as ProjectsValidation from "../../validations/projects.validation.js";
import validate from "../../middlewares/validate.js";
import { verifyJWT } from "../../middlewares/users.auth.middleware.js";
const router = Router();

router.get("/projects", verifyJWT, ProjectsController.getAllProjects);

router.get("/projects/:id", verifyJWT, ProjectsController.getProjectById);

router.post(
  "/projects",
  verifyJWT,
  validate(ProjectsValidation.createProject),
  ProjectsController.createProject
);

router.put(
  "/projects/:id",
  validate(ProjectsValidation.updateProject),
  ProjectsController.updateProjectById
);

router.delete(
  "/projects/:id",
  validate(ProjectsValidation.softDeleteProject),
  ProjectsController.softDeleteProjectById
);

export default router;
