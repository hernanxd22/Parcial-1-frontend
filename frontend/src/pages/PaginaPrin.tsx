import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      <div className="navbar">
        <div className="logo">Proyecto LOS</div>

        <div className="nav-buttons">
          <button onClick={() => navigate("/login")}>
            Iniciar sesión
          </button>

          <button className="secondary" onClick={() => navigate("/register")}>
            Registrarse
          </button>
        </div>
      </div>

      <div className="hero">
        <div className="hero-bg">
          <img
            src="https://definicion.de/wp-content/uploads/2009/04/comida-chatarra.jpg"
            alt="Comida"
          />
        </div>

        <div className="hero-content">
          <h1>Sabores simples, momentos únicos</h1>
          <p>Comida rica, rápida y hecha con amor.</p>
        </div>
      </div>

    </div>
  );
}