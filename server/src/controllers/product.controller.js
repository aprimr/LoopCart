import slugify from "slugify";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

const addProduct = async (req, res) => {
  const id = req.user.id;
  try {
    const {
      productImage,
      productTitle,
      category,
      price,
      discount,
      stock,
      sizeArray,
      colorArray,
      description,
      sponsoredProduct,
      freeDelivery,
      cashOnDelivery,
    } = req.body;

    // check the role
    const currentUser = await User.findById({ _id: id });
    if (currentUser.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });

    if (
      !productImage ||
      !productTitle ||
      !category ||
      !price ||
      !stock ||
      !description
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const slug = slugify(productTitle, { lower: true, strict: true });

    const newProduct = new Product({
      title: productTitle,
      slug,
      description,
      image: productImage,
      category,
      price,
      discount,
      stock,
      sizes: sizeArray,
      colors: colorArray,
      isSponsored: sponsoredProduct,
      hasFreeDelivery: freeDelivery,
      hasCOD: cashOnDelivery,
    });

    const savedProduct = await newProduct.save();

    return res.status(201).json({
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await Product.deleteOne({ _id: id });
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const addNewStock = async (req, res) => {
  const { id, newStock } = req.body;
  const user = req.user.id;
  try {
    // check the role
    const currentUser = await User.findById({ _id: user });
    if (currentUser.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });

    // check product
    const product = await Product.findById({ _id: id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      { $inc: { stock: newStock } }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: "Product not found: Error updating stock" });
    }

    return res.status(200).json({ message: "Stock updated successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allproducts = await Product.find({});
    return res.status(200).json({
      message: "Products fetched successfully",
      products: allproducts,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export { addProduct, getAllProducts, deleteProduct, addNewStock };
