import { AuthContext, OrderContext } from "@/Context/Contexts";
import { useContext, useState } from "react";
import Buttons from "../shared/Buttons";
import {  orderStatus, statusStyle } from "@/data/data";
import { buttonText, formatDate, getWarningMessage, handleCancel, handleCloseForm, handleProceed } from "@/Functions/Order/OrderDetailModal";

export default function DetailModal({ showForm, setShowForm, selectedOrder }) {
  const [safetyCheck, setSafetyCheck] = useState(null);

  const { setOrder } = useContext(OrderContext);
  const { user } = useContext(AuthContext);

  const statusIndex = orderStatus.findIndex(
    (orderState) => selectedOrder.status === orderState,
  );

  const { role } = user;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${
          showForm ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={()=>handleCloseForm(setSafetyCheck, setShowForm)}
      />
      <div
        className={`
          fixed z-50 left-1/2 -translate-x-1/2
          w-full max-w-md px-4 sm:px-0
          transition-all duration-500 ease-out
          /* Anchor to bottom on mobile, center on desktop without changing the animation scale types */
          bottom-4 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2
          ${showForm ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        `}
      >
        <div className="bg-[#161412] border border-[#2e2a24] rounded-2xl shadow-2xl shadow-black/90 overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[90vh]">
          <div className="h-px w-full bg-linear-to-r from-[#e8a045]/60 via-[#e8a045] to-[#c45c2e]/60 shrink-0" />

          <div className="flex items-center justify-between px-5 py-4 sm:px-6 sm:pt-6 sm:pb-4 shrink-0 border-b border-[#2e2a24]/40">
            <div>
              <h2
                className="text-[#f0ebe3] text-lg sm:text-xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Order Details
              </h2>
              <p className="text-[#7a7268] text-xs mt-0.5">
                Overview and actions for No.{" "}
                <span className="text-[#e8a045] font-mono">
                  {selectedOrder.index}
                </span>
              </p>
            </div>
            <button
              className="text-[#7a7268] hover:text-[#f0ebe3] hover:bg-[#2e2a24] w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer text-lg"
              onClick={()=>handleCloseForm(setSafetyCheck, setShowForm)}
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-6 space-y-5 sm:space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 bg-[#1f1b18] p-3 sm:p-4 rounded-xl border border-[#2e2a24]/60">
              <div>
                <span className="text-[10px] tracking-wider uppercase text-[#7a7268] block mb-0.5">
                  Customer
                </span>
                <span className="text-[#f0ebe3] font-medium text-xs sm:text-sm block truncate">
                  {selectedOrder.name || ""}
                </span>
              </div>
              <div>
                <span className="text-[10px] tracking-wider uppercase text-[#7a7268] block mb-0.5">
                  Date & Time
                </span>
                <span className="text-[#f0ebe3] text-xs sm:text-sm block">
                  {formatDate(selectedOrder.placedAt)}
                </span>
              </div>
              <div>
                <span className="text-[10px] tracking-wider uppercase text-[#7a7268] block mb-0.5">
                  Order Type
                </span>
                <span className="inline-block mt-0.5 px-2.5 py-0.5 text-[11px] rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 capitalize font-medium">
                  {selectedOrder.type}
                </span>
              </div>
              <div>
                <span className="text-[10px] tracking-wider uppercase text-[#7a7268] block mb-0.5">
                  Status
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border w-fit ${statusStyle[selectedOrder.status]}`}
                >
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-[#7a7268] font-semibold mb-3">
                Items Summary ({selectedOrder.items?.length})
              </h3>
              <div className="space-y-2 max-h-40 sm:max-h-55 overflow-y-auto pr-1">
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  selectedOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-2 border-b border-[#2e2a24]/30 last:border-0"
                    >
                      <div className="pr-4 min-w-0">
                        <p className="text-[#f0ebe3] text-xs sm:text-sm font-medium leading-snug truncate">
                          {item.name}
                        </p>
                        <p className="text-[#7a7268] text-[11px] mt-0.5">
                          Rs. {item.price} <span className="mx-1">×</span>{" "}
                          {item.quantity}
                        </p>
                      </div>
                      <div className="text-[#f0ebe3] font-semibold text-xs sm:text-sm shrink-0">
                        Rs.{item.price * item.quantity}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[#7a7268] text-xs italic py-2">
                    No items inside this order.
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-[#2e2a24] pt-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#7a7268]">Subtotal</span>
                <span className="text-[#f0ebe3] font-mono">
                  Rs.{selectedOrder.totalPrice}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#7a7268]">Taxes & Fees</span>
                <span className="text-[#f0ebe3] font-mono">Rs.0</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#2e2a24]/40 mt-1">
                <span className="text-xs sm:text-sm font-medium text-[#f0ebe3]">
                  Total Amount
                </span>
                <span
                  className="text-lg sm:text-xl font-bold text-[#e8a045] font-mono"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Rs.{selectedOrder.totalPrice}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-4 sm:p-6 bg-[#1b1916] border-t border-[#2e2a24]/50 shrink-0">
            <div className="flex items-center gap-3 w-full">
              {role === "owner" ? (
                <>
                  {statusIndex === 0 && (
                    <Buttons
                      content={
                        safetyCheck === "cancel"
                          ? "Confirm Reject"
                          : "Reject Order"
                      }
                      selectVariant={"Danger"}
                      handleClick={()=>handleCancel(safetyCheck, setSafetyCheck, setOrder, selectedOrder)}
                    />
                  )}
                  {statusIndex < 4 && (
                    <Buttons
                      content={buttonText(statusIndex, safetyCheck)}
                      selectVariant={"Default"}
                      handleClick={()=>handleProceed(safetyCheck, statusIndex, setSafetyCheck, setOrder, selectedOrder)}
                    />
                  )}
                </>
              ) : (
                <>
                  {statusIndex < 3 && (
                    <Buttons
                      content={
                        safetyCheck === "cancel"
                          ? "Confirm Cancel"
                          : "Cancel Order"
                      }
                      selectVariant={"Delete"}
                      handleClick={()=>handleCancel(safetyCheck, setSafetyCheck, setOrder, selectedOrder)}
                    />
                  )}
                </>
              )}
            </div>

            {safetyCheck && (
              <p
                className={`text-[11px] sm:text-xs text-center font-medium tracking-wide leading-normal transition-all duration-300 w-full animate-pulse rounded-lg p-2.5 border ${
                  safetyCheck === "cancel"
                    ? "text-rose-400 bg-rose-500/5 border-rose-500/10"
                    : "text-amber-400 bg-amber-500/5 border-amber-500/10"
                }`}
              >
                ⚠️ <span className="font-semibold">Attention:</span> You are
                about to {getWarningMessage(safetyCheck, statusIndex)} Click the action button again to
                confirm.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
