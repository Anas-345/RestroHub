import { SideBarContext } from "@/Context/Contexts";
import { useContext } from "react";

export default function HamburgerMenu() {
  const { setSidebarOpen } = useContext(SideBarContext);

  return (
    <button
      onClick={() => setSidebarOpen(true)}
      className="flex flex-col gap-1.5 p-2 rounded-lg text-[#7a7268] hover:bg-[#1a1814] hover:text-[#f0ebe3] transition-all cursor-pointer shrink-0 md:hidden"
    >
      <span className="block w-5 h-0.5 bg-current rounded" />
      <span className="block w-5 h-0.5 bg-current rounded" />
      <span className="block w-5 h-0.5 bg-current rounded" />
    </button>
  );
}
