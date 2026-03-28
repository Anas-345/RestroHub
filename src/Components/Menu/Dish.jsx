import DishButton from "./DishButton";

export default function Dish({
  name,
  type,
  price,
  totalOrders,
  status,
  image,
  description,
  rate,
  index,
}) {
  let dishAvailability = status === "Available" ? "Disable" : "Enable";
  const isAvailable = status === "Available";

  return (
    <div
      className="relative flex flex-col w-full bg-[#161412] border border-[#2e2a24] hover:border-[#e8a045]/30 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 group"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="h-px w-full bg-linear-to-r from-transparent via-[#e8a045]/40 to-transparent" />

      {image && (
        <div className="relative w-full h-40 overflow-hidden bg-[#1a1814]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute top-3 right-3">
            <span
              className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full
              ${
                isAvailable
                  ? "bg-[#0f0e0c]/80 text-[#4caf82] border border-[#4caf82]/30"
                  : "bg-[#0f0e0c]/80 text-[#e05555] border border-[#e05555]/30"
              }`}
            >
              {status}
            </span>
          </div>
          {rate && (
            <div className="absolute top-3 left-3 bg-[#0f0e0c]/80 border border-[#2e2a24] rounded-full px-2.5 py-1 flex items-center gap-1">
              <span className="text-[#e8a045] text-[10px]">★</span>
              <span className="text-[#f0ebe3] text-[10px] font-bold">
                {rate}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2 p-4">
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
          <p className="text-[#7a7268] text-xs leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex items-center justify-between pt-3 mt-1 border-t border-[#2e2a24]">
          <p
            className="text-[#e8a045] font-bold text-base"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Rs {price}
          </p>
          <p className="text-[#7a7268] text-xs">
            <span className="text-[#f0ebe3] font-semibold">{totalOrders}</span>{" "}
            orders
          </p>
        </div>
      </div>

      <div className="flex gap-2 px-4 pb-4">
        <DishButton content="Edit" />
        <DishButton content={dishAvailability} />
        <DishButton content="Delete" />
      </div>
    </div>
  );
}
