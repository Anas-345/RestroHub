import HamburgerMenu from "@/Components/shared/HamburgerMenu";
import { days, months } from "@/data/data";

export default function DashboardHome() {
  const today = new Date();

  return (
    <div className="flex-1 min-h-screen p-4 sm:p-6 md:p-8 bg-[#0f0e0c]">
      <div className="flex items-start justify-between mb-8 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <HamburgerMenu />

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
