import { Router } from "express";
import {
    addEmployee,
    updateEmployee,
    deleteEmployee
} from "../controllers/admin.controller.js"

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add/:id").post(verifyJWT, addEmployee);
router.route("/update/:id").put(verifyJWT, updateEmployee);
router.route("/delete/:id").delete(verifyJWT, deleteEmployee);

export default router