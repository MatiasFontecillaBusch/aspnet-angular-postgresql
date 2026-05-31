import { useState } from "react";

/**
 * Hook reutilizable para peticiones mutables (POST, PUT, DELETE)
 * @param {Function} apiCallFunc - Función que ejecuta la petición (ej: () => apiClient(...))
 */
export function useMutation(apiCallFunc) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (...args) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiCallFunc(...args);
      setData(result);
      return result; // Lo devolvemos por si el componente quiere usarlo directamente
    } catch (err) {
      setError(err.message || "Algo salió mal");
      throw err; // Re-lanzamos por si el componente necesita manejar el fallo
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, data, error, isLoading };
}
