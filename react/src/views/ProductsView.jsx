import { useEffect, useState } from "react";
import productsAgent from "../agents/productsAgent";
import Pagination from "../components/shared/Pagination";
import RegisterProductDialog from "../components/dialogs/RegisterProductDialog";
import { useLocation } from "react-router";

export default function ProductsView() {
  const location = useLocation();
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState("1");
  const [pageSize, setPageSize] = useState("10");

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const query = { page: page, pageSize: pageSize };
      if (searchTerm !== "") query.Name = searchTerm;
      if (statusFilter !== "all") query.isAvailable = statusFilter;

      const res = await productsAgent.getAllProducts(query);
      setIsLoading(false);
      if (res.status === 200) setResponse(res);
    };

    fetchProducts();
  }, [searchTerm, statusFilter, page, pageSize, location.state]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "CLP",
      currencyDisplay: "code", // Esto hace que muestre 'CLP3,000' en lugar de '$3.000'
    })
      .format(price)
      .replace(/\s/g, ""); // Quita el espacio interno si existiera
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setPage(1);
  };

  const products = response?.items || [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans antialiased text-[#1E293B]">
      <div className="space-y-6">
        {/* ENCABEZADO SUPERIOR */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
              Panel de Productos
            </h1>
            <p className="text-sm text-[#64748B] mt-0.5">
              Gestiona el inventario y precios de tu catálogo.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Tarjeta de Total */}
            <div className="flex items-center gap-3 bg-white border border-[#E2E8F0] rounded-xl px-4 py-2 shadow-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#334155]">
                {/* Icono de Caja/Cubo */}
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
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                  Total
                </span>
                <span className="text-sm font-bold text-[#0F172A]">
                  {response?.totalCount || 0}
                </span>
              </div>
            </div>

            {/* Botón Nuevo Producto */}
            <RegisterProductDialog />
          </div>
        </div>

        {/* BARRA DE BÚSQUEDA Y FILTROS */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Input de búsqueda */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#94A3B8]">
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Buscar por nombre de producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white py-2.5 pl-11 pr-4 text-sm text-[#0F172A] placeholder-[#94A3B8] shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Selector de estados */}
          <div className="relative min-w-50">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#94A3B8]">
              {/* Icono de Embudo/Filtro */}
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
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none rounded-xl border border-[#E2E8F0] bg-white py-2.5 pl-11 pr-10 text-sm text-[#334155] shadow-sm focus:border-blue-500 focus:outline-none transition-all cursor-pointer"
            >
              <option value="all">Todos los estados</option>
              <option value="true">Habilitados</option>
              <option value="false">Deshabilitados</option>
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-[#94A3B8]">
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* TABLA PRINCIPAL */}
        <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-[#64748B]">
              <thead className="bg-[#F8FAFC] text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] border-b border-[#E2E8F0]">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    Producto
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    Precio
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    Estado
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-semibold text-center"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E2E8F0] bg-white text-[#334155]">
                {isLoading
                  ? /* Estado de Carga */
                    Array.from({ length: 1 }).map((_, idx) => (
                      <tr key={idx} className="animate-pulse">
                        <td
                          colSpan="6"
                          className="px-6 py-6 text-center text-sm text-gray-400"
                        >
                          Cargando catálogo...
                        </td>
                      </tr>
                    ))
                  : products &&
                    products.map((product) => {
                      const isAgotado = product.stock === 0;

                      return (
                        <tr
                          key={product.id}
                          className="hover:bg-[#F8FAFC]/50 transition-colors"
                        >
                          {/* ID */}
                          <td className="px-6 py-5 text-xs text-[#94A3B8] font-medium">
                            #{product.id}
                          </td>

                          {/* Nombre del Producto */}
                          <td className="px-6 py-5 font-semibold text-[#0F172A]">
                            {product.name}
                          </td>

                          {/* Precio format CLP3,000 */}
                          <td className="px-6 py-5 font-bold text-[#0F172A] text-xs">
                            <span className="bg-[#F1F5F9] px-2 py-1 rounded-md border border-[#E2E8F0]">
                              {formatPrice(product.price)}
                            </span>
                          </td>

                          {/* Stock Badge (Agotado vs Cantidad) */}
                          <td className="px-6 py-5">
                            {isAgotado ? (
                              <span className="inline-flex items-center rounded-lg bg-[#FFF1F2] px-2.5 py-1 text-xs font-semibold text-[#F43F5E] border border-[#FFE4E6]">
                                Agotado
                              </span>
                            ) : (
                              <span className="font-medium text-[#334155]">
                                {product.stock} u.
                              </span>
                            )}
                          </td>

                          {/* Estado Badge (Habilitado / Inactivo) */}
                          <td className="px-6 py-5">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
                                product.isAvailable
                                  ? "bg-[#F0FDF4] border-[#DCFCE7] text-[#16A34A]"
                                  : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B]"
                              }`}
                            >
                              <span
                                className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                                  product.isAvailable
                                    ? "bg-[#16A34A]"
                                    : "bg-[#94A3B8]"
                                }`}
                              ></span>
                              {product.isAvailable ? "Habilitado" : "Inactivo"}
                            </span>
                          </td>

                          {/* Acciones con Iconos delgados */}
                          <td className="px-6 py-5">
                            <div className="flex items-center justify-center gap-4 text-[#94A3B8]">
                              {/* Icono Ojo (Ver) */}
                              <button
                                onClick={() => console.log("Ver", product.id)}
                                className="hover:text-[#334155] transition-colors"
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
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </button>
                              {/* Icono Lápiz (Editar) */}
                              <button
                                onClick={() =>
                                  console.log("Editar", product.id)
                                }
                                className="hover:text-[#334155] transition-colors"
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
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </button>
                              {/* Icono Basurero (Eliminar) */}
                              <button
                                onClick={() =>
                                  console.log("Eliminar", product.id)
                                }
                                className="hover:text-[#EF4444] transition-colors"
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
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>

          {/* SECCIÓN DE PAGINACIÓN AL PIE */}
          <Pagination
            page={page}
            pageSize={pageSize}
            totalItems={response?.totalCount || 0}
            onPageChange={setPage} // Pasas la función nativa del useState directo
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      </div>
    </div>
  );
}
