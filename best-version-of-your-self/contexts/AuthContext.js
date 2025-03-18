'use client';
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearAuth, isAuthenticated as checkAuth, storeAuth } from "../api/axios";

const USER_ID_KEY = 'userId';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const router = useRouter();
  
  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const userId = localStorage.getItem(USER_ID_KEY);
    const isLoggedIn = checkAuth();
    
    if (userId && isLoggedIn) {
      setAuth({
        userId,
        isAuthenticated: true
      });
    }
  }, []);

  // Update auth data and localStorage
  const updateAuth = (newAuthData) => {
    // Store in localStorage
    storeAuth(newAuthData);
    
    // Update state (without storing sensitive data)
    setAuth({
      userId: newAuthData.userId,
      user: newAuthData.user,
      isAuthenticated: true
    });
  };
  
  // Check if authenticated
  const isAuthenticated = () => {
    return checkAuth();
  };
  
  // Logout
  const logout = () => {
    clearAuth();
    setAuth({});
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ 
      auth, 
      setAuth: updateAuth, 
      isAuthenticated,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;