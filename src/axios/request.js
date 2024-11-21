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
  }
};

export { api, request };
