import { useState } from "react";
import { useMutation } from "../hooks/useMutation";
import authAgent from "../agents/authAgent";
import { useNavigate } from "react-router";

export default function LoginView() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { execute, isLoading, error: apiError } = useMutation(authAgent.login);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
    // Limpiamos el error cuando el usuario empieza a escribir de nuevo
    if (error) setError(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = formData;

    // Validación corregida para evaluar ambos campos correctamente
    if (!email || email.trim() === "") {
      setError("Debe ingresar un correo electrónico");
      return;
    }
    if (!password || password.trim() === "") {
      setError("Debe ingresar una contraseña");
      return;
    }

    setError(null);
    const response = await execute(formData);
    console.log("Formulario enviado con éxito", formData);
    if (apiError) {
      setError(apiError);
      return;
    }
    localStorage.setItem("token", response.token);
    navigate("/products");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
        {/* Encabezado */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Regístrate aquí
            </a>
          </p>
        </div>

        {/* Alerta de Error */}
        {error && (
          <div className="rounded-md bg-red-50 p-4 border border-red-200 animate-pulse">
            <div className="flex">
              <div className="text-sm font-medium text-red-800">{error}</div>
            </div>
          </div>
        )}

        {/* Formulario */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            {/* Campo Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-all"
                placeholder="ejemplo@correo.com"
              />
            </div>

            {/* Campo Contraseña */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 pl-3 pr-10 py-2.5 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm transition-all"
                  placeholder="••••••••"
                />
                {/* Botón ojo para mostrar/ocultar */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <span className="text-xs font-semibold">Ocultar</span>
                  ) : (
                    <span className="text-xs font-semibold">Mostrar</span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Opciones extras de Login (Recordarme / Olvidé contraseña) */}
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          {/* Botón de Enviar */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all 
                hover:bg-indigo-500 hover:shadow-lg 
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 
                active:scale-[0.98] 
                disabled:bg-indigo-400 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-indigo-400 disabled:hover:shadow-md disabled:active:scale-100"
            >
              {isLoading ? "Cargando..." : "Ingresar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
