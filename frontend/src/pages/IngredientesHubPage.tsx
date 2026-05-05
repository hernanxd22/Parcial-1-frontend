import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function IngredientesHubPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="inicio-root">

      <header className="inicio-navbar">
        <span className="inicio-brand">Proyecto LOS</span>
        <button className="inicio-nav-link" onClick={() => navigate("/inicio")}>
          ← Volver
        </button>
      </header>


      <section className="inicio-hero">
        <h1 className="inicio-welcome">Ingredientes 🧂</h1>
        <p className="inicio-sub">¿Qué querés hacer?</p>
      </section>


      <section className="inicio-section">
        <div style={{
          display: "flex",
          gap: "1.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "1rem",
        }}>

          <div
            onClick={() => navigate("/ingredientes/lista")}
            style={{
              background: "#fff",
              border: "0.5px solid #e2e8f0",
              borderRadius: "20px",
              padding: "2rem 2.5rem",
              width: "220px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(99,102,241,0.18)";
              (e.currentTarget as HTMLDivElement).style.borderColor = "#c7d2fe";
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
              (e.currentTarget as HTMLDivElement).style.borderColor = "#e2e8f0";
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
            }}
          >
            <div style={{ fontSize: "52px", marginBottom: "14px" }}>📋</div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#1e293b", marginBottom: "6px" }}>
              Ver Ingredientes
            </div>
            <div style={{ fontSize: "13px", color: "#94a3b8" }}>
              Listado completo de todos los ingredientes cargados
            </div>
          </div>

          <div
            onClick={() => navigate("/ingredientes/crear")}
            style={{
              background: "linear-gradient(135deg, #4f46e5, #6366f1)",
              border: "none",
              borderRadius: "20px",
              padding: "2rem 2.5rem",
              width: "220px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: "0 2px 8px rgba(99,102,241,0.25)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(99,102,241,0.45)";
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
              (e.currentTarget as HTMLDivElement).style.opacity = "0.92";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(99,102,241,0.25)";
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLDivElement).style.opacity = "1";
            }}
          >
            <div style={{ fontSize: "52px", marginBottom: "14px" }}>➕</div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>
              Crear Ingrediente
            </div>
            <div style={{ fontSize: "13px", color: "#c7d2fe" }}>
              Agregá un nuevo ingrediente al sistema
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}