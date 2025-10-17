import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/users";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();    // Borra el token del localStorage
    navigate("/");   // Redirige al Home
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-gray-800 shadow-md">
      <h2 className="text-xl font-semibold text-cyan-400">Panel de Control</h2>

      <div className="flex items-center gap-4">
        <div className="text-gray-300">Usuario logeado</div>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
