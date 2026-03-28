import { useState } from "react";
import { SideBarContext } from "./Contexts";

export default function SideBarContextProvider({ children }){
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return <SideBarContext.Provider value={{sidebarOpen, setSidebarOpen}}>
        {children}
    </SideBarContext.Provider>
}