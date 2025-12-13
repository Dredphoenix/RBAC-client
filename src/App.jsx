import { BrowserRouter,Route,Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminUsers from "./pages/AdminUsers";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;