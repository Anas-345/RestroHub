import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SideBarContextProvider from "./Context/SideBarContextProvider.jsx";
import { BrowserRouter } from "react-router";
import AuthContextProvider from "./Context/AuthContextProvider";
import OrderContextProvider from "./Context/OrderContextProvider";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <OrderContextProvider>
        <SideBarContextProvider>
          <App />
        </SideBarContextProvider>
      </OrderContextProvider>
    </AuthContextProvider>
  </BrowserRouter>,
);
