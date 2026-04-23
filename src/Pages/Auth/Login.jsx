import InputField from "@/Components/shared/InputField";
import { AuthContext } from "@/Context/Contexts";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { auth, setAuth, setIsLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleEnter(focusRef) {
    focusRef.current.focus();
  }

  function handleLogin(path) {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const findUser = auth.find((user) => user.email === email);

    if (!email || !password) {
      toast.error("Please fill the form");
      return;
    }
    if (!findUser) {
      toast.error("User doesn't exist");
      return;
    } else if (!(findUser.password === password)) {
      toast.error("Incorrect Password");
      return;
    }
    toast.success("You Logged In successfully");
    setAuth((prev) =>
      prev.map((user) =>
        user.email === findUser.email ? { ...user, active: true } : user,
      ),
    );
    setIsLogin(true)
    navigate(path);
  }
  
  return (
    <>
      <div className="mb-2">
        <p className="text-[#7a7268] text-[10px] uppercase tracking-[2px] font-medium mb-1">
          Welcome Back
        </p>
        <h2
          className="text-[#f0ebe3] text-2xl font-bold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Sign in
        </h2>
      </div>
      <InputField
        currentRef={emailRef}
        param={passwordRef}
        content={"Email"}
        placeholder={"example@gmail.com"}
        type={"email"}
        handleEnter={handleEnter}
      />

      <InputField
        currentRef={passwordRef}
        param={"/"}
        content={"Password"}
        placeholder={"Password"}
        type={"password"}
        handleEnter={handleLogin}
      />

      <button
        className="w-full py-2.5 text-sm font-bold bg-[#e8a045] hover:bg-[#f0aa55] active:scale-95 text-[#0f0e0c] rounded-lg transition-all duration-200 cursor-pointer mt-1"
        onClick={() => handleLogin("/")}
      >
        Log In
      </button>
      <p className="text-center text-[#7a7268] text-xs">
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/auth/register")}
          className="text-[#e8a045] hover:text-[#f0aa55] cursor-pointer font-semibold transition-colors"
        >
          Create one
        </span>
      </p>
    </>
  );
}
