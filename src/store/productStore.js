import { create } from "zustand";
import { api } from "../api/api";

export const useProductStore = create((set, get) => ({
  products: [],
  isLoading: false,
  productDetail: null,


  categoryId: null,
  setCategoryId: (id) => set({ categoryId: id }),
  clearCategoryId: () => set({ categoryId: null }),


  getProducts: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get("/products");
      set({ products: res.data });
    } finally {
      set({ isLoading: false });
    }
  },

  getProductsById: async (productId) => {
    set({ isLoading: true });
    try {
      const res = await api.get(`/products/${productId}`);
      set({ productDetail: res.data });
    } finally {
      set({ isLoading: false });
    }
  },

  
  /*getFilteredProducts: () => {
    const { products, categoryId } = get();
    if (!categoryId) return products;
    return products.filter((p) => p?.categories?.id === categoryId);
  },*/
}));
