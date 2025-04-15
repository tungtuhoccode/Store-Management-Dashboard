import { create } from "zustand";
import axios from "../lib/axios.js";

export const useProductStore = create((set, get) => ({
    products: [],
    loading: false,
    error: null,


    fetchFeaturedProducts: async () => {
        set({ loading: true });
        try {
            const response = await axios.get("/product/featuredProduct");
            set({products: response.data.data})

        } catch (error) {
            set({error: error.response.data.message});
        } finally {
            set({ loading: false });
        }
    }
}))