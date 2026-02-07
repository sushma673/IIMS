import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) setToken(savedToken);
  }, []);

  // USER
  const loginUser = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // ADMIN
  const loginAdmin = (newToken) => {
    localStorage.setItem("adminToken", newToken);
    setToken(newToken);
  };

  const logoutAdmin = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  // ⭐ admin status
  const isAdminLoggedIn = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAdminLoggedIn,
        loginUser,
        logoutUser,
        loginAdmin,
        logoutAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
