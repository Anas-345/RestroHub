import InputField from "@/Components/shared/InputField";
import { AuthContext } from "@/Context/Contexts";
import { useContext, useRef } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function Register() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const nameRef = useRef();
  const roleRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cnfrmRef = useRef();

  function resetInputs() {
    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    cnfrmRef.current.value = "";
    roleRef.current.value = "owner";
  }

  function handleRouter(path) {
    navigate(path);
    resetInputs();
  }

  function handleRegister(path) {
    const name = nameRef.current.value.trim();
    const role = roleRef.current.value;
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    const cnfrmPassword = cnfrmRef.current.value;

    const emailMatch = auth.find((user) => user.email === email);

    if (!name || !email || !password || !cnfrmPassword) {
      toast.error("Please fill input fields");
      return;
    } else if (password !== cnfrmPassword) {
      toast.error("Your passwords are not matching");
      return;
    } else if (emailMatch) {
      toast.error("User Already exists");
      return;
    }
    setAuth((prev) => [
      ...prev,
      {
        userName: name,
        role,
        email,
        password,
        active: false,
      },
    ]);
    toast.success("User Registered Successfully");
    handleRouter(path);
  }

  function handleEnter(focusRef) {
    focusRef.current.focus();
  }

  return (
    <>
      <div className="mb-2">
        <p className="text-[#7a7268] text-[10px] uppercase tracking-[2px] font-medium mb-1">
          Get Started
        </p>
        <h2
          className="text-[#f0ebe3] text-2xl font-bold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Create Account
        </h2>
      </div>

      <InputField
        currentRef={nameRef}
        param={emailRef}
        content={"Name"}
        placeholder={"Enter full name"}
        type={"text"}
        handleEnter={handleEnter}
      />

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="role"
          className="text-[#7a7268] text-[11px] uppercase tracking-[1.5px] font-medium"
        >
          Role
        </label>
        <select
          ref={roleRef}
          id="role"
          className="w-full bg-[#1a1814] border border-[#2e2a24] rounded-lg px-4 py-2.5 text-sm text-[#f0ebe3] outline-none focus:border-[#e8a045]/50 focus:bg-[#1e1c18] transition-all duration-200 cursor-pointer"
        >
          <option value="owner">Owner</option>
          <option value="customer">Customer</option>
        </select>
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
        param={cnfrmRef}
        content={"Password"}
        placeholder={"Password"}
        type={"password"}
        handleEnter={handleEnter}
      />

      <InputField
        currentRef={cnfrmRef}
        content={"Confirm Password"}
        placeholder={"Confirm Password"}
        type={"password"}
        param={"/auth/login"}
        handleEnter={handleRegister}
      />

      <button
        className="w-full py-2.5 text-sm font-bold bg-[#e8a045] hover:bg-[#f0aa55] active:scale-95 text-[#0f0e0c] rounded-lg transition-all duration-200 cursor-pointer mt-1"
        onClick={() => handleRegister("/auth/login")}
      >
        Create Account
      </button>

      <p className="text-center text-[#7a7268] text-xs">
        Already have an account?{" "}
        <span
          onClick={() => handleRouter("/auth/login")}
          className="text-[#e8a045] hover:text-[#f0aa55] cursor-pointer font-semibold transition-colors"
        >
          Login
        </span>
      </p>
    </>
  );
}
