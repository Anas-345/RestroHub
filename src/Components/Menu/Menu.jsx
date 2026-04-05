import { useContext, useState, useEffect, useRef } from "react";
import Button from "./Button";
import Dish from "./Dish";
import { MenuContext, SideBarContext } from "../../Context/Contexts";
import axios from "axios";
import { types } from "../../data/data";
import FormModal from "./FormModal";

export default function Menu() {
  const [type, setType] = useState("Best-Foods");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [customDishes, setCustomDishes] = useState(localStorage.getItem('customDishes')? JSON.parse(localStorage.getItem('customDishes')): []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const { setSidebarOpen } = useContext(SideBarContext);
  const { menu, setMenu } = useContext(MenuContext);

  const scrollRef = useRef(null);

  const API = "https://free-food-menus-api-two.vercel.app/";

  async function API_Call(endpoint) {
    try {
      let data = await axios.get(API + endpoint);
      setMenu(
        data.data.map((item) => {
          return { ...item, status: "Available", totalOrders: 0 };
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }

  function handleClick() {
    setShowAddForm(true);
  }

  function checkScroll() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }

  function scrollLeft() {
    scrollRef.current?.scrollBy({ left: -150, behavior: "smooth" });
  }

  function scrollRight() {
    scrollRef.current?.scrollBy({ left: 150, behavior: "smooth" });
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  useEffect(() => {
    type === "Custom-Dishes"
      ? setMenu(customDishes)
      : API_Call(type.toLowerCase());
    localStorage.setItem('customDishes', JSON.stringify(customDishes))
  }, [type, customDishes]);

  return (
    <div className="flex-1 min-h-screen p-4 sm:p-6 md:p-8 bg-[#0f0e0c]">
      <div className="flex items-center justify-between mb-8 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex flex-col gap-1.5 p-2 rounded-lg text-[#7a7268] hover:bg-[#1a1814] hover:text-[#f0ebe3] transition-all cursor-pointer shrink-0 md:hidden"
          >
            <span className="block w-5 h-0.5 bg-current rounded" />
            <span className="block w-5 h-0.5 bg-current rounded" />
            <span className="block w-5 h-0.5 bg-current rounded" />
          </button>
          {showEditForm ? (
            <FormModal
              setCustomDishes={setCustomDishes}
              showForm={showEditForm}
              setShowForm={setShowEditForm}
              id={editId}
              content={'Update'}
            />
          ) : (
            <FormModal
              setCustomDishes={setCustomDishes}
              showForm={showAddForm}
              setShowForm={setShowAddForm}
              content={'Add'}
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
              Manage your dishes, prices and availability
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
          <button
            className="bg-[#e8a045] hover:bg-[#f0aa55] active:scale-95 text-[#0f0e0c] text-sm font-bold px-3 sm:px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 whitespace-nowrap"
            onClick={handleClick}
          >
            + Add Dish
          </button>
        </div>
      </div>

      <div className="bg-[#1a1814] border border-[#2e2a24] rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
        <div className="bg-[#221f1a] border-b border-[#2e2a24] flex items-center gap-2 px-4 py-3">
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-[#2e2a24] hover:bg-[#e8a045]/20 text-[#7a7268] hover:text-[#e8a045] transition-all duration-200 cursor-pointer"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {types.map((t) => (
              <Button key={t} type={t} setType={setType} selectedType={type} />
            ))}
          </div>

          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-[#2e2a24] hover:bg-[#e8a045]/20 text-[#7a7268] hover:text-[#e8a045] transition-all duration-200 cursor-pointer"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6">
          {menu.map((dish, i) => (
            <Dish
              key={dish.id}
              id={dish.id}
              name={dish.name}
              price={dish.price}
              totalOrders={dish.totalOrders}
              status={dish.status}
              image={dish.img}
              description={dish.dsc}
              rate={dish.rate}
              index={i}
              customDishes={customDishes}
              setCustomDishes={setCustomDishes}
              setShowEditForm={setShowEditForm}
              setEditId={setEditId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
