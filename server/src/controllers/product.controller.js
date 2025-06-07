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

export { addProduct, getAllProducts };
