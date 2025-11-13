import axios from 'axios';
import { urlBackend } from '../constants/constants';

const api = axios.create({
    baseURL: urlBackend
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Función para registrar un usuario
export const registerApi = (name, email, password) => {
    return api.post('/signup', { name, email, password })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response?.data || error;
        });
};

// Función para login de usuario
export const loginApi = (email, password) => {
    return api.post('/login', { email, password })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response?.data || error;
        });
};

// Función para upgrade a PREMIUM
export const upgradeToPremiumApi = () => {
    return api.patch('/users/upgrade-premium')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response?.data || error;
        });
};
