import { orderPhrases, orderStatus } from "@/data/data";

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function buttonText(statusIndex, safetyCheck) {
  const currentOrderPhrase = orderPhrases[statusIndex] || {
    initial: "",
    confirm: "",
  };

  const btnText =
    safetyCheck && safetyCheck !== "cancel"
      ? currentOrderPhrase.confirm
      : currentOrderPhrase.initial;
  return btnText;
}

export function getWarningMessage(safetyCheck, statusIndex) {
  if (safetyCheck === "cancel") {
    return "permanently CANCEL and REJECT this order. This action cannot be undone.";
  }
  if (safetyCheck === "accept") {
    return "ACCEPT this request and add it to your active pending queue.";
  }

  const nextStatus = orderStatus[statusIndex + 1];
  return `advance this order status to ${nextStatus?.toUpperCase()}.`;
}

export function handleCancel(
  safetyCheck,
  setSafetyCheck,
  setOrder,
  selectedOrder,
) {
  if (safetyCheck != "cancel") {
    setSafetyCheck("cancel");
    return;
  }

  setOrder((prev) =>
    prev.map((userOrder) =>
      userOrder.orderId === selectedOrder.orderId
        ? { ...userOrder, status: "Cancelled" }
        : userOrder,
    ),
  );

  handleCloseForm();
}

export function handleProceed(
  safetyCheck,
  statusIndex,
  setSafetyCheck,
  setOrder,
  selectedOrder,
  setShowForm,
) {
  if (!safetyCheck || safetyCheck === "cancel") {
    statusIndex === 0
      ? setSafetyCheck("accept")
      : setSafetyCheck(selectedOrder.status);
    return;
  }

  setOrder((prev) =>
    prev.map((userOrder) =>
      userOrder.orderId === selectedOrder.orderId
        ? { ...userOrder, status: orderStatus[statusIndex + 1] }
        : userOrder,
    ),
  );
  handleCloseForm(setSafetyCheck, setShowForm);
}

export function handleCloseForm(setSafetyCheck, setShowForm) {
  setShowForm(false);
  setSafetyCheck(null);
}
