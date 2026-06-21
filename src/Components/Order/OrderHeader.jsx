import { useContext, useState } from "react";
import HamburgerMenu from "@/Components/shared/HamburgerMenu";
import { AuthContext, OrderContext } from "@/Context/Contexts";
import Modal from "@/Components/Order/Modal";
import Buttons from "@/Components/shared/Buttons";

export function OrderHeader() {
  const [showForm, setShowForm] = useState(false);

  const { user } = useContext(AuthContext);
  const { order } = useContext(OrderContext);

  const { role, uid } = user;

  const currentUserOrder = order.filter(
    (userOrder) => userOrder.uid === uid,
  );

  return (
    <div className="flex items-center justify-between mb-8 gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <HamburgerMenu />
        <Modal showForm={showForm} setShowForm={setShowForm} />
        <div className="min-w-0">
          <h1
            className="text-[#f0ebe3] text-2xl sm:text-[28px] font-bold tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Order
          </h1>
          <p className="text-[#7a7268] text-sm mt-0.5 hidden sm:block">
            {role === "owner"
              ? "Track and manage all incoming orders"
              : "Track your orders and see your order history"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <div className="hidden sm:flex shrink-0 items-center gap-2 bg-[#1a1814] border border-[#2e2a24] rounded-lg px-3 py-2">
          <span className="w-2 h-2 rounded-full bg-[#e8a045] inline-block" />
          <span className="text-[#7a7268] text-xs font-medium uppercase tracking-widest">
            {currentUserOrder.length} Orders
          </span>
        </div>
        {role === "customer" && (
          <Buttons
            content={"+ Place Order"}
            handleClick={() => setShowForm(true)}
            selectVariant={"Default"}
          />
        )}
      </div>
    </div>
  );
}
