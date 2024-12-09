"use client";

import { useContext, useDebugValue } from "react";
import AuthContext from "../contexts/AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { auth } = context;
  useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));

  return context;
};

export default useAuth;