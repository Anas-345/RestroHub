import OrderBody from "@/Components/Order/OrderBody";
import { OrderHeader } from "@/Components/Order/OrderHeader";

export default function Order() {
  return (
    <div className="flex-1 min-h-screen p-4 sm:p-6 md:p-8 bg-[#0f0e0c]">
      <OrderHeader />
      <OrderBody />
    </div>
  );
}
