import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      login(data.access_token);
      navigate("/menu", { replace: true });
    } else {
      alert(data.detail || "Error en login");
    }
  };

  return (
    <div className="page-root">
      <div className="header-card">
        <p className="title">Bienvenido</p>
        <p className="sub">Ingresá con tu cuenta para continuar</p>
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
        <button className="btn-primary" onClick={handleLogin}>Iniciar sesión</button>
        <div className="divider"><span>o</span></div>
        <button className="btn-ghost" onClick={() => navigate("/register")}>Crear una cuenta</button>
      </div>
    </div>
  );
}