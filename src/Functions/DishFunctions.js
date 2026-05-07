import { toast } from "react-toastify";

function deletedish(prev, id) {
  return prev.filter((dish) => dish.id !== id);
}

function statusChange(prev, id, status) {
  return status === "Available"
    ? prev.map((dish) =>
        dish.id === id ? { ...dish, status: "Not Available" } : dish,
      )
    : prev.map((dish) =>
        dish.id === id ? { ...dish, status: "Available" } : dish,
      );
}

function idGen() {
  return (
    Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
  );
}
export function handleEdit(setEditId, id, setShowEditForm) {
  setEditId(id);
  setShowEditForm(true);
}

export function handleDelete(check, setCustomDishes, setMenu, id) {
  !check
    ? setCustomDishes((prev) => deletedish(prev, id))
    : setMenu((prev) => deletedish(prev, id));
  toast.success("Dish Deleted Successfully");
}

export function handleStatus(check, setCustomDishes, setMenu, id, status) {
  !check
    ? setCustomDishes((prev) => statusChange(prev, id, status))
    : setMenu((prev) => statusChange(prev, id, status));
}

export function handleOrder(
  setQuantity,
  existingOrder,
  setOrder,
  id,
  price,
  userEmail,
  setOrderState,
  name,
) {
  setQuantity(1);
  if (existingOrder) {
    setOrder((prev) =>
      prev.map((userOrder) =>
        userOrder.userEmail === existingOrder.userEmail
          ? {
              ...userOrder,
              items: [...userOrder.items, { id, name, price, quantity: 1 }],
            }
          : userOrder,
      ),
    );
  } else {
    setOrder((prev) => [
      ...prev,
      {
        orderId: idGen(),
        userEmail,
        placedAt: 0,
        status: "",
        items: [
          {
            id,
            name,
            price,
            quantity: 1,
          },
        ],
        totalPrice: 0,
      },
    ]);
  }
  setOrderState(true);
}

export function handleAdd(setQuantity) {
  setQuantity((prev) => prev + 1);
}

export function handleSubtract(setQuantity) {
  setQuantity((prev) => Math.max(0, prev - 1));
}
