import { statusStyle } from "@/Functions/OrderFunctions";

export default function DetailModal({ showForm, setShowForm, selectedOrder }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${showForm ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setShowForm(false)}
      />

      <div
        className={`
          fixed z-50 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-full max-w-md mx-4
          transition-all duration-500 ease-out
          ${showForm ? "top-1/2 opacity-100 scale-100" : "top-1/3 opacity-0 scale-95 pointer-events-none"}
        `}
        onKeyDown={(e) => e.key === "Escape" && setShowForm(false)}
      >
        <div className="bg-[#161412] border border-[#2e2a24] rounded-2xl shadow-2xl shadow-black/80 overflow-hidden flex flex-col max-h-[90vh]">
          <div className="h-px w-full bg-linear-to-r from-[#e8a045]/60 via-[#e8a045] to-[#c45c2e]/60 shrink-0" />

          <div className="flex items-center justify-between px-6 pt-6 pb-4 shrink-0 border-b border-[#2e2a24]/40">
            <div>
              <h2
                className="text-[#f0ebe3] text-xl font-bold"
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
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4 bg-[#1f1b18] p-4 rounded-xl border border-[#2e2a24]/60">
              <div>
                <span className="text-xxs tracking-wider uppercase text-[#7a7268] block">
                  Customer
                </span>
                <span className="text-[#f0ebe3] font-medium text-sm">
                  {selectedOrder.name}
                </span>
              </div>
              <div>
                <span className="text-xxs tracking-wider uppercase text-[#7a7268] block">
                  Date & Time
                </span>
                <span className="text-[#f0ebe3] text-sm">
                  {formatDate(selectedOrder.placedAt)}
                </span>
              </div>
              <div>
                <span className="text-xxs tracking-wider uppercase text-[#7a7268] block">
                  Order Type
                </span>
                <span className="inline-block mt-0.5 px-3 py-0.5 text-xs rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 capitalize font-medium">
                  {selectedOrder.type}
                </span>
              </div>
              <div>
                <span className="text-xxs tracking-wider uppercase text-[#7a7268] block">
                  Status
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border w-fit ${statusStyle[selectedOrder.status]}`}
                >
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-wider text-[#7a7268] font-semibold mb-3">
                Items Summary ({selectedOrder.items?.length})
              </h3>
              <div className="space-y-3 max-h-55 overflow-y-auto pr-1">
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  selectedOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-2 border-b border-[#2e2a24]/30 last:border-0"
                    >
                      <div className="pr-4">
                        <p className="text-[#f0ebe3] text-sm font-medium leading-snug">
                          {item.name}
                        </p>
                        <p className="text-[#7a7268] text-xs mt-0.5">
                          Rs. {item.price} <span className="mx-1">×</span>{" "}
                          {item.quantity}
                        </p>
                      </div>
                      <div className="text-[#f0ebe3] font-semibold text-sm shrink-0">
                        Rs.{item.price * item.quantity}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[#7a7268] text-sm italic py-2">
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
                <span className="text-[#f0ebe3] font-mono">Rs.{0}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#2e2a24]/40 mt-1">
                <span className="text-sm font-medium text-[#f0ebe3]">
                  Total Amount
                </span>
                <span
                  className="text-xl font-bold text-[#e8a045] font-mono"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Rs.{selectedOrder.totalPrice}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
