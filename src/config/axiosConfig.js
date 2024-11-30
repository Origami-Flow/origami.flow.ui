import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACK_API,
    headers: {
        "Content-Type": "application/json",
         'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJvcmlnYW1pLmZsb3cuand0LmFwaSIsInN1YiI6ImRhdmkucm9kcmlndWVzQHNwdGVjaC5zY2hvb2wiLCJleHAiOjE3MzI5MzUwNzB9.EaQmGrkgCAMoHwSrxP3eTdbwOVwD7L4-DSLPWd9R8sc`
    },
})

export default axiosInstance;