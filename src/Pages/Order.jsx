import { useContext, useState } from "react";
import HamburgerMenu from "@/Components/shared/HamburgerMenu";
import { AuthContext, OrderContext } from "@/Context/Contexts";
import Modal from "@/Components/Order/Modal";

export default function Order() {
const [showForm, setShowForm] = useState(false)

  const { userRole } = useContext(AuthContext);
  const { order } = useContext(OrderContext);
  return (
    <div className="flex-1 min-h-screen p-4 sm:p-6 md:p-8 bg-[#0f0e0c]">
      <div className="flex items-center justify-between mb-8 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <HamburgerMenu />
<Modal showForm={showForm} setShowForm={setShowForm}/>
          <div className="min-w-0">
            <h1
              className="text-[#f0ebe3] text-2xl sm:text-[28px] font-bold tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Order
            </h1>
            <p className="text-[#7a7268] text-sm mt-0.5 hidden sm:block">
              {userRole === "owner"
                ? "Track and manage all incoming orders"
                : "Track your orders and see your order history"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden sm:flex shrink-0 items-center gap-2 bg-[#1a1814] border border-[#2e2a24] rounded-lg px-3 py-2">
            <span className="w-2 h-2 rounded-full bg-[#e8a045] inline-block" />
            <span className="text-[#7a7268] text-xs font-medium uppercase tracking-widest">
              {order.length} Orders
            </span>
          </div>
          {userRole === "customer" && (
            <button className="bg-[#e8a045] hover:bg-[#f0aa55] active:scale-95 text-[#0f0e0c] text-sm font-bold px-3 sm:px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 whitespace-nowrap" onClick={()=>setShowForm(true)}>
              + Place Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
