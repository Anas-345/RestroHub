import default_image from "@/assets/default_image.svg";

export default function DishImage({ image, rate, status, name }) {
  const isAvailable = status === "Available";

  return (
    <>
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
    </>
  );
}
