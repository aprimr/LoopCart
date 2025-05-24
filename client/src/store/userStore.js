import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useUserState = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLogined: false,

        login: (userData) => set({ user: userData, isLogined: true }),

        logout: () => set({ user: null, isLogined: false }),

        updateUser: (newData) =>
          set((state) => ({
            user: { ...state.user, ...newData },
          })),
      }),
      {
        name: "user-storage", // localStorage key
      }
    ),
    {
      name: "UserStore", // Shown in Redux DevTools
    }
  )
);

export default useUserState;
