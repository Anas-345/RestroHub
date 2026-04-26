export default function DishInfo({
  name,
  type,
  description,
  price,
  totalOrders,
}) {
  return (
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
            <span className="text-[#f0ebe3] font-semibold">{totalOrders}</span>{" "}
            orders
          </p>
        </div>
      </div>
    </div>
  );
}
