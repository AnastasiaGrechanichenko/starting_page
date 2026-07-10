import { apiFetch } from "./client";

export const cartApi = {
    getCart: () =>('/cart'),

    addItem: (data) => apiFetch ('/cart', {
        method: 'POST',
        body: JSON.stringify(data),
    }),

    updateItem:(itemId, data) =>
        apiFetch(`/cart/${itemId}`, {
            method:'PATCH',
            body: JSON.stringify(data)
        }),
    
    removeItem: (itemId) =>apiFetch(`/cart/${itemId}`,{
        method: 'DELETE',
    }),

    clearCart:()=>apiFetch('/cart', {
        method:'DELETE'
    }),
};