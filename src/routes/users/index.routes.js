import { Router } from "express";

import usersRoute from "./users.routes.js";
import projectRoute from "./projects.routes.js";
import tasksRoute from "./tasks.routes.js";

const router = Router();

// Mount the routes
router.use("/", usersRoute);
router.use("/", projectRoute);
router.use("/tasks", tasksRoute);

export default router;
