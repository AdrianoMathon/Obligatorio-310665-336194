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

export const getRoutinesApi = () => {
    return api.get('/routines')
        .then(response => response.data.rutinas)
        .catch(error => {
            throw error.response?.data || error;
        });
}

export const createRoutineApi = (routine) => {
    return api.post('/routines', routine)
        .then(response => {
            return response.data.rutina;
        })
        .catch(error => {
            throw error.response?.data || error;
        });
};

export const updateRoutineApi = (id, routine) => {
    return api.put(`/routines/${id}`, routine)
        .then(response => {
            return response.data.rutina;
        })
        .catch(error => {
            throw error.response?.data || error;
        });
};

export const deleteRoutineApi = (id) => {
    return api.delete(`/routines/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response?.data || error;
        });
};

export const getCategoriesApi = () => {
    return api.get('/routines/categories')
        .then(response => response.data.categorias)
        .catch(error => {
            throw error.response?.data || error;
        });
};

export const getRoutineCountApi = () => {
    return api.get('/routines/count')
        .then(response => response.data)
        .catch(error => {
            throw error.response?.data || error;
        });
};
