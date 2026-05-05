import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MenuPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const initial = user?.sub?.charAt(0).toUpperCase() ?? "?";

  return (
    <div className="page-root">
      <div className="header-card">
        <div className="header-top">
          <div className="avatar">{initial}</div>
          <div>
            <p className="user-name">{user?.sub}</p>
            <span className="role-badge">● {user?.rol}</span>
          </div>
        </div>
        <button className="btn-logout" onClick={logout}>
          Cerrar sesión
        </button>
      </div>

      <p className="section-title">Gestión de ingredientes</p>
      <div className="action-card">
        <button className="action-btn" onClick={() => navigate("/ingredientes")}>
          <div className="action-icon" style={{ background: "#eef2ff" }}>🥦</div>
          <div style={{ textAlign: "left" }}>
            <p className="btn-label">Ver ingredientes</p>
            <p className="btn-sub">Explorar el catálogo completo</p>
          </div>
          <span className="chevron">›</span>
        </button>
        <button className="action-btn" onClick={() => navigate("/ingredientes/crear")}>
          <div className="action-icon" style={{ background: "#f5f3ff" }}>✦</div>
          <div style={{ textAlign: "left" }}>
            <p className="btn-label">Crear ingrediente</p>
            <p className="btn-sub">Agregar uno nuevo al sistema</p>
          </div>
          <span className="chevron">›</span>
        </button>
      </div>
    </div>
  );
}