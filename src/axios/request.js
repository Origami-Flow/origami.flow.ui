import axiosInstance from "../config/axiosConfig";

const api = axiosInstance;

const request = {
  getBooks: async (queryParams = {}) => {
    return await api.get(`/livros?title=${queryParams?.title}&order=${queryParams?.order} `);
  },
  postLogin: async (data) => {
    return await api.post("/logins/cliente", data);
  },
  postCadastro: async (data) => {
    return await api.post("/cadastros/cliente", data);
  }
};

export { api, request };
