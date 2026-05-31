export default function Pagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}) {
  // Calculamos el total de páginas dinámicamente
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  // Cálculos para el texto descriptivo: "Mostrando X al Y de Z"
  const fromItem = totalItems ? (page - 1) * pageSize + 1 : 0;
  const toItem = Math.min((page - 1) * pageSize + pageSize, totalItems);

  return (
    <div className="flex items-center justify-between border-t border-[#E2E8F0] bg-white px-6 py-4 text-xs text-[#64748B]">
      {/* Selector de registros a mostrar */}
      <div className="flex items-center gap-2">
        <span>Mostrar:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="rounded-lg border border-[#E2E8F0] bg-white px-2 py-1 text-xs text-[#334155] shadow-sm focus:outline-none cursor-pointer"
        >
          <option value={10}>10 registros</option>
          <option value={25}>25 registros</option>
          <option value={50}>50 registros</option>
        </select>
      </div>

      {/* Texto descriptivo dinámico */}
      <div>
        Mostrando{" "}
        <span className="font-semibold text-[#334155]">{fromItem}</span> al{" "}
        <span className="font-semibold text-[#334155]">{toItem}</span> de{" "}
        <span className="font-semibold text-[#334155]">{totalItems}</span>{" "}
        resultados
      </div>

      {/* Controles de Navegación */}
      <div className="flex items-center gap-2">
        {/* Botón Anterior */}
        <button
          onClick={() => onPageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#94A3B8] hover:bg-[#F8FAFC] disabled:opacity-40 disabled:hover:bg-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Indicador de página actual */}
        <span className="flex h-7 px-3 items-center justify-center rounded-lg bg-[#F1F5F9] font-semibold text-[#334155] text-xs">
          {page} / {totalPages}
        </span>

        {/* Botón Siguiente */}
        <button
          onClick={() => onPageChange(page * 1 + 1)}
          disabled={page >= totalPages}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#94A3B8] hover:bg-[#F8FAFC] disabled:opacity-40 disabled:hover:bg-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
