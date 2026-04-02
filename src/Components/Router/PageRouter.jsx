import { Route, Routes } from "react-router";
import Dashboard from "../Dashboard";
import Order from "../Order";
import Menu from "../Menu";
import MenuContextProvider from "../../Context/MenuContextProvider";

export default function PageRouter() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="orders" element={<Order />} />
      <Route path="menu" element={
       <MenuContextProvider>
          <Menu />
       </MenuContextProvider>
        } />
    </Routes>
  );
}
