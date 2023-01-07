import api from "../api";

export const createProduct = async (product) => {
  return await api.get(`/api/products`, product);
};
