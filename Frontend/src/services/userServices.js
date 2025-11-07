import axios from 'axios';
import { urlBackend } from '../constants/constants';

/**
 * Servicio para registrar un nuevo usuario
 * @param {string} name - Nombre del usuario
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<{usuario: Object, token: string}>}
 */
export const registerApi = async (name, email, password) => {
    try {
        const response = await axios.post(
            `${urlBackend}/signup`,
            { name, email, password },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = response.data;
        console.log('data registerApi', data);
        return data;
    } catch (error) {
        console.log('error en registerApi', error);

        // Si el error viene del servidor (Axios lo envuelve en error.response)
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "Error en la respuesta del servidor");
        }
        // Si es un error de red u otro tipo
        throw new Error(error.message ? error.message : "Hubo un error en la red");
    }
};

/**
 * Servicio para login de usuario
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<{token: string}>}
 */
export const loginApi = async (email, password) => {
    try {
        const response = await axios.post(
            `${urlBackend}/login`,
            { email, password },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = response.data;
        console.log('data loginApi', data);
        return data;
    } catch (error) {
        console.log('error en loginApi', error);

        // Si el error viene del servidor (Axios lo envuelve en error.response)
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || "Error en la respuesta del servidor");
        }
        // Si es un error de red u otro tipo
        throw new Error(error.message ? error.message : "Hubo un error en la red");
    }
};
