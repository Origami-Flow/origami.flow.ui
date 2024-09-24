import axiosInstance from "../config/axiosConfig";

const api = axiosInstance;

const request = {
  getBooks: async (queryParams = {}) => {
    const result = await api.get(`/livros?title=${queryParams?.title}&order=${queryParams?.order} `);
    return result;
  },
};

export { api, request };
