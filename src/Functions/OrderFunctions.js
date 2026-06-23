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

export const statusStyle = {
  Pending: "bg-[#e8a045]/10 text-[#e8a045] border-[#e8a045]/30",
  Preparing: "bg-[#5b9bd5]/10 text-[#5b9bd5] border-[#5b9bd5]/30",
  Ready: "bg-[#4caf82]/10 text-[#4caf82] border-[#4caf82]/30",
  Delivered: "bg-[#4caf82]/08 text-[#3a9e72] border-[#4caf82]/20",
  Cancelled: "bg-[#e05555]/10 text-[#e05555] border-[#e05555]/30",
};
