import { apiFetch } from "./client";

export const bookApi = {
    getAll: () => apiFetch('/books'),

    getById:(bookId) =>
        apiFetch(`/books/${bookId}`),

};