import express from "express";
import {
  addProduct,
  getAllProducts,
} from "../controllers/product.controller.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/add", authenticate, addProduct);
router.get("/fetch", authenticate, getAllProducts);

export default router;
