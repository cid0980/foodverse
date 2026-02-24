import { createContext, useContext, useMemo, useState } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

const roles = [
  { value: 'customer', label: 'User' },
  { value: 'vendor', label: 'Vendor' },
  { value: 'delivery_partner', label: 'Delivery Partner' }
];

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  const save = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    if (newToken) {
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  const login = async (payload) => {
    const data = await authService.login(payload);
    save(data.token, data.user);
    return data;
  };

  const register = async (payload) => {
    const data = await authService.register(payload);
    save(data.token, data.user);
    return data;
  };

  const logout = () => save('', null);

  const value = useMemo(() => ({ token, user, login, register, logout }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}

export { roles };
