import { useState, useEffect } from "react";
import { OrderContext } from "./Contexts";

export default function OrderContextProvider({ children }) {
  const [order, setOrder] = useState(() => {
    const orders = JSON.parse(localStorage.getItem("orders"));
    return orders ? orders : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(order));
  }, [order]);

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
