import { useEffect, useState } from "react";
import {
  Package,
  Search,
  X,
  Plus,
  Edit2,
  Trash2,
  Archive,
  Loader2,
  Upload,
} from "lucide-react";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { FaArrowTrendDown } from "react-icons/fa6";
import { toast } from "sonner";
import axios from "../../services/axios";
import { imgToBase64 } from "../../utils/imgToBase64";
import useProductState from "../../store/productStore";
import calcDiscountedPrice from "../../utils/calcDiscountedPrice";
import Pagination from "../../components/Pagination";
import ProductManagementSkeleton from "../../components/Skeletons/ProductManagementSkeleton";

function ProductManagement() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [addProductLoading, setAddProductLoading] = useState(false);

  // products store
  const products = useProductState((state) => state.products);
  const setProducts = useProductState((state) => state.setProducts);
  const addProduct = useProductState((state) => state.addProduct);
  const updateProductStock = useProductState(
    (state) => state.updateProductStock
  );
  const deleteProduct = useProductState((state) => state.deleteProduct);

  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // filter products
  useEffect(() => {
    if (search) {
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(search)
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [search, products]);

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentProducts = filteredProducts.slice(firstIndex, lastIndex);

  // add product states
  const [productImage, setProductImage] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [category, setCategory] = useState("electronics");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState("");
  const [sizes, setSizes] = useState("");
  const [colors, setColors] = useState("");
  const [description, setDescription] = useState("");
  const [sponsoredProduct, setSponsoredProduct] = useState(false);
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [cashOnDelivery, setCashOnDelivery] = useState(false);

  // edit product states
  const [editProductLoading, setEditProductLoading] = useState(false);
  const [updateStockLoading, setUpdateStockLoading] = useState(false);
  const [editProductId, setEditProductId] = useState("");
  const [editProductImage, setEditProductImage] = useState("");
  const [editProductTitle, setEditProductTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDiscount, setEditDiscount] = useState("");
  const [editStock, setEditStock] = useState("");
  const [editSizes, setEditSizes] = useState([]);
  const [editColors, setEditColors] = useState([]);
  const [editDescription, setEditDescription] = useState("");
  const [editSponsoredProduct, setEditSponsoredProduct] = useState(false);
  const [editFreeDelivery, setEditFreeDelivery] = useState(false);
  const [editCashOnDelivery, setEditCashOnDelivery] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/product/fetch");
        setProducts(res.data.products);
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to fetch products");
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return toast.error("Please select an image");

    const fileSize = 200 * 1024; //200 KB
    if (file.size > fileSize) {
      return toast.error("File size must be less than 200 KB");
    }

    try {
      const base64 = await imgToBase64(file);
      setProductImage(base64);
      setEditProductImage(base64);
    } catch (error) {
      console.error(error);
    }
  };

  const handlecloseModal = () => {
    setShowAddProduct(false);
    setShowEditProduct(false);
    setAddProductLoading(false);
    setProductImage("");
    setProductTitle("");
    setCategory("");
    setPrice("");
    setDiscount("");
    setStock("");
    setSizes("");
    setColors("");
    setDescription("");
    setSponsoredProduct(false);
    setFreeDelivery(false);
    setCashOnDelivery(false);

    setEditProductLoading(false);
    setUpdateStockLoading(false);
    setEditProductImage("");
    setEditProductTitle("");
    setEditCategory("");
    setEditPrice("");
    setEditDiscount("");
    setEditStock("");
    setEditSizes("");
    setEditColors("");
    setEditDescription("");
    setEditSponsoredProduct(false);
    setEditFreeDelivery(false);
    setEditCashOnDelivery(false);
  };

  const handleAddProduct = async () => {
    setAddProductLoading(true);
    console.log();

    // Validate required fields
    if (
      !productImage ||
      !productTitle ||
      !category ||
      !price ||
      !stock ||
      !description
    ) {
      toast.error("All fields are required");
      setAddProductLoading(false);
      return;
    }

    // separate sizes and colors
    let sizeArray = [];
    let colorArray = [];
    if (sizes)
      sizeArray = sizes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    if (colors)
      colorArray = colors
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);

    const productDetails = {
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
    };

    try {
      const response = await axios.post("/product/add", productDetails);

      if (response.status === 201) {
        addProduct(productDetails);
        toast.success("Product added successfully");
        handlecloseModal();
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Add product error:", error);
      toast.error("Failed to add product");
    } finally {
      setAddProductLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await axios.delete(`/product/${id}`);
      if (res.status === 200) {
        toast.success("Product deleted successfully");
        deleteProduct(id);
      }
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleEditProduct = (id) => {
    setShowEditProduct(true);
    try {
      const product = products.find((p) => p._id === id);

      setEditProductId(product._id);
      setEditProductImage(product.image);
      setEditProductTitle(product.title);
      setEditCategory(product.category);
      setEditPrice(product.price);
      setEditDiscount(product.discount);
      setEditSizes(product.sizes);
      setEditColors(product.colors);
      setEditDescription(product.description);
      setEditSponsoredProduct(product.isSponsored);
      setEditFreeDelivery(product.hasFreeDelivery);
      setEditCashOnDelivery(product.hasCOD);
    } catch (error) {
      toast.error("Failed to edit product");
    }
  };

  const handleAddNewStock = async () => {
    setUpdateStockLoading(true);

    if (!editStock) {
      toast.error("Please enter a stock value");
      setUpdateStockLoading(false);
      return;
    }

    if (editStock <= 0) {
      toast.error("Stock value must be greater than 0");
      setUpdateStockLoading(false);
      return;
    }

    try {
      const response = await axios.post("/product/addNewStock", {
        id: editProductId,
        newStock: editStock,
      });
      if (response.status === 200) {
        toast.success("Stock updated successfully");
        updateProductStock(editProductId, editStock);
        setEditStock("");
        setUpdateStockLoading(false);
      }
    } catch (error) {
      toast.error("Failed to update stock");
      setUpdateStockLoading(false);
    }
  };

  const handleUpdateProduct = () => {
    setEditProductLoading(true);
    const editedProduct = {
      productImage: editProductImage,
      productTitle: editProductTitle,
      category: editCategory,
      price: editPrice,
      discount: editDiscount,
      sizes: editSizes,
      colors: editColors,
      description: editDescription,
      sponsoredProduct: editSponsoredProduct,
      freeDelivery: editFreeDelivery,
      cashOnDelivery: editCashOnDelivery,
    };
    console.log(editedProduct);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-all duration-300 select-none">
      <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-4xl font-semibold font-poppins text-gray-900 dark:text-white">
                  Product Management
                </h1>
              </div>
            </div>
          </div>
        </div>
        {/* Search Input and Add Product Button */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6 md:mb-8">
          {/* Search Input */}
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by title..."
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base text-gray-900 dark:text-white shadow-sm"
              value={search}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Add Product Button */}
          <button
            onClick={() => {
              setShowAddProduct(true);
            }}
            className="flex items-center justify-center px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-md transition-transform duration-200 hover:scale-105 text-sm md:text-base"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Product
          </button>
        </div>

        {/* All Products */}
        {isLoading ? (
          <ProductManagementSkeleton />
        ) : (
          <div className="grid gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentProducts.map((product) => (
              <div
                key={product["_id"]}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-md md:shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden transform hover:scale-[1.02]"
              >
                <div className="p-3 sm:p-4 md:p-6">
                  {/* Product Image */}
                  <div className="relative mb-3 md:mb-4">
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg md:rounded-xl overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.slug}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Sponsored Badge */}
                    {product.isSponsored && (
                      <div
                        title="Sponsored"
                        className="absolute top-2 left-2 p-1 text-white bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-md z-10"
                      >
                        <HiOutlineSpeakerphone className="w-4 h-4 -rotate-12" />
                      </div>
                    )}

                    {/* Action Buttons (Edit & Delete) */}
                    <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 flex gap-1 md:gap-2">
                      <button
                        onClick={() => handleEditProduct(product._id)}
                        className="p-1.5 md:p-2 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 shadow-lg rounded-md md:rounded-lg transition-all duration-200 sm:opacity-0 sm:group-hover:opacity-100 opacity-100 sm:transform sm:translate-y-2 sm:group-hover:translate-y-0"
                      >
                        <Edit2 className="h-3 w-3 md:h-4 md:w-4 text-gray-700 dark:text-gray-300" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="p-1.5 md:p-2 bg-red-500/90 hover:bg-red-600 shadow-lg rounded-md md:rounded-lg transition-all duration-200 text-white sm:opacity-0 sm:group-hover:opacity-100 opacity-100 sm:transform sm:translate-y-2 sm:group-hover:translate-y-0"
                      >
                        <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Product Information */}
                  <div className="space-y-2 md:space-y-3">
                    <div>
                      <div className="flex justify-between items-center gap-2">
                        {/* Product Title */}
                        <h3 className="font-semibold font-poppins text-sm sm:text-base md:text-xl text-gray-900 dark:text-white mb-1.5 md:mb-2 truncate flex-1">
                          {product.title}
                        </h3>

                        {/* Discount Badge */}
                        {product.discount > 0 && (
                          <span className="inline-flex items-center px-1 py-0.5 rounded-sm bg-rose-100/80 text-rose-600 text-xs font-medium font-poppins dark:bg-rose-600/90 dark:text-white">
                            {product.discount}% OFF
                          </span>
                        )}
                      </div>

                      {/* Category and Stock Status Badges */}
                      <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
                        <span
                          className={`inline-flex items-center px-2 md:px-3 py-0.5 md:py-1 text-xs font-medium capitalize bg-blue-200 text-blue-900 border border-blue-400 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 rounded-full`}
                        >
                          {product.category}
                        </span>

                        {product.stock < 5 && (
                          <span className="inline-flex items-center gap-1 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs font-medium border bg-rose-200 text-rose-800 border-rose-300 dark:bg-rose-600/50 dark:text-rose-100 dark:border-rose-600/50">
                            <FaArrowTrendDown className="w-3 h-3 md:w-3.5 md:h-3.5 shrink-0" />
                            Low Stock
                          </span>
                        )}
                      </div>

                      {/* Sizes */}
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 md:mb-2">
                        <span className="font-medium mr-2">Sizes:</span>
                        {Array.isArray(product.sizes) &&
                        product.sizes.length > 0 ? (
                          product.sizes.map((s, index) => (
                            <span
                              key={index}
                              className="mr-1 bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 text-xs rounded capitalize"
                            >
                              {s}
                            </span>
                          ))
                        ) : (
                          <span className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 text-xs rounded">
                            N/A
                          </span>
                        )}
                      </p>

                      {Array.isArray(product.colors) &&
                      product.colors.length > 0 ? (
                        <div className="text-sm text-gray-600 dark:text-gray-300 mb-1 md:mb-2">
                          <div className="flex flex-wrap gap-1">
                            <span className="font-medium mr-2">Colors:</span>
                            {product.colors.map((c, index) => (
                              <span
                                key={index}
                                className="mr-1 bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 text-xs rounded capitalize"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 md:mb-2">
                          <span className="font-medium mr-2">Colors:</span>
                          <span className="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 text-xs rounded">
                            N/A
                          </span>
                        </p>
                      )}

                      {/* Service Badges */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {/* Free Delivery badge */}
                        {product.hasFreeDelivery && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                            Free Delivery
                          </span>
                        )}
                        {/* COD badge */}
                        {product.hasCOD && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
                            COD
                          </span>
                        )}
                      </div>
                      {/* Product Description */}
                      <p className="text-gray-600 dark:text-gray-300 dark:border-gray-700 text-xs sm:text-sm line-clamp-2 mb-2 md:mb-4">
                        {product.description}
                      </p>
                    </div>

                    {/* Price and Stock */}
                    <div className="flex items-center justify-between pt-2 md:pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-0.5 md:gap-1">
                        <div className="text-blue-600 dark:text-blue-400 flex items-center justify-between font-bold font-rubik">
                          <div className="text-xl">
                            रु{" "}
                            <span className="text-xl text-gray-900 dark:text-white font-semibold">
                              {calcDiscountedPrice(
                                product.price,
                                product.discount
                              )}
                            </span>{" "}
                            {product.discount != null &&
                              product.discount != 0 && (
                                <span className="ml-2 text-xs text-rose-400 line-through font-normal">
                                  रु{product.price}
                                </span>
                              )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700/40 text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-medium">
                        <Archive className="w-4 h-4  text-gray-500 dark:text-gray-400" />
                        <span>{`${product.stock} Left`}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredProducts.length > itemsPerPage && (
          <div className="w-full flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalItems={filteredProducts.length}
              itemsPerPage={itemsPerPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}

        {/* No Products Found*/}
        {currentProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="relative inline-flex mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-xl animate-pulse" />
              <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 shadow-md">
                <Package className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
              No products found
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or add a new product.
            </p>
          </div>
        )}

        {/* Add Product Modal*/}
        {showAddProduct && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Add New Product
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Fill in the details for your new product
                    </p>
                  </div>
                  <button
                    onClick={handlecloseModal}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="space-y-6 font-poppins">
                  {/* Image Upload */}
                  <div className="text-center">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-4">
                      Product Image *
                    </label>
                    <div className="w-48 h-48 mx-auto">
                      <div className="w-full h-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center cursor-pointer relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                        {productImage ? (
                          <>
                            <img
                              src={productImage}
                              className="object-cover w-full h-full rounded-xl"
                            />
                            <button
                              onClick={() => setProductImage(null)}
                              className="absolute top-2 right-2 p-1.5 md:p-2 bg-red-500/90 hover:bg-red-600 shadow-lg rounded-md md:rounded-lg transition-all duration-200 text-white"
                            >
                              <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <Upload className="h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center px-4">
                              Upload Image
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 text-center px-4 mt-1">
                              PNG, JPG max 5MB
                            </p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e)}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Product Title *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm md:text-base transition-all duration-200 placeholder-gray-400"
                        placeholder="Enter Product Title"
                        value={productTitle}
                        onChange={(e) => setProductTitle(e.target.value)}
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Category *
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm md:text-base cursor-pointer"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="electronics">Electronics</option>
                        <option value="mobile">Mobiles</option>
                        <option value="fashion">Fashion</option>
                        <option value="groceries">Groceries</option>
                        <option value="sports">Sports</option>
                        <option value="beauty">Beauty</option>
                        <option value="games">Games</option>
                        <option value="books">Books</option>
                        <option value="furniture">Furniture</option>
                      </select>
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Price *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm md:text-base transition-all duration-200 placeholder-gray-400"
                        placeholder="Enter price"
                        min="0"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>

                    {/* Discount */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Discount (%)
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm md:text-base transition-all duration-200 placeholder-gray-400"
                        placeholder="Enter discount"
                        min="0"
                        max="100"
                        value={discount}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (value >= 0 && value <= 100) {
                            setDiscount(value);
                          }
                        }}
                      />
                    </div>

                    {/* Stock */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Stock Quantity *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm md:text-base transition-all duration-200 placeholder-gray-400"
                        placeholder="Enter stock quantity"
                        min="0"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                      />
                    </div>

                    {/* Sizes */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Available Sizes
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm md:text-base transition-all duration-200 placeholder-gray-400"
                        placeholder="e.g., S, M, L, XL"
                        value={sizes}
                        onChange={(e) => setSizes(e.target.value.toUpperCase())}
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Separate multiple sizes with commas
                      </p>
                    </div>

                    {/* Colors */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Available Colors
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm md:text-base transition-all duration-200 placeholder-gray-400"
                        placeholder="e.g., Red, Blue, Black"
                        value={colors}
                        onChange={(e) =>
                          setColors(e.target.value.toUpperCase())
                        }
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Separate multiple colors with commas
                      </p>
                    </div>

                    {/* Service Options (Static for now) */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        Service Options
                      </label>
                      <div className="flex flex-wrap gap-6">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={sponsoredProduct}
                            onChange={(e) => {
                              setSponsoredProduct(e.target.checked);
                            }}
                            className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600"
                          />
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            Sponsored Product
                          </span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={freeDelivery}
                            onChange={(e) => {
                              setFreeDelivery(e.target.checked);
                            }}
                            className="w-4 h-4 text-green-600 bg-white border-gray-300 rounded focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600"
                          />
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            Free Delivery
                          </span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={cashOnDelivery}
                            onChange={(e) => {
                              setCashOnDelivery(e.target.checked);
                            }}
                            className="w-4 h-4 text-orange-600 bg-white border-gray-300 rounded focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-orange-600"
                          />
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            Cash on Delivery
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Description
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white resize-none text-sm md:text-base transition-all duration-200 placeholder-gray-400"
                        placeholder="Enter product description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="grid grid-cols-2 gap-4 flex-col sm:flex-row">
                  <button
                    onClick={handlecloseModal}
                    className="flex-1 px-6 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddProduct}
                    disabled={addProductLoading}
                    className="flex-1 w-full justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {addProductLoading ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5" />
                      </>
                    ) : (
                      "Add Product"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Product Modal */}
        {showEditProduct && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Update Product
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Update the details for your product
                    </p>
                  </div>
                  <button
                    onClick={handlecloseModal}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="space-y-6 font-poppins">
                  {/* Image Upload */}
                  <div className="text-center">
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-4">
                      Product Image *
                    </label>
                    <div className="w-48 h-48 mx-auto">
                      <div className="w-full h-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex flex-col items-center justify-center cursor-pointer relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                        {editProductImage ? (
                          <>
                            <img
                              src={editProductImage}
                              className="object-cover w-full h-full rounded-xl"
                            />
                            <button
                              onClick={() => setEditProductImage(null)}
                              className="absolute top-2 right-2 p-1.5 md:p-2 bg-red-500/90 hover:bg-red-600 shadow-lg rounded-md md:rounded-lg transition-all duration-200 text-white"
                            >
                              <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <Upload className="h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center px-4">
                              Upload Image
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 text-center px-4 mt-1">
                              PNG, JPG max 5MB
                            </p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e)}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Product Title *
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm md:text-base transition-all duration-200 placeholder-gray-400"
                        placeholder="Enter Product Title"
                        value={editProductTitle}
                        onChange={(e) => setEditProductTitle(e.target.value)}
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Category *
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm md:text-base cursor-pointer"
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                      >
                        <option value="electronics">Electronics</option>
                        <option value="mobile">Mobiles</option>
                        <option value="fashion">Fashion</option>
                        <option value="groceries">Groceries</option>
                        <option value="sports">Sports</option>
                        <option value="beauty">Beauty</option>
                        <option value="games">Games</option>
                        <option value="books">Books</option>
                        <option value="furniture">Furniture</option>
                      </select>
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Price *
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm md:text-base transition-all duration-200 placeholder-gray-400"
                        placeholder="Enter price"
                        min="0"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                      />
                    </div>

                    {/* Discount */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Discount (%)
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm md:text-base transition-all duration-200 placeholder-gray-400"
                        placeholder="Enter discount"
                        min="0"
                        max="100"
                        value={editDiscount || ""}
                        onChange={(e) => {
                          if (e.target.value > 99) {
                            return toast.error(
                              "Discount cannot be greater than 100%"
                            );
                          }
                          setEditDiscount(e.target.value);
                        }}
                      />
                    </div>

                    {/* Stock */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Update Stock Quantity *
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          className="w-full pr-24 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm md:text-base transition-all duration-200 placeholder-gray-400"
                          placeholder="Enter new stock quantity"
                          min="0"
                          value={editStock}
                          onChange={(e) => setEditStock(e.target.value)}
                          disabled={updateStockLoading}
                        />
                        <button
                          onClick={handleAddNewStock}
                          disabled={updateStockLoading}
                          className="absolute top-1/2 right-2 transform -translate-y-1/2 px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200"
                        >
                          {updateStockLoading ? (
                            <>
                              <Loader2 className="animate-spin h-5 w-5" />
                            </>
                          ) : (
                            "Add New Stock"
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Sizes */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Available Sizes
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm md:text-base transition-all duration-200 placeholder-gray-400"
                        placeholder="e.g., S, M, L, XL"
                        value={editSizes}
                        onChange={(e) =>
                          setEditSizes(e.target.value.toUpperCase())
                        }
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Separate multiple sizes with commas
                      </p>
                    </div>

                    {/* Colors */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Available Colors
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white text-sm md:text-base transition-all duration-200 placeholder-gray-400"
                        placeholder="e.g., Red, Blue, Black"
                        value={editColors}
                        onChange={(e) =>
                          setEditColors(e.target.value.toUpperCase())
                        }
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Separate multiple colors with commas
                      </p>
                    </div>

                    {/* Service Options (Static for now) */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        Service Options
                      </label>
                      <div className="flex flex-wrap gap-6">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editSponsoredProduct}
                            onChange={(e) => {
                              setEditSponsoredProduct(e.target.checked);
                            }}
                            className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600"
                          />
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            Sponsored Product
                          </span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editFreeDelivery}
                            onChange={(e) => {
                              setEditFreeDelivery(e.target.checked);
                            }}
                            className="w-4 h-4 text-green-600 bg-white border-gray-300 rounded focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600"
                          />
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            Free Delivery
                          </span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editCashOnDelivery}
                            onChange={(e) => {
                              setEditCashOnDelivery(e.target.checked);
                            }}
                            className="w-4 h-4 text-orange-600 bg-white border-gray-300 rounded focus:ring-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-orange-600"
                          />
                          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            Cash on Delivery
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Description
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white resize-none text-sm md:text-base transition-all duration-200 placeholder-gray-400"
                        placeholder="Enter product description"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="grid grid-cols-2 gap-4 flex-col sm:flex-row">
                  <button
                    onClick={handlecloseModal}
                    className="flex-1 px-6 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateProduct}
                    disabled={editProductLoading}
                    className="flex-1 w-full justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {editProductLoading ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5" />
                      </>
                    ) : (
                      "Update Product"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductManagement;
