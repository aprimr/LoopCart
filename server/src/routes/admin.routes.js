import express from "express";
const router = express.Router();
import authenticate from "../middlewares/authenticate.js";
import {
  dashboardSummary,
  deleteUser,
  getAllUsers,
} from "../controllers/admin.controller.js";

router.get("/summary", authenticate, dashboardSummary);
router.get("/users", authenticate, getAllUsers);
router.delete("/user/:id", authenticate, deleteUser);
export default router;
