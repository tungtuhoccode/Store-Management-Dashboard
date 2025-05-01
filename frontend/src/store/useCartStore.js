import { create } from "zustand";
import axios from "../lib/axios.js";



export const useCartStore = create((set, get) => ({
    cart: [],
    coupon: null,
    totalCartItem: 0,
    total: 0,
    subtotal: 0,
    loading: false,
    error: null,

    getCartItems: async () => {

        set({ loading: true, error: null });
        try {
            const response = await axios.get("/cart");

            set({
                cart: response.data.data,
                totalCartItem: response.data.data.reduce((sum, item) => {
                    return sum + item.quantity;
                }, 0),
                subtotal: response.data.data.reduce((sum, item) => {
                    return sum + (item.quantity * item.price);
                }, 0),
            });

        } catch (error) {
            if (error.response?.status === 404) {
                set({ cart: [], totalCartItem: 0 });
            } else {
                set({ error: error.response?.data?.message || "Something went wrong" });
            }
        } finally {
            set({ loading: false });
        }
    },
    addToCart: async (productId) => {
        set({ loading: true, error: null });
        try {
            await axios.post("/cart", { productId: productId });
            get().getCartItems();

        } catch (error) {
            set({ error: error.response?.data.message });
        } finally {
            set({ loading: false });
        }
    },

    deleteFromCart: async (productId) => {
        set({ loading: true, error: null });
        try {
            await axios.delete("/cart", { data: { productId: productId } });
            get().getCartItems();
        } catch (error) {
            set({ error: error.response?.data.message });
        } finally {
            set({ loading: false });
        }
    },
    updateCart: async (updates) => {
        set({ loading: true, error: null });
        try {
            const updatesArray = Object.entries(updates).map(([id, quantity]) => ({
                productId: id,
                updateQuantity: quantity
            }))
            await axios.put(`cart`, { updates: updatesArray });
            get().getCartItems();
        } catch (error) {
            set({ error: error.response?.data.message });
        } finally {
            set({ loading: false });
        }
    }
}))