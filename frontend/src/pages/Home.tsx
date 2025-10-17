import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Bienvenido a mi Aplicativo
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Gestiona tus datos fácilmente desde el panel de control.
      </p>
      <button
        onClick={goToLogin}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        Iniciar Sesión
      </button>
    </div>
  );
}
