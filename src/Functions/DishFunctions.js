import { toast } from "react-toastify";

export function idGen() {
  return (
    Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
  );
}

// Owner

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

// Customer

export function handleOrder(
  setQuantity,
  currentOrder,
  setCurrentOrder,
  id,
  price,
  setOrderState,
  name,
) {
  setQuantity(1);
  if (currentOrder?.items) {
    setCurrentOrder((prev) => ({
      ...prev,
      items: [...prev.items, { id, name, price, quantity: 1 }],
    }));
  } else {
    setCurrentOrder((prev) => ({
      ...prev,
      orderId: idGen(),
      items: [
        {
          id,
          name,
          price,
          quantity: 1,
        },
      ],
    }));
  }
  setOrderState(true);
}

export function handleAdd(setQuantity) {
  setQuantity((prev) => prev + 1);
}

export function handleSubtract(setQuantity) {
  setQuantity((prev) => prev - 1);
}
