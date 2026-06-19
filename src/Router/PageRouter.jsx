import Dashboard from "@/Pages/Dashboard";
import Order from "@/Pages/Order";
import MenuContextProvider from "@/Context/MenuContextProvider";
import { Route, Routes } from "react-router";
import Menu from "@/Pages/Menu";
import Auth from "@/Pages/Auth/Auth";
import Register from "@/Pages/Auth/Register";
import Login from "@/Pages/Auth/Login";
import Home from "@/Pages/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import DashboardHome from "@/Pages/DashboardHome";

export default function PageRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/" element={<DashboardHome />} />
          <Route path="orders" element={<Order />} />
          <Route
            path="menu"
            element={
              <MenuContextProvider>
                <Menu />
              </MenuContextProvider>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}
