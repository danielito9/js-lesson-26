import { create } from "zustand";
import { api } from "../api/api";

export const useCartStore = create((set) => ({
    cart:[],
    isLoading:false,
    getCart:async() => {
        set({isLoading: true})
        const res = await api.get("/cart")
        set({cart:res.data, isLoading:false})
    },
    addCart: async (productId) => {
        set({ isLoading: true });
      
        try {
          await api.post("/cart", { productId });
          const res = await api.get("/cart");
          set({ cart: res.data });
        } catch (err) {
          console.error(err);
        } finally {
          set({ isLoading: false });
        }
      },
    removeCart: async(productId) => {
      try{
        set({ isLoading: true });
        await api.delete(`/cart/${productId}`)
        set((state) => ({
            cart:state.cart.filter((item) => item.product.id !== productId)
        }))
      } catch (err) {
        console.error(err);
      } finally {
        set({ isLoading: false });
      }
     
    }
}))