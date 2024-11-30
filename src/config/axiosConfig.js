import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACK_API,
    headers: {
        "Content-Type": "application/json",
         'Authorization': `Bearer `
    },
})

export default axiosInstance;