import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("✓ Usuario creado correctamente");
        setUsername(""); setPassword("");
      } else {
        setMsg(data.detail || "Error al registrar");
      }
    } catch {
      setMsg("Error de conexión con el servidor");
    }
  };

  return (
    <div className="page-root">
      <div className="header-card">
        <p className="title">Crear cuenta</p>
        <p className="sub">Completá los datos para registrarte</p>
      </div>
      <div className="form-card">
        <div className="field">
          <label>Usuario</label>
          <input type="text" placeholder="tu_usuario" value={username}
            onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="field">
          <label>Contraseña</label>
          <input type="password" placeholder="••••••••" value={password}
            onChange={e => setPassword(e.target.value)} />
        </div>
        <button className="btn-primary" onClick={handleSubmit}>Registrarse</button>
        <div className="divider"><span>o</span></div>
        <button className="btn-ghost" onClick={() => navigate("/login")}>Ya tengo cuenta</button>
        {msg && <p className="msg">{msg}</p>}
      </div>
    </div>
  );
}