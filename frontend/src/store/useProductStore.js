import { create } from "zustand";
import axios from "../lib/axios.js";

export const useProductStore = create((set, get) => ({
    products: [],
    product: {},
    totalPages: 0,
    loading: false,
    error: null,

    fetchDisplayedProducts: async (page, sort) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`/product/displayedProduct`, {
                params: {
                    page: page,
                    ...(sort && { sort })
                }
            });
            set({ products: response.data.data, totalPages: response.data.totalPages });

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
    },
    fetchCategory: async (category) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`product/category/${category}`);
            set({ products: response.data.data })
        } catch (error) {
            if (error.response && error.response.status === 404) {
                set({ products: [] });
            }
            else {
                set({ error: error.response.data.message });
            }

        } finally {
            set({ loading: false });

        }
    }
}))