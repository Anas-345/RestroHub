import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SideBarContextProvider from "./Context/SideBarContextProvider.jsx";
import { BrowserRouter } from "react-router";
import AuthContextProvider from "./Context/AuthContextProvider";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <SideBarContextProvider>
        <App />
      </SideBarContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
);
