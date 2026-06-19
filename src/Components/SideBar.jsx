import { useContext } from "react";
import { useNavigate } from "react-router";
import { SideBarContext } from "../Context/Contexts";

export default function SideBar() {
  const { sidebarOpen, setSidebarOpen } = useContext(SideBarContext);
  const navigate = useNavigate();

  function handleClick(path) {
    navigate(path);
  }

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 z-30 h-screen
          w-64 bg-[#1a1814] border-r border-[#2e2a24] flex flex-col py-7 shrink-0
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:sticky md:translate-x-0 md:w-55 md:min-h-screen
        `}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-[#7a7268] hover:text-[#f0ebe3] transition-colors md:hidden"
        >
          ✕
        </button>

        <div className="px-6 pb-8 border-b border-[#2e2a24]">
          <div
            className="text-[#e8a045] text-[22px] font-black cursor-pointer"
            style={{ fontFamily: "'Playfair Display', serif" }}
            onClick={() => handleClick("/")}
          >
            🍛 RestroHub
          </div>
          <div className="text-[#7a7268] text-[11px] tracking-[2px] uppercase mt-0.5">
            Restaurant OS
          </div>
        </div>

        <nav className="px-3 py-5 flex-1">
          <p className="text-[#7a7268] text-[10px] uppercase tracking-[2px] px-3 mb-2">
            Main
          </p>
          <button
            onClick={() => handleClick("/dashboard")}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[#7a7268] hover:bg-[#221f1a] hover:text-[#f0ebe3] active:scale-95 text-sm font-medium cursor-pointer transition-all duration-200 mb-0.5"
          >
            Dashboard
          </button>
          <button
            onClick={() => handleClick("/dashboard/orders")}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[#7a7268] hover:bg-[#221f1a] hover:text-[#f0ebe3] active:scale-95 text-sm font-medium cursor-pointer transition-all duration-200 mb-0.5"
          >
            Orders
          </button>
          <button
            onClick={() => handleClick("/dashboard/menu")}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[#7a7268] hover:bg-[#221f1a] hover:text-[#f0ebe3] active:scale-95 text-sm font-medium cursor-pointer transition-all duration-200 mb-0.5"
          >
            Menu
          </button>
        </nav>
      </div>
    </>
  );
}
