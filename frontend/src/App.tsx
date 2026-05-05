import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import IngredientesPage from "./pages/IngredientesPage";
import CrearIngredientePage from "./pages/CrearIngredientePage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/menu"
        element={
          <PrivateRoute>
            <MenuPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/ingredientes"
        element={
          <PrivateRoute>
            <IngredientesPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/ingredientes/crear"
        element={
          <PrivateRoute>
            <CrearIngredientePage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;