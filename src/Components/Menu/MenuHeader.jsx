import { AuthContext, MenuContext } from "@/Context/Contexts";
import { useContext } from "react";
import HamburgerMenu from "../shared/HamburgerMenu";
import FormModal from "./FormModal";
import Buttons from "../shared/Buttons";

export default function MenuHeader({
  showEditForm,
  setShowEditForm,
  editId,
  showAddForm,
  setShowAddForm,
  handleClick,
}) {
  const { menu } = useContext(MenuContext);
  const { user } = useContext(AuthContext);

  const { role } = user;

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
            {role === "owner"
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
        {role === "owner" && (
          <Buttons
            content={"+ Add Dish"}
            handleClick={handleClick}
            selectVariant={"Default"}
          />
        )}
      </div>
    </div>
  );
}
