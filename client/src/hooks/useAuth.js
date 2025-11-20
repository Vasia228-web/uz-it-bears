import { useState, useEffect } from 'react';
import { loginAPI } from '../data/loginData';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);


  const authenticate = async (email, password, username = null, isRegistration = false) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isRegistration) {
       
        if (loginAPI.checkUserExists(email)) {
          return { success: false, error: 'Користувач з таким email вже існує' };
        }

        const newUser = loginAPI.addUser({
          email: email,
          password: password,
          username: username
        });

       
        const { password: _, ...userWithoutPassword } = newUser;
        
        localStorage.setItem('authToken', 'fake-jwt-token');
        localStorage.setItem('userData', JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);

        return { success: true, user: userWithoutPassword, isNewUser: true };
      } else {
      
        const foundUser = loginAPI.findUser(email, password);

        if (!foundUser) {
          return { success: false, error: 'Невірний email або пароль' };
        }

        const { password: _, ...userWithoutPassword } = foundUser;
        localStorage.setItem('authToken', 'fake-jwt-token');
        localStorage.setItem('userData', JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);

        return { success: true, user: userWithoutPassword, isNewUser: false };
      }
    } catch (error) {
      return { success: false, error: 'Помилка сервера' };
    }
  };


  const updateUser = async (updates) => {
    if (!user) return { success: false, error: 'Користувач не авторизований' };

    try {
      const updatedUser = loginAPI.updateUser(user.id, updates);
      if (updatedUser) {
        const { password: _, ...userWithoutPassword } = updatedUser;
        localStorage.setItem('userData', JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);
        return { success: true, user: userWithoutPassword };
      }
      return { success: false, error: 'Помилка оновлення' };
    } catch (error) {
      return { success: false, error: 'Помилка сервера' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
  };


  const checkUserExists = (email) => {
    return loginAPI.checkUserExists(email);
  };

  return {
    user,
    isLoading,
    authenticate,
    updateUser,
    logout,
    checkUserExists,
    isAuthenticated: !!user
  };
}