import { useEffect, useState } from "react";
import { AuthContext } from "./Contexts";

export default function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState(
    localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [],
  );
  const [isLogin, setIsLogin] = useState([])

  useEffect(() => localStorage.setItem("users", JSON.stringify(auth)), [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
