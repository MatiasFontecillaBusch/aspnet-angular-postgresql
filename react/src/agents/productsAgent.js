import { apiClient } from "../services/apiClient";

const productsAgent = {
  getAllProducts: (query) => apiClient("/products", "GET", null, query),
  getProductsById: (id) => apiClient(`/products/${id}`, "GET", null),
  createProduct: (body) => apiClient("/products", "POST", body),
  updateProductById: (id, body) => apiClient(`/products/${id}`, "POST", body),
};

export default productsAgent;
