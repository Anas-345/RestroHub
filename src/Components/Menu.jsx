import { useContext, useState, useEffect } from "react";
import Button from "./Menu/Button";
import Dish from "./Menu/Dish";
import { MenuContext, SideBarContext } from "../Context/Contexts";
import axios from "axios";

export default function Menu() {
  const { setSidebarOpen } = useContext(SideBarContext);
  const { menu, setMenu } = useContext(MenuContext);
  const [type, setType] = useState("best-foods");
  const API = "https://free-food-menus-api-two.vercel.app/";

  const types = [
    "Best-Foods",
    "BBQs",
    "Breads",
    "Burgers",
    "Chocolates",
    "Desserts",
    "Drinks",
    "Fried-Chicken",
    "Ice-Cream",
    "Pizzas",
    "Sandwitches",
    "Steaks",
    "Sausages",
    "Porks",
  ];

  async function API_Call(endpoint) {
    try {
      let data = await axios.get(API + endpoint);
      setMenu(
        data.data.map((item) => {
          return { ...item, status: "Available", totalOrders: 0 };
        }),
      );
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    API_Call(type.toLowerCase());
  }, [type]);

  return (
    <div className="flex-1 min-h-screen p-4 sm:p-6 md:p-8 bg-[#0f0e0c]">
      <div className="flex items-start justify-between mb-8 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex flex-col gap-1.5 p-2 rounded-lg text-[#7a7268] hover:bg-[#1a1814] hover:text-[#f0ebe3] transition-all cursor-pointer shrink-0 md:hidden"
          >
            <span className="block w-5 h-0.5 bg-current rounded" />
            <span className="block w-5 h-0.5 bg-current rounded" />
            <span className="block w-5 h-0.5 bg-current rounded" />
          </button>
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

        <div className="shrink-0 flex items-center gap-2 bg-[#1a1814] border border-[#2e2a24] rounded-lg px-4 py-2">
          <span className="w-2 h-2 rounded-full bg-[#e8a045] inline-block" />
          <span className="text-[#7a7268] text-xs font-medium uppercase tracking-widest">
            {menu.length} Dishes
          </span>
        </div>
      </div>

      <div className="bg-[#1a1814] border border-[#2e2a24] rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
        <div className="bg-[#221f1a] flex flex-wrap gap-2 py-3 px-4 border-b border-[#2e2a24]">
          {types.map((t) => (
            <Button key={t} type={t} setType={setType} selectedType={type} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6">
          {menu.map((dish, i) => (
            <Dish
              key={dish.id}
              name={dish.name}
              price={dish.price}
              totalOrders={dish.totalOrders}
              status={dish.status}
              image={dish.img}
              description={dish.dsc}
              rate={dish.rate}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
