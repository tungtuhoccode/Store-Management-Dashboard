import { create } from "zustand";
import axios from "../lib/axios.js";

export const useProductStore = create((set, get) => ({
    products: [],
    product: {},
    loading: false,
    error: null,

    fetchDisplayedProducts: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get("/product/displayedProduct");
            set({ products: response.data.data });

        } catch (error) {
            if (error.response && error.response.status === 404) {
                set({ error: "Currently no product being displayed" });
            } else {
                set({ error: error.response.data.message });

            }
        } finally {
            set({ loading: false });
        }

    },

    fetchFeaturedProducts: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get("/product/featuredProduct");
            set({ products: response.data.data })

        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ loading: false });
        }
    },

    fetchAProduct: async (productId) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`product/${productId}`)
            set({ product: response.data.data[0] })
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ loading: false });
        }
    }
}))