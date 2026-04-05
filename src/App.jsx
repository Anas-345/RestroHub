import SideBar from "./Components/SideBar";
import PageRouter from "./Components/Router/PageRouter";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
    <ToastContainer />
      <div className="flex bg-[#0f0e0c] text-white min-h-screen">
        <SideBar />
        <div className="flex-1 min-w-0">
          <PageRouter />
        </div>
      </div>
    </>
  );
}
export default App;
