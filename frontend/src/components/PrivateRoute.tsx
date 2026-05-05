import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react/jsx-dev-runtime";


export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();

  const { user } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}