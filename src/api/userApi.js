import { apiFetch } from "./client";

export const userApi = {

    register: (data) =>apiFetch('/users', {
        method: 'POST',
        body: JSON.stringify(data),
    }),

    login: ({login,password}) => apiFetch('/sessions', {

        method: 'POST',
        headers: {
            'login':login,
            'password': password,
        },
    }),

    getMe:()=> apiFetch('/users/me'),
}