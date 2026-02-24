import { api } from './api';

export const login = (payload) => api('/auth/login', { method: 'POST', body: payload });
export const register = (payload) => api('/auth/register', { method: 'POST', body: payload });
export const me = (token) => api('/auth/me', { token });
