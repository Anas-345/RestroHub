import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SideBarContextProvider from "./Context/SideBarContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <SideBarContextProvider>
    <App />
  </SideBarContextProvider>,
);
