import { create } from "zustand";

const useProductState = create((set) => ({
  products: [],

  // add new products
  addProduct: (newProduct) => {
    set((state) => ({
      products: [...state.products, newProduct],
    }));
  },

  // set products
  setProducts: (products) => {
    set({ products });
  },
}));

export default useProductState;
