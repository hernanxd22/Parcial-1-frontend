import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CrearIngredientePage() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [esAlergeno, setEsAlergeno] = useState(false);
  const [loading, setLoading] = useState(false);

  const crear = async () => {
    if (user?.rol !== "ADMIN") return alert("Solo ADMIN puede crear");
    if (!nombre.trim()) return alert("El nombre es obligatorio");
    setLoading(true);
    const res = await fetch("http://127.0.0.1:8000/ingredientes", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ nombre, descripcion, es_alergeno: esAlergeno }),
    });
    setLoading(false);
    if (res.ok) navigate("/ingredientes/lista");
    else alert("Error al crear");
  };

  return (
    <div className="inicio-root">


      <header className="inicio-navbar">
        <span className="inicio-brand">Proyecto LOS</span>
        <button className="inicio-nav-link" onClick={() => navigate("/ingrediente")}>
          ← Volver
        </button>
      </header>

      <section className="inicio-hero" style={{ paddingBottom: "1rem" }}>
        <h1 className="inicio-welcome">Nuevo ingrediente ➕</h1>
        <p className="inicio-sub">Completá los datos del ingrediente</p>
      </section>

      <section className="inicio-section" style={{ paddingTop: "0" }}>
        <div style={{
          background: "#fff",
          borderRadius: "16px",
          border: "0.5px solid #e2e8f0",
          padding: "1.75rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          maxWidth: "480px",
        }}>

          <div className="field">
            <label>Nombre</label>
            <input
              type="text"
              placeholder="Ej: Harina de trigo"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Descripción</label>
            <input
              type="text"
              placeholder="Breve descripción..."
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Alérgeno</label>
            <div className="check-row" onClick={() => setEsAlergeno(!esAlergeno)}>
              <div className={`check-box ${esAlergeno ? "checked" : ""}`}>
                {esAlergeno && (
                  <svg width="10" height="8" viewBox="0 0 10 8">
                    <path d="M1 4l3 3 5-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              <span className="check-label">Marcar como alérgeno</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
            <button
              className="btn-primary"
              onClick={crear}
              disabled={loading}
              style={{ margin: 0 }}
            >
              {loading ? "Creando..." : "✓ Crear ingrediente"}
            </button>
            <button
              className="btn-ghost"
              onClick={() => navigate("/ingrediente")}
              style={{ margin: 0 }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}