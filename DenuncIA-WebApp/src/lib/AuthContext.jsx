import React, { createContext, useContext, useEffect, useState } from "react";
import { initLocalData, localAuth } from "@/lib/localApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initLocalData();
    setUser(localAuth.me());
    setLoading(false);
  }, []);

  const login = (email) => setUser(localAuth.login(email));
  const logout = () => {
    localAuth.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoadingAuth: loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
