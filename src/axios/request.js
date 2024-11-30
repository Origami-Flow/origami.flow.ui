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
  },
  getClientes: async () => {
    return await api.get("/clientes");
  },
  getProdutos: async () => {
    return await api.get("/estoques");
  },
  getProdutosPorId: async (id) => {
    return await api.get(`/estoques/${id}`);
  },
  getProdutosPorNome: async (nome) => {
    return await api.get(`/produtos/filtro-nome?nome=${nome}`);
  },
  postProdutos: async (data) => {
    return await api.post("/produtos", data);
  },
  deleteProdutos: async (id) => {
    return await api.delete(`/produtos/${id}`, id);
  },
  deleteEstoque: async (id) => {
    return await api.delete(`/estoques/${id}`, id);
  },
  updateProduto: async (id, data) => {
    return await api.put(`/produtos/${id}`, data)
  },
  updateEstoque: async (id, quantidade) => {
    return await api.put(`/estoques/${id}?quantidade=${quantidade}`)
  },
  getMetricas: async(mes, ano) => {
    return await api.get(`/metricas?mes=${mes}&ano=${ano}`)
  },

};

export { api, request };
