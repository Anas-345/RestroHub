import { useContext } from "react";
import { SideBarContext } from "../Context/Contexts";
import { days, months } from "../data/data";

export default function Dashboard() {
  const { setSidebarOpen } = useContext(SideBarContext);
  const today = new Date();
 
  return (
    <div className="flex-1 min-h-screen p-4 sm:p-6 md:p-8 bg-[#0f0e0c]">
      <div className="flex items-start justify-between mb-8 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex flex-col gap-1.5 p-2 rounded-lg text-[#7a7268] hover:bg-[#1a1814] hover:text-[#f0ebe3] transition-all cursor-pointer shrink-0 md:hidden"
          >
            <span className="block w-5 h-0.5 bg-current rounded" />
            <span className="block w-5 h-0.5 bg-current rounded" />
            <span className="block w-5 h-0.5 bg-current rounded" />
          </button>

          <div className="min-w-0">
            <h1
              className="text-[#f0ebe3] text-2xl sm:text-[28px] font-bold truncate"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Dashboard
            </h1>
            <p className="text-[#7a7268] text-sm mt-1 hidden sm:block">
              Welcome back — here's what's happening today
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2 bg-[#1a1814] border border-[#2e2a24] text-[#7a7268] text-sm px-4 py-2 rounded-lg whitespace-nowrap">
            📅 {days[today.getDay()]}, {today.getDate()}{" "}
            {months[today.getMonth()]} {today.getFullYear()}
          </div>
          <button className="bg-[#e8a045] hover:bg-[#f0aa55] active:scale-95 text-[#0f0e0c] text-sm font-bold px-3 sm:px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 whitespace-nowrap">
            + New Order
          </button>
        </div>
      </div>
    </div>
  );
}
