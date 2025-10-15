import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RoleList from "./components/RoleList";
import CategoriaList from "./components/CategoriaList";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Layout principal */}
        <Route path="/" element={<Dashboard />}>
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
