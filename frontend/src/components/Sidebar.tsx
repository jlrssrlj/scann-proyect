import { Link, useLocation } from "react-router-dom";
import { Package, Shield, Layers } from "lucide-react";

const links = [
  { to: "/roles", label: "Roles", icon: Shield },
  { to: "/productos", label: "Productos", icon: Package },
  { to: "/categorias", label: "Categorías", icon: Layers },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      <h1 className="text-2xl font-bold text-center py-6 text-cyan-400">
        SCANN PRO
      </h1>

      <nav className="flex-1">
        {links.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 px-6 py-3 text-lg transition-colors duration-200 
              ${
                location.pathname === to
                  ? "bg-cyan-700 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
          >
            <Icon size={20} />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
