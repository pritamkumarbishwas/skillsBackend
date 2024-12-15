import { Router } from "express";
import * as UsersController from "../../controllers/users/users.controller.js";
import * as UsersValidation from "../../validations/users.validation.js";
import validate from "../../middlewares/validate.js";
import { verifyJWT } from "../../middlewares/users.auth.middleware.js";

const router = Router();

router.get("/users", verifyJWT, UsersController.getAllUsers);

router.get(
  "/users/:id",
  verifyJWT,
  validate(UsersValidation.getUserById),
  UsersController.getUserById
);

router.post(
  "/users/register",
  // validate(UsersValidation.createUser),
  UsersController.registerUser
);

router.delete(
  "/users/:id",
  verifyJWT,
  validate(UsersValidation.softDeleteUserById),
  UsersController.softDeleteUserById
);

router.post(
  "/users/login",
  validate(UsersValidation.login),
  UsersController.login
);

router.post("/users/logout", verifyJWT, UsersController.logout);

export default router;
