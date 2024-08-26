import axiosInstance from "../config/axiosConfig";

const api = axiosInstance;

const response = (resposta) => resposta.data;
const request = {
  getCep: async () => {
    const result = await api.get("01001000/json/");
    return response(result);
  },
};

export { api, request };
