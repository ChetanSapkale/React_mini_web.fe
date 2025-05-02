import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const initalState = {
  isAuth: false,
  token: null,
};

function AuthContextProvider({ children }) {
  const [authState, setAuthState] = useState(initalState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthState({
        isAuth: true,
        token: token,
      });
    }
  }, []);
  const LoginFunction = (token) => {
    console.log("Token received :", token);
    localStorage.setItem("token", token);
    setAuthState({
      isAuth: true,
      token: token,
    });
  };
  const Logoutfunction = () => {
    localStorage.removeItem("token");
    setAuthState({
      isAuth: false,
      token: null,
    });
  };
  return (
    <AuthContext.Provider value={{ authState, LoginFunction, Logoutfunction }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
