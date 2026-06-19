import SideBar from "@/Components/SideBar";
import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <div className="flex bg-[#0f0e0c] text-white min-h-screen">
      <SideBar />
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
