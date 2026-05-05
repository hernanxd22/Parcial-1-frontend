import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type Ingrediente = { id: number; nombre: string; descripcion: string; es_alergeno: boolean };

export default function IngredientesPage() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [esAlergeno, setEsAlergeno] = useState(false);

  const obtener = async () => {
    const res = await fetch("http://127.0.0.1:8000/ingredientes", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setIngredientes(await res.json());
  };

  useEffect(() => { if (token) obtener(); }, [token]);

  const editar = async () => {
    if (user?.rol !== "ADMIN") return alert("Solo ADMIN");
    const res = await fetch(`http://127.0.0.1:8000/ingredientes/${editandoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ nombre, descripcion, es_alergeno: esAlergeno }),
    });
    if (res.ok) { setEditandoId(null); obtener(); }
  };

  const eliminar = async (id: number) => {
    if (user?.rol !== "ADMIN") return alert("Solo ADMIN");
    if (!confirm("¿Eliminar este ingrediente?")) return;
    await fetch(`http://127.0.0.1:8000/ingredientes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    obtener();
  };

  const abrirEdicion = (ing: Ingrediente) => {
    setEditandoId(ing.id);
    setNombre(ing.nombre);
    setDescripcion(ing.descripcion);
    setEsAlergeno(ing.es_alergeno);
  };

  return (
    <div className="inicio-root">

      {/* Navbar */}
      <header className="inicio-navbar">
        <span className="inicio-brand">Proyecto LOS</span>
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="inicio-nav-link" onClick={() => navigate("/ingrediente")}>
            ← Volver
          </button>
          {user?.rol === "ADMIN" && (
            <button
              className="inicio-nav-link"
              onClick={() => navigate("/ingredientes/crear")}
              style={{
                background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                color: "#fff",
                borderRadius: "8px",
                padding: "8px 16px",
              }}
            >
              + Agregar
            </button>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="inicio-hero" style={{ paddingBottom: "1rem" }}>
        <h1 className="inicio-welcome">Ingredientes 📋</h1>
        <p className="inicio-sub">{ingredientes.length} registrados</p>
      </section>

      {/* Lista */}
      <section className="inicio-section" style={{ paddingTop: "0" }}>
        <div style={{
          background: "#fff",
          borderRadius: "16px",
          border: "0.5px solid #e2e8f0",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}>
          {ingredientes.length === 0 ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
              <div style={{ fontSize: "40px", marginBottom: "12px" }}>🫙</div>
              No hay ingredientes registrados
            </div>
          ) : (
            ingredientes.map((ing, i) => (
              <div key={ing.id} style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "1rem 1.5rem",
                borderBottom: i < ingredientes.length - 1 ? "0.5px solid #f1f5f9" : "none",
                transition: "background 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "#fafafa")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{
                  width: "42px", height: "42px",
                  background: "#eef2ff",
                  borderRadius: "10px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "20px", flexShrink: 0,
                }}>
                  🧂
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#1e293b", margin: 0 }}>{ing.nombre}</p>
                  <p style={{ fontSize: "12px", color: "#94a3b8", margin: "2px 0 0" }}>{ing.descripcion}</p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                  <span style={{
                    padding: "3px 10px",
                    borderRadius: "20px",
                    fontSize: "11px",
                    fontWeight: 600,
                    background: ing.es_alergeno ? "#fef2f2" : "#f0fdf4",
                    color: ing.es_alergeno ? "#dc2626" : "#16a34a",
                    border: `0.5px solid ${ing.es_alergeno ? "#fecaca" : "#bbf7d0"}`,
                  }}>
                    {ing.es_alergeno ? "⚠️ Alérgeno" : "✓ Sin alérgeno"}
                  </span>

                  {user?.rol === "ADMIN" && (
                    <>
                      <button
                        onClick={() => abrirEdicion(ing)}
                        style={{
                          padding: "6px 14px", borderRadius: "8px",
                          border: "0.5px solid #c7d2fe", background: "transparent",
                          fontFamily: "inherit", fontSize: "12px", color: "#6366f1",
                          cursor: "pointer", transition: "background 0.15s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#eef2ff")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => eliminar(ing.id)}
                        style={{
                          padding: "6px 14px", borderRadius: "8px",
                          border: "0.5px solid #fecaca", background: "transparent",
                          fontFamily: "inherit", fontSize: "12px", color: "#dc2626",
                          cursor: "pointer", transition: "background 0.15s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#fef2f2")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {editandoId && (
          <div style={{
            background: "#fff", borderRadius: "16px",
            border: "0.5px solid #e2e8f0",
            padding: "1.75rem", marginTop: "1rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#1e293b", marginBottom: "16px" }}>
              ✏️ Editando ingrediente
            </p>

            <div className="field">
              <label>Nombre</label>
              <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
            </div>

            <div className="field">
              <label>Descripción</label>
              <input type="text" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
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
              <button className="btn-primary" onClick={editar} style={{ margin: 0 }}>
                Guardar cambios
              </button>
              <button className="btn-ghost" onClick={() => setEditandoId(null)} style={{ margin: 0 }}>
                Cancelar
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}