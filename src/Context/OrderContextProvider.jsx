import { useState, useEffect, useContext } from "react";
import { AuthContext, OrderContext } from "./Contexts";

export default function OrderContextProvider({ children }) {
  const [order, setOrder] = useState(() => {
    const orders = JSON.parse(localStorage.getItem("orders"));
    return orders ? orders : [];
  });
  const { userEmail } = useContext(AuthContext);

  const currentOrder = order.find(
    (userOrder) => userOrder.userEmail === userEmail && !userOrder.status,
  );

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(order));
  }, [order]);

  return (
    <OrderContext.Provider value={{ order, setOrder, currentOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
