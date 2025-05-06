import axios from "axios"


const BackendURL = import.meta.env.VITE_BACKEND_URL;
const axiosInstance = axios.create({
    baseURL: "http://10.0.0.135:3000/api" || "http://localhost:3000/api",
    withCredentials: true // send cookies to the server //
})

export default axiosInstance;