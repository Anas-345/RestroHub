import { SideBarContext } from "@/Context/Contexts";
import { useContext } from "react";
import { Outlet } from "react-router";

export default function Auth() {
  const { setSidebarOpen } = useContext(SideBarContext);
  return (
    <>
      <div className="mt-6 ml-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex flex-col gap-1.5 p-2 rounded-lg text-[#7a7268] hover:bg-[#1a1814] hover:text-[#f0ebe3] transition-all cursor-pointer shrink-0 md:hidden"
        >
          <span className="block w-5 h-0.5 bg-current rounded" />
          <span className="block w-5 h-0.5 bg-current rounded" />
          <span className="block w-5 h-0.5 bg-current rounded" />
        </button>
      </div>
      <div className="min-h-screen bg-[#0f0e0c] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-[#161412] border border-[#2e2a24] rounded-2xl overflow-hidden">
          <div className="p-8 flex flex-col gap-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
