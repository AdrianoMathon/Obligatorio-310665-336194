import { urlBackend } from '../constants/constants';

const URL_IMAGES = `${urlBackend}/images`;

// Obtener token JWT del localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Subir imagen (Base64)
export async function uploadImage(base64) {
    const token = getAuthToken();
    
    const res = await fetch(URL_IMAGES, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ file: base64 }),
    });
    
    if (!res.ok) {
        let errorMessage = "Error al subir la imagen";
        try {
            const errorData = await res.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
            // Si no puede parsear el JSON, usar mensaje por defecto
        }
        
        // Mensajes específicos según el código de estado
        if (res.status === 413) {
            errorMessage = "La imagen es demasiado grande. Máximo 5MB.";
        } else if (res.status === 401) {
            errorMessage = "No autorizado. Inicia sesión nuevamente.";
        } else if (res.status >= 500) {
            errorMessage = "Error del servidor. Intenta nuevamente.";
        }
        
        throw new Error(errorMessage);
    }
    
    const result = await res.json();
    return result;
}

// Eliminar imagen por public_id
export async function deleteImage(publicId) {
    const token = getAuthToken();
    const res = await fetch(`${URL_IMAGES}/${encodeURIComponent(publicId)}`, { 
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error("Error al eliminar la imagen");
    return await res.json();
}