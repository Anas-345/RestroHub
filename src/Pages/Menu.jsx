import { useContext, useState, useEffect, useRef } from "react";
import { MenuContext } from "@/Context/Contexts";
import Dish from "@/Components/Menu/Dish";
import Button from "@/Components/Menu/Button";
import MenuHeader from "@/Components/Menu/MenuHeader";
import EmaptyMenu from "@/Components/Menu/EmptyMenu";
import Loading from "@/Components/shared/Loading";
import { types } from "@/data/data";
import ScrollLeft from "@/Components/Menu/ScrollLeft";
import ScrollRight from "@/Components/Menu/ScrollRight";
import {
  API_Call,
  checkScroll,
  scrollLeft,
  scrollRight,
} from "@/Functions/MenuFunctions";

export default function Menu() {
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("Best-Foods");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const { menu, setMenu, customDishes } = useContext(MenuContext);

  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll(scrollRef, setCanScrollLeft, setCanScrollRight);
    el.addEventListener("scroll", () =>
      checkScroll(scrollRef, setCanScrollLeft, setCanScrollRight),
    );
    window.addEventListener("resize", () =>
      checkScroll(scrollRef, setCanScrollLeft, setCanScrollRight),
    );
    return () => {
      el.removeEventListener("scroll", () =>
        checkScroll(scrollRef, setCanScrollLeft, setCanScrollRight),
      );
      window.removeEventListener("resize", () =>
        checkScroll(scrollRef, setCanScrollLeft, setCanScrollRight),
      );
    };
  }, []);

  useEffect(() => {
    type === "Custom-Dishes"
      ? setMenu(customDishes)
      : API_Call(type.toLowerCase(), setLoading, setMenu);
    localStorage.setItem("customDishes", JSON.stringify(customDishes));
  }, [type, customDishes]);

  return (
    <div className="flex-1 min-h-screen p-4 sm:p-6 md:p-8 bg-[#0f0e0c]">
      <MenuHeader
        showEditForm={showEditForm}
        setShowEditForm={setShowEditForm}
        editId={editId}
        showAddForm={showAddForm}
        setShowAddForm={setShowAddForm}
        handleClick={() => setShowAddForm(true)}
      />
      <div className="bg-[#1a1814] border border-[#2e2a24] rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
        <div className="bg-[#221f1a] border-b border-[#2e2a24] flex items-center gap-2 px-4 py-3">
          {canScrollLeft && (
            <ScrollLeft scrollLeft={() => scrollLeft(scrollRef)} />
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
            <ScrollRight scrollRight={() => scrollRight(scrollRef)} />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6">
          {menu.length === 0 && !loading && <EmaptyMenu />}
          {loading ? (
            <Loading />
          ) : (
            menu.map((dish, i) => (
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
                setShowEditForm={setShowEditForm}
                setEditId={setEditId}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
