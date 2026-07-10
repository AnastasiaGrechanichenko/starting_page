import { apiFetch } from "./client";

export const orderApi = {
    getOrders: () => apiFetch('/orders'),

    createOrder: (data = {}) => apiFetch('/orders', {
        method: 'POST',
        body: JSON.stringify(data),
    }),

    getOrderById: (orderId) => apiFetch(`/orders/${orderId}`),
    
    cancelOrder: (orderId) => apiFetch(`/orders/${orderId}/cancel`,{
        method: 'PATCH'
    }),
};