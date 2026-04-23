import { useContext } from "react";
import Buttons from "../shared/Buttons";
import { toast } from "react-toastify";
import { MenuContext } from "@/Context/Contexts";
import default_image from '@/assets/default_image.svg'

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
  customDishes,
  setCustomDishes,
  setShowEditForm,
  setEditId
}) {

  const { menu, setMenu } = useContext(MenuContext);

  let dishAvailability = status === "Available" ? "Disable" : "Enable";
  const isAvailable = status === "Available";

  const check =
    customDishes.length === menu.length
      ? menu.filter((dish, i) => customDishes[i].id !== dish.id).length
      : 1;

  function deletedish(prev) {
    return prev.filter((dish) => dish.id !== id);
  }

  function statusChange(prev) {
    return status === "Available"
      ? prev.map((dish) =>
          dish.id === id ? { ...dish, status: "Not Available" } : dish,
        )
      : prev.map((dish) =>
          dish.id === id ? { ...dish, status: "Available" } : dish,
        );
  }

  function handleDelete() {
    !check
      ? setCustomDishes((prev) => deletedish(prev))
      : setMenu((prev) => deletedish(prev));
    toast.success("Dish Deleted Successfully");
  }

  function handleStatus() {
    !check
      ? setCustomDishes((prev) => statusChange(prev))
      : setMenu((prev) => statusChange(prev));
  }

  function handleEdit() {
    setEditId(id)
    setShowEditForm(true);
  }

  return (
    <>
      <div
        className="relative flex flex-col w-full bg-[#161412] border border-[#2e2a24] hover:border-[#e8a045]/30 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 group"
        style={{ animationDelay: `${index * 40}ms` }}
      >
        <div className="h-px w-full bg-linear-to-r from-[#e8a045]/60 via-[#e8a045] to-[#c45c2e]/60" />

        {image && (
          <div className="relative w-full h-44 overflow-hidden bg-[#1a1814]">
            <img
              src={image}
              alt={name}
              onError={(e) => (e.target.src = default_image)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#161412]/60 via-transparent to-transparent" />

            <div className="absolute top-3 right-3">
              <span
                className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm
              ${
                isAvailable
                  ? "bg-[#0f0e0c]/70 text-[#4caf82] border border-[#4caf82]/40"
                  : "bg-[#0f0e0c]/70 text-[#e05555] border border-[#e05555]/40"
              }`}
              >
                {status}
              </span>
            </div>

            {rate && (
              <div className="absolute top-3 left-3 bg-[#0f0e0c]/70 backdrop-blur-sm border border-[#e8a045]/20 rounded-full px-2.5 py-1 flex items-center gap-1">
                <span className="text-[#e8a045] text-[10px]">★</span>
                <span className="text-[#f0ebe3] text-[10px] font-bold">
                  {rate}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-2 p-4 flex-1">
          <div>
            <h2 className="text-[#f0ebe3] font-semibold text-[15px] leading-snug group-hover:text-white transition-colors">
              {name}
            </h2>
            {type && (
              <p className="text-[#7a7268] text-[10px] mt-0.5 uppercase tracking-[1.5px] font-medium">
                {type}
              </p>
            )}
          </div>

          {description && (
            <p className="text-[#5a5450] text-xs leading-relaxed line-clamp-2">
              {description}
            </p>
          )}

          <div className="flex items-center justify-between pt-3 mt-auto border-t border-[#2e2a24]">
            <p
              className="text-[#e8a045] font-bold text-base"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Rs {price}
            </p>
            <div className="flex items-center gap-1.5 bg-[#1a1814] border border-[#2e2a24] rounded-full px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8a045]/60 inline-block" />
              <p className="text-[#7a7268] text-[10px]">
                <span className="text-[#f0ebe3] font-semibold">
                  {totalOrders}
                </span>{" "}
                orders
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 px-4 pb-4">
          <Buttons content={dishAvailability} handleClick={handleStatus} />
          <Buttons content="Edit" handleClick={handleEdit} />
          <Buttons content="Delete" handleClick={handleDelete} />
        </div>
      </div>
    </>
  );
}
