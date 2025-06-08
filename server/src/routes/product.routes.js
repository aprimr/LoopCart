import express from "express";
import {
  addNewStock,
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/add", authenticate, addProduct);
router.delete("/:id", authenticate, deleteProduct);
router.post("/addNewStock", authenticate, addNewStock);
router.put("/:id", authenticate, updateProduct);
router.get("/fetch", authenticate, getAllProducts);

export default router;
