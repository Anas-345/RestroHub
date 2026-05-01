import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext, OrderContext } from "@/Context/Contexts";
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

  const { order, setOrder } = useContext(OrderContext);
  const { userEmail } = useContext(AuthContext);

  const isMounted = useRef(false);

  const dishAvailability = status === "Available" ? "Disable" : "Enable";

  const existingOrder = order.find(userOrder => userOrder.userEmail === userEmail && userOrder.status === '')

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (quantity === 0 && order.length) {
      setOrderState(false);
      if (existingOrder?.items.length === 1) {
        setOrder((prev) =>
          prev.filter(
            (userOrder) => userOrder.userEmail !== existingOrder.userEmail,
          ),
        );
        return;
      }
      setOrder((prev) =>
        prev.map((userOrder) => ({
          ...userOrder,
          items: userOrder.items.filter((item) => item.id !== id),
        })),
      );
      return;
    }
    setOrder((prev) =>
      prev.map((userOrder) =>
        userOrder.userEmail === userEmail
          ? {
              ...userOrder,
              items: userOrder.items.map((item) =>
                item.id === id ? { ...item, quantity } : item,
              ),
            }
          : userOrder,
      ),
    );
  }, [quantity]);

  useEffect(() => {
    if (!existingOrder?.items) return;
    const existingItem = existingOrder.items.find((item) => item.id === id);
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
          existingOrder={existingOrder}
          price={price}
          userEmail={userEmail}
          setOrderState={setOrderState}
          name={name}
        />
      </div>
    </>
  );
}
