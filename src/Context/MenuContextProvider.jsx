import { useContext, useState } from "react";
import { AuthContext, MenuContext } from "./Contexts";

export default function MenuContextProvider({ children }){
  const [menu, setMenu] = useState([]);
   const [customDishes, setCustomDishes] = useState(
    localStorage.getItem("customDishes")
      ? JSON.parse(localStorage.getItem("customDishes"))
      : [],
  );

  const { auth } = useContext(AuthContext);

  const user = auth.find((user) => user.active);
  const userRole = user.role;
  const userEmail = user.email;

    return <MenuContext.Provider value={{ menu, setMenu, userRole, userEmail, customDishes, setCustomDishes }}>
        {children}
    </MenuContext.Provider>
}