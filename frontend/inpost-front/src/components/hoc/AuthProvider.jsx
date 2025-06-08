import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const AuthContex = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useLocalStorage('userId', null);
  const [login, setLogin] = useLocalStorage('login', null);

  const saveToStorage = (key, value) => {
    if (key === 'userId') {
      setUserId(value);
    } else if (key === 'login') {
      setLogin(value);
    }
    return value;
  };

  const removeFromStorage = (key) => {
    if (key === 'userId') {
      setUserId(null);
    } else if (key === 'login') {
      setLogin(null);
    }
  };

  return (
    <AuthContex.Provider
      value={{ userId, login, saveToStorage, removeFromStorage }}
    >
      {children}
    </AuthContex.Provider>
  );
};

export const useAuth = () => useContext(AuthContex);
