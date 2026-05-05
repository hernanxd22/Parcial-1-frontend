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
    <div className="page-root">

      <div className="header-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p className="title">Ingredientes</p>
          <p className="sub">{ingredientes.length} registrados</p>
        </div>
        <div className="header-actions">
          <button className="btn-back" onClick={() => navigate("/menu")}>← Menú</button>
          {user?.rol === "ADMIN" && (
            <button className="btn-add" onClick={() => navigate("/ingredientes/crear")}>+ Agregar</button>
          )}
        </div>
      </div>

      <div className="list-card">
        {ingredientes.length === 0 && (
          <p className="empty">No hay ingredientes registrados</p>
        )}
        {ingredientes.map((ing) => (
          <div key={ing.id} className="ing-row">
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="ing-name">{ing.nombre}</p>
              <p className="ing-desc">{ing.descripcion}</p>
            </div>
            <div className="row-actions">
              <span className={`badge ${ing.es_alergeno ? "badge-red" : "badge-green"}`}>
                {ing.es_alergeno ? "Alérgeno" : "Sin alérgeno"}
              </span>
              {user?.rol === "ADMIN" && (
                <>
                  <button className="btn-edit" onClick={() => abrirEdicion(ing)}>Editar</button>
                  <button className="btn-del" onClick={() => eliminar(ing.id)}>Eliminar</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {editandoId && (
        <div className="edit-card">
          <p className="edit-title">Editando ingrediente</p>

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

          <div className="edit-actions">
            <button className="btn-primary" onClick={editar}>Guardar cambios</button>
            <button className="btn-ghost" onClick={() => setEditandoId(null)}>Cancelar</button>
          </div>
        </div>
      )}

    </div>
  );
}