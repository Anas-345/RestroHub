import { AuthContext } from "@/Context/Contexts";
import { useContext } from "react";

export default function EmptyMenu() {
  const { user } = useContext(AuthContext);

  const { role } = user;

  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 gap-3">
      <>
        <span className="text-5xl opacity-30">🍽️</span>
        <p className="text-[#f0ebe3] font-semibold text-base">
          No dishes found
        </p>
        <p className="text-[#7a7268] text-sm">
          Try a different category{" "}
          {role === "owner" && <span>or add a new dish</span>}
        </p>
      </>
    </div>
  );
}
