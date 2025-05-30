import express from "express";
import authenticate from "../middlewares/authenticate.js";
import { getAllUsers } from "../controllers/admin.controller.js";
const router = express.Router();

router.get("/users", authenticate, getAllUsers);

export default router;
