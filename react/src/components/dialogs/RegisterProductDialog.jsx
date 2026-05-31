import { useState } from "react";
import RegisterProductForm from "../forms/RegisterProductForm"; // Asegúrate de ajustar la ruta de importación
import { useNavigate } from "react-router";

export default function RegisterProductDialog() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSuccess = () => {
    closeModal();
    navigate("/products", {
      state: { text: "refetch", timestamp: Date.now() },
    });
  };

  return (
    <>
      {/* 1. EL BOTÓN DISPARADOR (Idéntico al de tu diseño original) */}
      <button
        onClick={openModal}
        className="inline-flex items-center justify-center rounded-xl bg-[#1D4ED8] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-all active:scale-[0.98]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Nuevo Producto
      </button>

      {/* 2. ESTRUCTURA DEL MODAL INTERFACES FLOTANTES */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Fondo Oscuro / Backdrop Difuminado */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={closeModal} // Cierra el modal si hacen clic afuera
          />

          {/* Caja del Contenedor Flotante */}
          <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white border border-[#E2E8F0] p-6 shadow-xl transition-all z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Botón "X" para cerrar en la esquina superior derecha */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#334155] transition-colors rounded-lg p-1 hover:bg-[#F1F5F9]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* 3. RENDERIZAMOS TU FORMULARIO AQUÍ ADENTRO */}
            <RegisterProductForm
              onClose={closeModal}
              onSuccess={handleSuccess}
            />
          </div>
        </div>
      )}
    </>
  );
}
