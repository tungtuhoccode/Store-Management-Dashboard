import axios from "axios"


const BackendURL = import.meta.env.VITE_BACKEND_URL;
const BackendLocalURL = import.meta.env.VITE_BACKEND_LOCAL_DEV_URL;

const determineBackendURL = () => {
    if (!BackendLocalURL && ! BackendURL ) return "http://localhost:3000/api"
    if(window.location.origin.includes("localhost"))  return BackendLocalURL
    else return BackendURL
}

const axiosInstance = axios.create({
    baseURL: determineBackendURL(),
    withCredentials: true // send cookies to the server //
})

export default axiosInstance;