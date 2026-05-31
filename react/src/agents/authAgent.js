import { apiClient } from "../services/apiClient";

const authAgent = {
  login: (body) => apiClient("/authentication/login", "POST", body),
};

export default authAgent;
