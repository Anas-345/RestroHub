import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "@/Context/Contexts";

export default function ProtectedRoutes() {
  const { isLogin } = useContext(AuthContext);
  return isLogin ? <Outlet /> : <Navigate to="/auth/login" />;
}
