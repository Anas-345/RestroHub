export function handleOrderSubmit(
  setOrder,
  currentOrder,
  setCurrentOrder,
  setShowForm,
  totalAmount,
  uid,
  type,
) {
  setOrder((prev) => [
    ...prev,
    {
      ...currentOrder,
      status: "Request",
      totalPrice: totalAmount,
      placedAt: new Date().getTime(),
      uid,
      type,
    },
  ]);
  setCurrentOrder({});
  setShowForm(false);
}
