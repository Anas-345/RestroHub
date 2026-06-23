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
      status: "Pending",
      totalPrice: totalAmount,
      placedAt: new Date().getTime(),
      uid,
      type,
    },
  ]);
  setCurrentOrder({});
  setShowForm(false);
}

export function handleScroll(scrollRef, setIsBottom) {
  const el = scrollRef.current;
  if (!el) return;
  setIsBottom(el.scrollHeight - el.scrollTop <= el.clientHeight + 5);
}
