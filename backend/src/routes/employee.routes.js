import { Router } from "express";
import { getUnaddedEmployee, getAllEmployees } from "../controllers/employee.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, getAllEmployees);
router.route("/unadded").get(verifyJWT, getUnaddedEmployee);

export default router