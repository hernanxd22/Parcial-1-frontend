import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/login", { replace: true, state: { message: "Usuario creado correctamente" } });
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
        <form onSubmit={handleSubmit}>
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
          <button className="btn-primary" type="submit">Registrarse</button>
        </form>
        <div className="divider"><span>o</span></div>
        <button className="btn-ghost" onClick={() => navigate("/login")}>Ya tengo cuenta</button>
        <button className="btn-ghost" onClick={() => navigate("/")}>Volver a la página principal</button>
        {msg && <p className="msg">{msg}</p>}
      </div>
    </div>
  );
}