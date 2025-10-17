import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RoleList from "./components/RoleList";
import CategoriaList from "./components/CategoriaList";
import type { JSX } from "react";

function RequireAuth({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<Home />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard protegido */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route path="roles" element={<RoleList />} />
          <Route path="categorias" element={<CategoriaList />} />
        </Route>

        {/* Ruta fallback */}
        <Route
          path="*"
          element={
            <div className="text-center mt-20 text-2xl text-red-500">
              Página no encontrada
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
