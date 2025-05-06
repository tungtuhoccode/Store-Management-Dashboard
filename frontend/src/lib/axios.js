import axios from "axios"


const BackendURL = import.meta.env.VITE_BACKEND_URL;
const axiosInstance = axios.create({
    baseURL: BackendURL || "http://localhost:3000/api",
    withCredentials: true // send cookies to the server //
})

export default axiosInstance;