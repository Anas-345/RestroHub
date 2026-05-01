import { AuthContext, MenuContext } from "@/Context/Contexts";
import { useContext } from "react";
import HamburgerMenu from "../shared/HamburgerMenu";
import FormModal from "./FormModal";

export default function MenuHeader({
  showEditForm,
  setShowEditForm,
  editId,
  showAddForm,
  setShowAddForm,
  handleClick,
}) {
  const { menu } = useContext(MenuContext);
  const {userRole} = useContext(AuthContext)
  return (
    <div className="flex items-center justify-between mb-8 gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <HamburgerMenu />
        {showEditForm ? (
          <FormModal
            showForm={showEditForm}
            setShowForm={setShowEditForm}
            id={editId}
            content={"Update"}
          />
        ) : (
          <FormModal
            showForm={showAddForm}
            setShowForm={setShowAddForm}
            content={"Add"}
          />
        )}
        <div className="min-w-0">
          <h1
            className="text-[#f0ebe3] text-2xl sm:text-[28px] font-bold tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Menu
          </h1>
          <p className="text-[#7a7268] text-sm mt-0.5 hidden sm:block">
            {userRole === "owner"
              ? "Manage your dishes, prices and availability"
              : "Browse and order from our menu"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <div className="hidden sm:flex shrink-0 items-center gap-2 bg-[#1a1814] border border-[#2e2a24] rounded-lg px-3 py-2">
          <span className="w-2 h-2 rounded-full bg-[#e8a045] inline-block" />
          <span className="text-[#7a7268] text-xs font-medium uppercase tracking-widest">
            {menu.length} Dishes
          </span>
        </div>
        {userRole === "owner" && (
          <button
            className="bg-[#e8a045] hover:bg-[#f0aa55] active:scale-95 text-[#0f0e0c] text-sm font-bold px-3 sm:px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 whitespace-nowrap"
            onClick={handleClick}
          >
            + Add Dish
          </button>
        )}
      </div>
    </div>
  );
}
