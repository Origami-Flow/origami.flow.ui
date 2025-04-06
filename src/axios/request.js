import axiosInstance from "../config/axiosConfig";

const api = axiosInstance;

const request = {
  getBooks: async (queryParams = {}) => {
    return await api.get(`/livros?title=${queryParams?.title}&order=${queryParams?.order} `);
  },
  postLogin: async (data) => {
    return await api.post("/logins", data);
  },
  postCadastro: async (data) => {
    return await api.post("/cadastros/cliente", data);
  },
  getClientes: async () => {
    return await api.get("/clientes");
  },
  updateCliente: async (id, data) => {
    return await api.put(`/clientes/${id}`, data)
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
    return await api.post("/produtos", data, {headers: {
      "Content-Type": "multipart/form-data",
    }});
  },
  deleteProdutos: async (id) => {
    return await api.delete(`/produtos/${id}`, id);
  },
  deleteEstoque: async (id) => {
    return await api.delete(`/estoques/${id}`, id);
  },
  updateProduto: async (id, data) => {
    return await api.put(`/produtos/${id}`, data, {headers: {
      "Content-Type": "multipart/form-data",
    }})
  },
  updateEstoque: async (id, quantidade) => {
    return await api.put(`/estoques/${id}?quantidade=${quantidade}`)
  },
  getServicos: async () => {
    return await api.get("/servicos")
  },
  getMetricas: async(mes, ano) => {
    return await api.get(`/metricas?mes=${mes}&ano=${ano}`)
  },

  getClienteNome: async (nome = "") => {
    const result = await api.get(`/clientes/nome-cliente?nome=${nome}`);
    return result;
  },
  getAuxiliaNome: async (nome = "") => {
    const result = await api.get(`/auxiliares/nome?nome=${nome}`);
    return result;
  },
  postEvento: async (payload) => {
    const result = await api.post("/eventos", payload);
    return result;
  },
  getEventosData: async (inicio, fim) => {
    const result = await api.get(`/eventos/buscar-intervalo-tempo?inicioIntervalo=${inicio}&fimIntervalo=${fim}`);
    return result;
  },
  putEvento: async (id, payload) => {
    const result = await api.put(`/eventos/${id}`, payload);
    return result;
  },
  putFinalizarEvento: async (id, produtosUtilizadoRequestDTO) => {
    const result = await api.put(`/eventos/finalizar/${id}`, produtosUtilizadoRequestDTO);
    return result;
  },
  deleteEvento: async (id) => {
    const result = await api.delete(`/eventos/${id}`);
    return result;
  },
  getProdutoNome: async (nome = "") => {
    const result = await api.get(`/produtos/filtro-nome?nome=${nome}`);
    return result;
  },
  getTotalDespesas: async (inicio, fim) => {
    return await api.get(`/despesas/despesa/total?inicio=${inicio}&fim=${fim}`)
  },
  getFinancas: async (mes, ano) => {
    return await api.get(`/financas?mes=${mes}&ano=${ano}`)
  },
  postDespesa: async (data) => {
    return await api.post("/despesas", data)
  },
  getAssistentes: async () => {
    return await api.get("/auxiliares")
  },
  postAssistente: async (data) => {
    return await api.post("/auxiliares", data)
  },
  getCaixa: async (mes, ano) => {
    return await api.get(`/caixas/por/mes?mes=${mes}&ano=${ano}`)
  },
  postCaixa: async (id) => {
    return await api.post(`/caixas/${id}`)
  },
  postAvaliacaoUsuario: async (data) => {
    return await api.post("/avaliacao-usuarios", data)
  },
  getAtendimentoRealizado: async (id) => {
    return await api.get(`/eventos/por/cliente/${id}`)
  }
};

export { api, request };
