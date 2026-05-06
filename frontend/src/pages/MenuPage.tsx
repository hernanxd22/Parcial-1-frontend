import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MenuPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const initial = user?.sub?.charAt(0).toUpperCase() ?? "?";
  const [hambOpen, setHambOpen] = useState(false);

  return (
    <div className="page-root">

      {/* ── Header en una sola línea ── */}
      <div className="header-bar">
        <div className="header-left">
          <div className="avatar">{initial}</div>
          <div>
            <p className="user-name">{user?.sub}</p>
            <span className="role-badge">● {user?.rol}</span>
          </div>
        </div>
        <button className="btn-logout-inline" onClick={() => { logout(); navigate("/login", { replace: true }); }}>
          Cerrar sesión
        </button>
      </div>

      {/* ── Acordeón Hamburguesa ── */}
      <div className="accordion-card" onClick={() => setHambOpen(!hambOpen)}>
        <div className="accordion-header">
          <span className="accordion-title">🍔 Hamburguesa</span>
          <span className="chevron">{hambOpen ? "⌃" : "›"}</span>
        </div>

        {hambOpen && (
          <div className="accordion-body">
            <button className="action-btn" onClick={(e) => { e.stopPropagation(); navigate("/ingredientes"); }}>
              <div className="action-icon" style={{ background: "#eef2ff" }}>🥦</div>
              <div style={{ textAlign: "left" }}>
                <p className="btn-label">Ver ingredientes</p>
                <p className="btn-sub">Explorar el catálogo completo</p>
              </div>
              <span className="chevron">›</span>
            </button>
            <button className="action-btn" onClick={(e) => { e.stopPropagation(); navigate("/ingredientes/crear"); }}>
              <div className="action-icon" style={{ background: "#f5f3ff" }}>✦</div>
              <div style={{ textAlign: "left" }}>
                <p className="btn-label">Crear ingrediente</p>
                <p className="btn-sub">Agregar uno nuevo al sistema</p>
              </div>
              <span className="chevron">›</span>
            </button>
          </div>
        )}
      </div>

    </div>
  );
}