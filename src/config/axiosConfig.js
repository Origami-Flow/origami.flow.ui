import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://viacep.com.br/ws/",
})

export default axiosInstance;