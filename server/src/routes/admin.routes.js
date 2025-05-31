import express from "express";
const router = express.Router();
import authenticate from "../middlewares/authenticate.js";
import {
  dashboardSummary,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/admin.controller.js";

router.get("/summary", authenticate, dashboardSummary);
router.get("/users", authenticate, getAllUsers);
router.delete("/user/:id", authenticate, deleteUser);
router.put("/user/:id", authenticate, updateUser);

export default router;
