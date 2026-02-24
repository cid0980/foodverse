import { api } from './api';

export const placeOrder = (token, payload) => api('/orders', { method: 'POST', token, body: payload });
export const listMyOrders = (token) => api('/orders/my', { token });
export const listVendorOrders = (token) => api('/orders/vendor', { token });
export const listAvailableOrders = (token) => api('/orders/available', { token });
export const acceptOrder = (token, id) => api(`/orders/${id}/accept`, { method: 'POST', token });
export const updateOrderStatus = (token, id, status) =>
  api(`/orders/${id}/status`, { method: 'PATCH', token, body: { status } });
