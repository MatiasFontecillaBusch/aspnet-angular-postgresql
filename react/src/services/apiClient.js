import { ENV } from "../config/env";

const BASE_URL = ENV.API_URL;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Función genérica para peticiones HTTP
 * @param {string} endpoint - La ruta a la que apuntas (ej: '/auth/login' o '/users')
 * @param {string} method - El método HTTP (GET, POST, PUT, etc.) por defecto es GET
 * @param {Object} [body] - Los datos que envías en el cuerpo de la petición (POST/PUT)
 * @param {Object} [queryParams] - Objeto con los parámetros de la URL (ej: { page: 1, limit: 10 })
 * @returns {Promise<Object>} - La respuesta de la API ya convertida a JSON
 */
export async function apiClient(
  endpoint,
  method = "GET",
  body = null,
  queryParams = null
) {
  let fullUrl = `${BASE_URL}${endpoint}`;

  if (queryParams && Object.keys(queryParams).length > 0) {
    const searchParams = new URLSearchParams(queryParams);
    fullUrl += `?${searchParams.toString()}`;
  }

  const config = {
    method: method.toUpperCase(),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  if (body && config.method !== "GET" && config.method !== "HEAD") {
    config.body = JSON.stringify(body);
  }

  try {
    if (import.meta.env.DEV) {
      await sleep(1500);
    }

    const response = await fetch(fullUrl, config);

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(
        data.message || "Ocurrió un error inesperado"
      );
      error.status = response.status;
      error.data = data;
      throw error;
    }
    data.status = response.status;
    return data;
  } catch (error) {
    console.error(`Error en la petición [${method}] ${endpoint}:`, error);
    return error;
  }
}
