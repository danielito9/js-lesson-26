import { create } from "zustand";
import { api } from "../api/api";

export const useAuthStore = create((set) => ({
  user: null,
  acessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
  isAuth: false,
  profile: null,

  getProfile: async () => {
    const res = await api.get("/profile");
    set({ profile: res.data });
  },

  login: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const res = await api.post("/auth/login", data);

      set({
        user: res.data.user,
        acessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        isAuth: true,
      });

      localStorage.setItem("acessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
    } catch (e) {
      set({ error: e.response?.data?.message || "Login failed" });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      set({ error: e.response?.data?.message || "popa" });
    } finally {
      set({
        user: null,
        acessToken: null,
        refreshToken: null,
        isAuth: false,
        profile: null,
      });
      localStorage.removeItem("acessToken");
      localStorage.removeItem("refreshToken");
    }
  },
  

  register: async (data) => {
    try {
      set({ isLoading: true, error: null });
      await api.post("/auth/register", data);
    } catch (e) {
      set({ error: e.response?.data?.message || "Registretion failed" });
    } finally {
      set({ isLoading: false });
    }
  },
}));
