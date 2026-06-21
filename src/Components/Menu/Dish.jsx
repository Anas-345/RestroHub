import { useContext, useEffect, useRef, useState } from "react";
import { OrderContext } from "@/Context/Contexts";
import DishImage from "../Dish/DishImage";
import DishInfo from "../Dish/DishInfo";
import DishButtons from "../Dish/DishButtons";

export default function Dish({
  id,
  name,
  type,
  price,
  totalOrders,
  status,
  image,
  description,
  rate,
  index,
  setShowEditForm,
  setEditId,
}) {
  const [orderState, setOrderState] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const { currentOrder, setCurrentOrder } = useContext(OrderContext);

  const isMounted = useRef(false);

  const dishAvailability = status === "Available" ? "Disable" : "Enable";

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (quantity <= 0) {
      setOrderState(false);
      if (currentOrder?.items.length === 1) {
        setCurrentOrder({});
        return;
      }

      setCurrentOrder((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      }));
      return;
    }

    setCurrentOrder((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    }));
  }, [quantity]);

  useEffect(() => {
    if (!currentOrder?.items) return;
    const existingItem = currentOrder.items.find((item) => item.id === id);
    if (existingItem) {
      setQuantity(existingItem.quantity);
      setOrderState(true);
    }
  }, []);
  return (
    <>
      <div
        className="relative flex flex-col w-full bg-[#161412] border border-[#2e2a24] hover:border-[#e8a045]/30 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 group"
        style={{ animationDelay: `${index * 40}ms` }}
      >
        <div className="h-px w-full bg-linear-to-r from-[#e8a045]/60 via-[#e8a045] to-[#c45c2e]/60" />

        <DishImage image={image} rate={rate} status={status} name={name} />

        <DishInfo
          name={name}
          type={type}
          description={description}
          price={price}
          totalOrders={totalOrders}
        />
        <DishButtons
          dishAvailability={dishAvailability}
          id={id}
          status={status}
          setEditId={setEditId}
          setShowEditForm={setShowEditForm}
          orderState={orderState}
          quantity={quantity}
          setQuantity={setQuantity}
          price={price}
          setOrderState={setOrderState}
          name={name}
        />
      </div>
    </>
  );
}
