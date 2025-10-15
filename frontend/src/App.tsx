import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RoleList from "./components/RoleList";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="roles" element={<RoleList />} />
          
        </Route>
      </Routes>
    </Router>
  );
}
