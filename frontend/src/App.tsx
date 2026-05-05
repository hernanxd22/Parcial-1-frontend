import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import IngredientesPage from "./pages/IngredientesPage";
import CrearIngredientePage from "./pages/CrearIngredientePage";
import IngredientesHubPage from "./pages/IngredientesHubPage";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/PaginaPrin";
import InicioPage from "./pages/InicioPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/inicio" element={<InicioPage />} />

      <Route
        path="/menu"
        element={
          <PrivateRoute>
            <MenuPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/ingrediente"
        element={
          <PrivateRoute>
            <IngredientesHubPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/ingredientes/lista"
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