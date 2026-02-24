import { api } from './api';

export const listRestaurants = () => api('/restaurants');
export const getRestaurant = (id) => api(`/restaurants/${id}`);
export const createRestaurant = (token, payload) =>
  api('/restaurants', { method: 'POST', token, body: payload });
export const addMenuItem = (token, restaurantId, payload) =>
  api(`/restaurants/${restaurantId}/menu`, { method: 'POST', token, body: payload });
