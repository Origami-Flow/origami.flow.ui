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
  getServicos: async () => {
    const result = await api.get("/servicos");
    return result;
  },
  postEvento: async (payload) => {
    const result = await api.post("/eventos", payload);
    return result;
  },
};

export { api, request };
