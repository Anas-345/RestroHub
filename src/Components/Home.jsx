import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f0e0c] flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center text-center max-w-xl">
        <h1
          className="text-[#f0ebe3] text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Run your Restaurant <span className="text-[#e8a045]">smarter,</span>{" "}
          faster.
        </h1>

        <p className="text-[#7a7268] text-base sm:text-lg leading-relaxed mb-8">
          Complete operations management for restaurants — from kitchen to
          customer.
        </p>

        <ul className="flex flex-col sm:flex-row items-center gap-3 mb-10">
          {[
            "Real-time order tracking",
            "Menu & inventory control",
            "Daily revenue insights",
          ].map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 bg-[#161412] border border-[#2e2a24] rounded-full px-4 py-2 text-[#7a7268] text-xs font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8a045] inline-block" />
              {item}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/auth/register")}
            className="px-6 py-2.5 text-sm font-bold bg-[#e8a045] hover:bg-[#f0aa55] active:scale-95 text-[#0f0e0c] rounded-lg transition-all duration-200 cursor-pointer"
          >
            Register
          </button>
          <button
            onClick={() => navigate("/auth/login")}
            className="px-6 py-2.5 text-sm font-semibold border border-[#2e2a24] hover:border-[#e8a045]/40 hover:text-[#f0ebe3] text-[#7a7268] rounded-lg transition-all duration-200 cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
