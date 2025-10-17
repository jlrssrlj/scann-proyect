import { Link, useLocation } from "react-router-dom";
import { Shield, Layers } from "lucide-react";

const links = [
  { to: "/dashboard/roles", label: "Roles", icon: Shield },
  { to: "/dashboard/categorias", label: "Categorías", icon: Layers },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-[#0f172a] border-r border-cyan-400/20 flex flex-col shadow-2xl">
      {/* Título */}
      <h1 className="text-3xl font-extrabold text-center py-6 text-cyan-400 tracking-wide border-b border-cyan-400/20">
        SCANN PRO
      </h1>

      {/* Navegación */}
      <nav className="flex-1 mt-4">
        {links.map(({ to, label, icon: Icon }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-6 py-3 text-lg font-medium transition-all duration-300 rounded-r-full 
                ${
                  active
                    ? "bg-cyan-600 text-white shadow-md shadow-cyan-500/30"
                    : "text-gray-400 hover:bg-cyan-500/10 hover:text-cyan-300"
                }`}
            >
              <Icon size={22} className={`${active ? "text-white" : "text-cyan-400"}`} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="text-center py-4 text-sm text-gray-500 border-t border-cyan-400/10">
        © 2025 SCANN PRO
      </div>
    </aside>
  );
}
