import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const AuthContex = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useLocalStorage('userId', null);

  const saveUserId = (id) => {
    setUserId(id);
    return id;
  };

  const removeUserId = () => {
    setUserId(null);
  };

  return (
    <AuthContex.Provider value={{ userId, saveUserId, removeUserId }}>
      {children}
    </AuthContex.Provider>
  );
};

export const useAuth = () => useContext(AuthContex);
