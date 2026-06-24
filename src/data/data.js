export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const types = [
  "Best-Foods",
  "BBQs",
  "Breads",
  "Burgers",
  "Chocolates",
  "Desserts",
  "Drinks",
  "Fried-Chicken",
  "Ice-Cream",
  "Pizzas",
  "Sandwitches",
  "Steaks",
  "Sausages",
  "Porks",
  "Custom-Dishes",
];

export const statusStyle = {
  Request: "bg-[#7a7268]/10 text-[#7a7268] border-[#7a7268]/30",
  Pending: "bg-[#e8a045]/10 text-[#e8a045] border-[#e8a045]/30",
  Preparing: "bg-[#5b9bd5]/10 text-[#5b9bd5] border-[#5b9bd5]/30",
  Ready: "bg-[#4caf82]/10 text-[#4caf82] border-[#4caf82]/30",
  Delivered: "bg-[#4caf82]/08 text-[#3a9e72] border-[#4caf82]/20",
  Cancelled: "bg-[#e05555]/10 text-[#e05555] border-[#e05555]/30",
};

export const orderStatus = [
  "Request",
  "Pending",
  "Preparing",
  "Ready",
  "Delivered",
];

export const orderPhrases = {
  0: { initial: "Accept Order", confirm: "Yes, Accept Order" },
  1: { initial: "Start Cooking", confirm: "Yes, Start Cooking Now" },
  2: { initial: "Finish Cooking", confirm: "Yes, Mark as Ready" },
  3: { initial: "Complete Delivery", confirm: "Yes, Order is Delivered" },
};