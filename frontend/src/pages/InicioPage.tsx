import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";

export default function InicioPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const initial = user?.sub?.charAt(0).toUpperCase() ?? "?";
  const [menuOpen, setMenuOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  // Cierra el panel si se hace click fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (hamburgerRef.current && !hamburgerRef.current.contains(e.target as Node)) {
        setHamburgerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="inicio-root">

      {/* ── Navbar ── */}
      <header className="inicio-navbar">

        {/* Brand + Hamburguesa */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", position: "relative" }} ref={hamburgerRef}>
          <span className="inicio-brand">Proyecto LOS</span>

          {/* Botón hamburguesa */}
          <button
            onClick={() => setHamburgerOpen(!hamburgerOpen)}
            style={{
              background: hamburgerOpen ? "#e0e7ff" : "transparent",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.15s",
              flexShrink: 0,
            }}
            title="Menú"
          >
            {/* SVG hamburguesa */}
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="18" height="2.5" rx="1.25" fill="#374151"/>
              <rect y="5.75" width="18" height="2.5" rx="1.25" fill="#374151"/>
              <rect y="11.5" width="18" height="2.5" rx="1.25" fill="#374151"/>
            </svg>
          </button>

          {/* Panel desplegable estilo Facebook */}
          {hamburgerOpen && (
            <div style={{
              position: "absolute",
              top: "calc(100% + 10px)",
              left: "0",
              background: "#fff",
              border: "0.5px solid #e2e8f0",
              borderRadius: "12px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
              minWidth: "220px",
              padding: "8px",
              zIndex: 300,
            }}>
              <p style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#94a3b8",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "4px 10px 8px",
              }}>
                Navegación
              </p>

              <button
                onClick={() => { setHamburgerOpen(false); navigate("/ingrediente"); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  borderRadius: "10px",
                  padding: "10px 12px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#111827",
                  transition: "background 0.15s",
                  textAlign: "left",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f1f5f9")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{
                  width: "36px",
                  height: "36px",
                  background: "#eef2ff",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  flexShrink: 0,
                }}>
                  🧂
                </span>
                <div>
                  <div>Ingredientes</div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>
                    Gestionar ingredientes
                  </div>
                </div>
              </button>

            </div>
          )}
        </div>

        <nav className="inicio-nav">
          <button className="inicio-nav-link active" onClick={() => navigate("/inicio")}>
            Inicio
          </button>
        </nav>

        {/* Avatar / dropdown usuario */}
        <div className="inicio-user" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="inicio-avatar">{initial}</div>
          <span className="inicio-username">{user?.sub}</span>
          <span className="inicio-chevron">{menuOpen ? "▲" : "▼"}</span>

          {menuOpen && (
            <div className="inicio-dropdown">
              <div className="dropdown-header">
                <div className="inicio-avatar sm">{initial}</div>
                <div>
                  <p className="dropdown-name">{user?.sub}</p>
                  <span className="dropdown-role">{user?.rol}</span>
                </div>
              </div>
              <hr className="dropdown-divider" />
              <button className="dropdown-item danger" onClick={logout}>🚪 Cerrar sesión</button>
            </div>
          )}
        </div>
      </header>

      <section className="inicio-hero">
        <h1 className="inicio-welcome">¡Bienvenido, {user?.sub}! 👋</h1>
        <p className="inicio-sub">¿Qué querés hacer hoy?</p>
      </section>

    </div>
  );
}