import { useState } from "react";
import { useMutation } from "../../hooks/useMutation";
import productsAgent from "../../agents/productsAgent";
import { useNavigate } from "react-router";

export default function RegisterProductForm({ onClose, onSuccess }) {
  const navigate = useNavigate();
  const {
    execute,
    error: apiError,
    isLoading,
  } = useMutation(productsAgent.createProduct);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  });
  const [error, setError] = useState(null);

  function handleFieldChange(e) {
    const { value, name } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }
  const { name, price, stock } = formData;

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || name === "") {
      setError("Debe ingresar un nombre");
      return;
    }
    if (!price || price === "") {
      setError("Debe ingresar un precio");
      return;
    }
    if (!stock || stock === "") {
      setError("Debe ingresar un stock");
      return;
    }

    await execute(formData);

    if (apiError) {
      setError(apiError);
      return;
    }
    if (onSuccess) onSuccess();
  }

  return (
    <div className="h-fit bg-[#F8FAFC] p-6 sm:p-8 font-sans antialiased text-[#1E293B] flex items-center justify-center">
      <div className="w-full max-w-md bg-white border border-[#E2E8F0] rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
        {/* ENCABEZADO */}
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#0F172A]">
            Registrar Nuevo Producto
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            Introduce los detalles para agregar un nuevo ítem al inventario.
          </p>
        </div>

        {/* ALERTA DE ERROR */}
        {error && (
          <div className="flex items-center gap-2.5 rounded-xl bg-[#FFF1F2] border border-[#FFE4E6] p-3 text-xs font-medium text-[#F43F5E]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* CAMPO: NOMBRE */}
          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="text-xs font-semibold text-[#334155]"
            >
              Nombre del Producto
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Ej. Galletas Mana"
              value={name}
              onChange={handleFieldChange}
              disabled={isLoading}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2 px-3 text-sm text-[#0F172A] placeholder-[#94A3B8] shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all disabled:bg-[#F8FAFC] disabled:cursor-not-allowed"
            />
          </div>

          {/* CONTENEDOR DOS COLUMNAS (PRECIO Y STOCK) */}
          <div className="grid grid-cols-2 gap-4">
            {/* CAMPO: PRECIO */}
            <div className="space-y-1.5">
              <label
                htmlFor="price"
                className="text-xs font-semibold text-[#334155]"
              >
                Precio (CLP)
              </label>
              <div className="relative shadow-sm rounded-xl">
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="3000"
                  value={price}
                  onChange={handleFieldChange}
                  disabled={isLoading}
                  min="0"
                  className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2 px-3 text-sm text-[#0F172A] placeholder-[#94A3B8] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all disabled:bg-[#F8FAFC] disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* CAMPO: STOCK */}
            <div className="space-y-1.5">
              <label
                htmlFor="stock"
                className="text-xs font-semibold text-[#334155]"
              >
                Stock Inicial
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                placeholder="10"
                value={stock}
                onChange={handleFieldChange}
                disabled={isLoading}
                min="0"
                className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2 px-3 text-sm text-[#0F172A] placeholder-[#94A3B8] shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all disabled:bg-[#F8FAFC] disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="flex items-center gap-3 pt-2">
            {/* Cancelar */}
            <button
              type="button"
              onClick={() =>
                onClose
                  ? onClose()
                  : navigate("/products", {
                      state: { text: "refetch", timestamp: Date.now() },
                    })
              }
              disabled={isLoading}
              className="flex-1 inline-flex items-center justify-center rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-semibold text-[#64748B] shadow-sm hover:bg-[#F8FAFC] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>

            {/* Guardar / Registrar */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 inline-flex items-center justify-center rounded-xl bg-[#1D4ED8] px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-all active:scale-[0.98] disabled:bg-blue-400 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  {/* Spinner SVG animado */}
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Guardando...</span>
                </div>
              ) : (
                "Registrar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
