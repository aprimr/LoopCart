import { create } from "zustand";

const useProductState = create((set) => ({
  products: [],

  // add new products
  addProduct: (newProduct) => {
    set((state) => ({
      products: [...state.products, newProduct],
    }));
  },

  // delete product
  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));
  },

  // update product
  updateProduct: (id, updatedItem) => {
    set((state) => {
      const updatedProducts = state.products.map((product) => {
        return product._id === id ? { ...product, ...updatedItem } : product;
      });
      return {
        products: updatedProducts,
      };
    });
  },

  // update product stock
  updateProductStock: (id, newStock) => {
    set((state) => {
      const updatedProducts = state.products.map((product) => {
        if (product._id === id) {
          return {
            ...product,
            stock: parseInt(product.stock) + parseInt(newStock),
          };
        }
        return product;
      });
      return { products: updatedProducts };
    });
  },

  // set products
  setProducts: (products) => {
    set({ products });
  },
}));

export default useProductState;
