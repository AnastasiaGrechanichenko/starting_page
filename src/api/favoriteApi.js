import { apiFetch } from "./client";

export const favoriteApi = {
    getFavorites: () => apiFetch('/favorites'),

    addToFavorite: (bookId) => apiFetch(`/favorites/${bookId}`,{
        method: 'POST',
    }),
    removeFavorite:(bookId) => apiFetch(`/favorites/${bookId}`, {
        method: 'DELETE',
    }),

    clearFavorites:() => apiFetch('/favorites', {
        method: 'DELETE', 
    }),
    };