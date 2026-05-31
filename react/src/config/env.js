export const ENV = {
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 5000,
  ENV_NAME: import.meta.env.MODE,
};
