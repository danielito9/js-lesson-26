import { create } from "zustand";
import { api } from "../api/api";

export const useCategories = create((set) => ({
  categories: [],
  isLoading: false,

  getCategories: async () => {
    set({ isLoading: true });
    const res = await api.get("/categories");
    set({ categories: res.data, isLoading: false });
  },

  createCategories: async (title) => {
    const res = await api.post("/categories/create", { title });
    set((state) => ({
      categories: [...state.categories, res.data],
    }));
  },
}));
