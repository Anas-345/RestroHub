import Dashboard from "@/Pages/Dashboard";
import Order from "@/Pages/Order";
import MenuContextProvider from "@/Context/MenuContextProvider";
import { Route, Routes } from "react-router";
import Menu from "@/Pages/Menu";
import Auth from "@/Pages/Auth/Auth";
import Register from "@/Pages/Auth/Register";
import Login from "@/Pages/Auth/Login";
import Home from '@/Components/Home'

export default function PageRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="orders" element={<Order />} />
      <Route
        path="menu"
        element={
          <MenuContextProvider>
            <Menu />
          </MenuContextProvider>
        }
      />
      <Route path="/auth" element={<Auth/>}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}
