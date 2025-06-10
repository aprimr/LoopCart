import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  addNewSlide,
  deleteSlide,
  fetchSlides,
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.post("/new-slide", authenticate, addNewSlide);
router.delete("/slide/:id", authenticate, deleteSlide);
router.get("/slides", authenticate, fetchSlides);

export default router;
