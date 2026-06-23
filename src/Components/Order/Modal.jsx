import { AuthContext, OrderContext } from "@/Context/Contexts";
import { useContext, useRef } from "react";
import Buttons from "../shared/Buttons";
import { handleOrderSubmit } from "@/Functions/OrderFunctions";

export default function Modal({ showForm, setShowForm }) {
  const inpRef = useRef();

  const { currentOrder, setOrder, setCurrentOrder } = useContext(OrderContext);
  const { user } = useContext(AuthContext);

  const { uid } = user;

  const totalAmount = currentOrder?.items?.reduce(
    (total, item) => item.price * item.quantity + total,
    0,
  );

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${showForm ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={()=>setShowForm(false)}
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

          <div className="flex items-center justify-between px-6 pt-6 pb-4 shrink-0">
            <div>
              <h2
                className="text-[#f0ebe3] text-xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Place Your Order
              </h2>
              <p className="text-[#7a7268] text-xs mt-0.5">
                Fill in the details to place your order
              </p>
            </div>
            <button
              className="text-[#7a7268] hover:text-[#f0ebe3] hover:bg-[#2e2a24] w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer text-lg"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>
          </div>

          {currentOrder?.items ? (
            <>
              <div
                className="overflow-y-auto px-6 flex flex-col custom-scrollbar">
                {currentOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-2.5 border-b border-[#2e2a24]"
                  >
                    <p className="text-[#7a7268] text-sm">
                      <span className="text-[#f0ebe3] font-semibold">
                        {item.quantity}x
                      </span>{" "}
                      {item.name}
                    </p>
                    <p className="text-[#e8a045] font-semibold text-sm">
                      Rs {item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="px-6 pb-6 shrink-0">
                <div className="flex justify-between items-center pt-3 mt-1">
                  <p className="text-[#7a7268] text-xs uppercase tracking-widest font-semibold">
                    Total
                  </p>
                  <p
                    className="text-[#e8a045] font-bold text-base"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Rs {totalAmount}
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 mt-4">
                  <label
                    htmlFor="type"
                    className="text-[#7a7268] text-[11px] uppercase tracking-[1.5px] font-medium"
                  >
                    Type
                  </label>
                  <select
                    id="type"
                    className="w-full bg-[#1a1814] border border-[#2e2a24] rounded-lg px-4 py-2.5 text-sm text-[#f0ebe3] outline-none focus:border-[#e8a045]/50 focus:bg-[#1e1c18] transition-all duration-200 cursor-pointer"
                    ref={inpRef}
                  >
                    <option value="dine-in">Dine-in</option>
                    <option value="takeaway">Takeaway</option>
                    <option value="delivery">Delivery</option>
                  </select>
                </div>

                <div className="flex gap-3 mt-6">
                  <Buttons
                    content={"Cancel"}
                    handleClick={() => setShowForm(false)}
                    selectVariant={"LightBtn"}
                  />
                  <Buttons
                    content={"Place Order"}
                    handleClick={() =>
                      handleOrderSubmit(
                        setOrder,
                        currentOrder,
                        setCurrentOrder,
                        setShowForm,
                        totalAmount,
                        uid,
                        inpRef.current.value
                      )
                    }
                    selectVariant={"Default"}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 gap-3 px-6 pb-6">
              <span className="text-4xl opacity-30">🛒</span>
              <p className="text-[#f0ebe3] font-semibold text-sm">
                No items selected
              </p>
              <p className="text-[#7a7268] text-xs">
                Go to menu and add dishes to your order
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
