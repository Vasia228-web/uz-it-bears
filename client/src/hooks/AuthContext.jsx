import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const data = await authService.refresh();

        
        if (data?.accessToken && data?.user) {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("userData", JSON.stringify(data.user));
          setUser(data.user);
        }
      } catch (err) {
        
        setUser(null);
      } finally {
        
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const authenticate = async (email, password, name = null, isRegistration = false) => {
    try {
      let data;

      if (isRegistration) {
        data = await authService.register({ email, name, password });
      } else {
        data = await authService.login({ email, password });
      }

      if (data?.accessToken && data?.user) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userData", JSON.stringify(data.user));
        setUser(data.user);
        return { success: true, user: data.user };
      }

      return { success: false, error: "Помилка авторизації" };

    } catch (err) {
      const message = err?.response?.data?.message || "Помилка сервера";
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.log("Logout error:", err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
      setUser(null);
    }
  };

  const updateUserLocal = (newUser) => {
    setUser(newUser);
    localStorage.setItem("userData", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        authenticate,
        logout,
        updateUserLocal,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
