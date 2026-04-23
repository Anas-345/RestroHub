import { AuthContext, SideBarContext } from "@/Context/Contexts";
import { useContext } from "react";
import { useNavigate } from "react-router";
import Buttons from "./shared/Buttons";
import { toast } from "react-toastify";

export default function Home() {
  const navigate = useNavigate();

  const { setSidebarOpen } = useContext(SideBarContext);
  const { isLogin, setIsLogin, setAuth, auth } = useContext(AuthContext);

  const role = auth.find((user) => user.active)?.role;

  const content = !isLogin
    ? {
        title: (
          <>
            Great food & smarter restaurants,{" "}
            <span className="text-[#e8a045]">one platform.</span>
          </>
        ),
        subtitle:
          "Whether you're hungry or running a kitchen — we've got you covered.",
        badges: [
          "Order from top restaurants",
          "Manage your menu & orders",
          "Real-time everything",
        ],
      }
    : role === "customer"
      ? {
          title: (
            <>
              Your food, your way.{" "}
              <span className="text-[#e8a045]">Every time.</span>
            </>
          ),
          subtitle:
            "Browse menus, place orders, and track your meals in real-time — all in one place.",
          badges: ["Easy ordering", "Live order tracking", "Order history"],
        }
      : {
          title: (
            <>
              Your restaurant,{" "}
              <span className="text-[#e8a045]">fully in control.</span>
            </>
          ),
          subtitle:
            "Manage orders, monitor revenue, and keep your kitchen running — all from one dashboard.",
          badges: [
            "Real-time order tracking",
            "Menu & inventory control",
            "Daily revenue insights",
          ],
        };

  function handleRoute(path) {
    navigate(path);
  }

  function handleLogout(path) {
    setIsLogin(false);
    setAuth((prev) =>
      prev.map((user) => (user.active ? { ...user, active: false } : user)),
    );
    toast.success("You Logged out successfully");
    handleRoute(path);
  }
  return (
    <>
      <div className="mt-6 ml-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex flex-col gap-1.5 p-2 rounded-lg text-[#7a7268] hover:bg-[#1a1814] hover:text-[#f0ebe3] transition-all cursor-pointer shrink-0 md:hidden"
        >
          <span className="block w-5 h-0.5 bg-current rounded" />
          <span className="block w-5 h-0.5 bg-current rounded" />
          <span className="block w-5 h-0.5 bg-current rounded" />
        </button>
      </div>
      <div className="min-h-screen bg-[#0f0e0c] flex flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center text-center max-w-xl">
          <h1
            className="text-[#f0ebe3] text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {content.title}
          </h1>

          <p className="text-[#7a7268] text-base sm:text-lg leading-relaxed mb-8">
            {content.subtitle}
          </p>

          <ul className="flex flex-col sm:flex-row items-center gap-3 mb-10">
            {content.badges.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 bg-[#161412] border border-[#2e2a24] rounded-full px-4 py-2 text-[#7a7268] text-xs font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8a045] inline-block" />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {isLogin ? (
              <Buttons
                content={"Logout"}
                handleClick={() => handleLogout("/")}
                selectVariant={"Default"}
              />
            ) : (
              <>
                <Buttons
                  content={"Register"}
                  handleClick={() => handleRoute("/auth/register")}
                  selectVariant={"Default"}
                />
                <Buttons
                  content={"Login"}
                  handleClick={() => handleRoute("/auth/login")}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
