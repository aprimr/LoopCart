import { create } from "zustand";

const useDashboardState = create((set) => ({
  totalUsers: 0,
  totalOrders: 0,
  totalProducts: 0,
  totalSales: 0,

  updateUser: (users) =>
    set({
      totalUsers: users,
    }),

  updateOrders: (orders) =>
    set({
      totalOrders: orders,
    }),

  updateProducts: (products) =>
    set({
      totalProducts: products,
    }),

  updateSales: (sales) =>
    set({
      totalSales: sales,
    }),
}));

export default useDashboardState;
