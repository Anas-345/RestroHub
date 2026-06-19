import { OrderHeader } from "@/Components/Order/OrderHeader";
import { AuthContext, OrderContext } from "@/Context/Contexts";
import { useContext } from "react";

export default function Order() {
  const { order } = useContext(OrderContext);
  const { user } = useContext(AuthContext);

  const { role, email } = user;

  const displayOrders =
    role === "owner"
      ? order
      : order.filter((userOrder) => (userOrder.userEmail === email && userOrder.status));

    const gridCols = role === "owner"
  ? "grid-cols-[1fr_1.2fr_1fr_1fr_0.5fr] md:grid-cols-[1fr_1.2fr_2fr_1fr_1fr_1fr_0.5fr]"
  : "grid-cols-[1fr_1fr_1fr_0.5fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr_0.5fr]";

  const statusStyle = {
    Pending: "bg-[#e8a045]/10 text-[#e8a045] border-[#e8a045]/30",
    Preparing: "bg-[#5b9bd5]/10 text-[#5b9bd5] border-[#5b9bd5]/30",
    Ready: "bg-[#4caf82]/10 text-[#4caf82] border-[#4caf82]/30",
    Delivered: "bg-[#4caf82]/08 text-[#3a9e72] border-[#4caf82]/20",
    Cancelled: "bg-[#e05555]/10 text-[#e05555] border-[#e05555]/30",
  };

  return (
    <div className="flex-1 min-h-screen p-4 sm:p-6 md:p-8 bg-[#0f0e0c]">
      <OrderHeader />
      <div className="bg-[#1a1814] border border-[#2e2a24] rounded-2xl overflow-hidden shadow-2xl shadow-black/40">

        <div className={`grid ${gridCols} gap-4 px-6 py-3 bg-[#221f1a] border-b border-[#2e2a24]`}>
          <p className="text-[#7a7268] text-[10px] uppercase tracking-[1.5px] font-semibold">Order No.</p>
          {role === "owner" && <p className="text-[#7a7268] text-[10px] uppercase tracking-[1.5px] font-semibold">Customer</p>}
          <p className="hidden md:block text-[#7a7268] text-[10px] uppercase tracking-[1.5px] font-semibold">Items</p>
          <p className="text-[#7a7268] text-[10px] uppercase tracking-[1.5px] font-semibold">Total</p>
          <p className="text-[#7a7268] text-[10px] uppercase tracking-[1.5px] font-semibold">Status</p>
          <p className="hidden md:block text-[#7a7268] text-[10px] uppercase tracking-[1.5px] font-semibold">Time</p>
          <p className="text-[#7a7268] text-[10px] uppercase tracking-[1.5px] font-semibold">Action</p>
        </div>

        {displayOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <span className="text-5xl opacity-30">🧾</span>
            <p className="text-[#f0ebe3] font-semibold text-sm">No orders yet</p>
            <p className="text-[#7a7268] text-xs">Orders will appear here once placed</p>
          </div>
        ) : (
          displayOrders.map((userOrder, i) => (
            <div
              key={userOrder.userEmail + i}
              className={`grid ${gridCols} gap-4 px-6 py-4 border-b border-[#2e2a24] last:border-none hover:bg-[#e8a045]/2 transition-colors items-center`}
            >
              <p className="text-[#e8a045] text-xs font-bold tracking-wide">#{String(i + 1).padStart(3, "0")}</p>

              {role === "owner" && (
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#2e2a24] border border-[#3d3a37] flex items-center justify-center text-[#e8a045] text-xs font-bold shrink-0">
                    {userOrder.userName?.[0]?.toUpperCase()}
                  </div>
                  <p className="text-[#f0ebe3] text-sm font-medium truncate">{userOrder.userName}</p>
                </div>
              )}

              <div className="hidden md:flex flex-col gap-0.5">
                {userOrder.items.map((item, j) => (
                  <p key={j} className="text-[#7a7268] text-xs">
                    <span className="text-[#f0ebe3] font-semibold">{item.quantity}x</span> {item.name}
                  </p>
                ))}
              </div>

              <p className="text-[#e8a045] font-bold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
                Rs {userOrder.items.reduce((total, item) => item.quantity * item.price + total, 0)}
              </p>

              <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border w-fit ${statusStyle[userOrder.status]}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {userOrder.status}
              </span>

              <p className="hidden md:block text-[#7a7268] text-xs">{new Date(userOrder.placedAt).toLocaleTimeString()}</p>

              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#2e2a24] text-[#7a7268] hover:text-[#e8a045] hover:border-[#e8a045]/40 hover:bg-[#e8a045]/5 transition-all duration-200 cursor-pointer">
                👁
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}