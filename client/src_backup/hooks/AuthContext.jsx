// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // при старті пробуємо автоматично оновити токен через refresh
  useEffect(() => {
    const init = async () => {
      try {
        const data = await authService.refresh(); // викликає /refresh, отримує user + accessToken
        if (data && data.accessToken && data.user) {
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('userData', JSON.stringify(data.user));
          setUser(data.user);
        }
      } catch (err) {
        // не авторизований
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  const authenticate = async (email, password, name = null, isRegistration = false) => {
    try {
      if (isRegistration) {
        const data = await authService.register({ email, name, password });
        if (data.accessToken && data.user) {
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('userData', JSON.stringify(data.user));
          setUser(data.user);
          return { success: true, user: data.user };
        }
        return { success: false, error: 'Невірна відповідь від сервера' };
      } else {
        const data = await authService.login({ email, password });
        if (data.accessToken && data.user) {
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('userData', JSON.stringify(data.user));
          setUser(data.user);
          return { success: true, user: data.user };
        }
        return { success: false, error: data.message || 'Помилка при вході' };
      }
    } catch (err) {
      const message = err?.response?.data?.message || 'Помилка сервера';
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      // навіть якщо сервер вернув помилку — видаляємо локальні дані
      authService.handleLogoutLocal();
    } finally {
      setUser(null);
    }
  };

  const updateUserLocal = (newUser) => {
    setUser(newUser);
    localStorage.setItem('userData', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      authenticate,
      logout,
      updateUserLocal,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
