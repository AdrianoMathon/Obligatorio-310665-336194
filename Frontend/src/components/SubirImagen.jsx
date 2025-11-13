import React, { useId, useState, useImperativeHandle, forwardRef } from "react";
import "../styles/subir-imagen.css";

const SubirImagen = forwardRef(({ handleImgURL }, ref) => {
  const [preview, setPreview] = useState(null);
  const botonId = useId();

  useImperativeHandle(ref, () => ({
    reset() {
      setPreview(null);
      handleImgURL(""); 
      
      const input = document.getElementById(botonId);
      if (input) {
        input.value = "";
      }
    },
  }));

  // Convertir archivo a Base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Solo se permiten archivos de imagen (JPG, PNG, WEBP)');
      return;
    }

    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('La imagen debe ser menor a 5MB');
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      setPreview(base64);
      handleImgURL(base64);
    } catch (error) {
      console.error("Error al convertir imagen a base64:", error);
      alert('Error al procesar la imagen');
    }
  };

  const handleClear = () => {
    setPreview(null);
    handleImgURL(""); 
    
    // Limpiar el input file
    const input = document.getElementById(botonId);
    if (input) {
      input.value = "";
    }
  };

  return (
    <div className="upload-container">
      <input
        type="file"
        id={botonId}
        accept="image/*"
        hidden={true}
        onChange={handleFileChange}
      />
      <label
        htmlFor={botonId}
        className="upload-label"
      >
        Seleccionar archivo
      </label>

      {preview && (
        <div className="preview-container">
          <img
            src={preview}
            alt="preview"
            className="preview-image"
          />
        </div>
      )}

      {preview && (
        <div className="preview-actions">
          <p className="preview-success-text">
            ✅ Imagen seleccionada - se subirá al crear la rutina
          </p>
          <button
            onClick={handleClear}
            className="btn-delete-image"
          >
            🗑️ Eliminar imagen
          </button>
        </div>
      )}
    </div>
  );
});

export default SubirImagen;