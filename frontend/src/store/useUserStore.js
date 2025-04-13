import { create } from "zustand"
import axios from "../lib/axios.js"
import { toast } from "react-hot-toast"

export const useUserStore = create((set, get) => ({
    user: {
        email: "",
        userName: ""
    },
    loading: false,
    error: null,
    checkingAuth: true,

    signIn: async ({ email, password }) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post("/auth/login", { email, password });
            set({ user: { email: response.data.data.email, userName: response.data.data.name } })

        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ loading: false });
        }
    },
   

    checkAuth: async () => {
        set({ checkingAuth: true });
        try {
            const response = await axios.get("/auth/profile");
            set({ user: { email: response.data.data.email, userName: response.data.data.name } });
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ checkingAuth: false });
            set({ error: null })
        }
    }


}))