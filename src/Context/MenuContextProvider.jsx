import { useState } from "react";
import { MenuContext } from "./Contexts";

export default function MenuContextProvider({ children }){
  const [menu, setMenu] = useState([]);
   const [customDishes, setCustomDishes] = useState(
    localStorage.getItem("customDishes")
      ? JSON.parse(localStorage.getItem("customDishes"))
      : [],
  );

    return <MenuContext.Provider value={{ menu, setMenu, customDishes, setCustomDishes }}>
        {children}
    </MenuContext.Provider>
}