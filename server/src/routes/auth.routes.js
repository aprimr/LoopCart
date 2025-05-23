import express from "express";
import { getUser, login, signup } from "../controllers/auth.controller.js";
import authenticate from "../middlewares/authenticate.js";
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/get-user", authenticate, getUser);

export default router;
