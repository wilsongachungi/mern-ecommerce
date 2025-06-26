import express from "express";
const router = express.Router()
import { authenticate, authorizedAdmin } from '../middleware/authMiddleware.js'
import { createCategory } from "../controllers/categoryController.js";

router.route("/").post(createCategory);

export default router;