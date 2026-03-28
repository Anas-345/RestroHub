import { useState } from "react";
import { MenuContext } from "./Contexts";

export default function MenuContextProvider({ children }){
  const [menu, setMenu] = useState([]);

    return <MenuContext.Provider value={{ menu, setMenu }}>
        {children}
    </MenuContext.Provider>
}