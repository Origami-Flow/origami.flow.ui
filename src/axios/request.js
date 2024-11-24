import axiosInstance from "../config/axiosConfig";

const api = axiosInstance;

const request = {
  getBooks: async (queryParams = {}) => {
    const result = await api.get(`/livros?title=${queryParams?.title}&order=${queryParams?.order} `);
    return result;
  },
  getClienteNome: async (nome = "") => {
    const result = await api.get(`/clientes/nome-cliente?nome=${nome}`);
    return result;
  },
  getAuxiliaNome: async (nome = "") => {
    const result = await api.get(`/auxiliares/nome?nome=${nome}`);
    return result;
  },
};

export { api, request };
