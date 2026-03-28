import { useState } from "react";
import Dashboard from "./Components/Dashboard";
import SideBar from "./Components/SideBar";
import Menu from "./Components/Menu";
import Order from "./Components/Order";
import MenuContextProvider from "./Context/MenuContextProvider";

function App() {
  const [page, setPage] = useState("Dashboard");

  return (
    <>
      <div className="flex bg-[#0f0e0c] text-white min-h-screen">
        <SideBar setPage={setPage} />

        <div className="flex-1 min-w-0">
          {page === "Dashboard" ? (
            <Dashboard />
          ) : page === "Orders" ? (
            <Order />
          ) : (
            <MenuContextProvider>
              <Menu />
            </MenuContextProvider>
          )}
        </div>
      </div>
    </>
  );
}
export default App;
