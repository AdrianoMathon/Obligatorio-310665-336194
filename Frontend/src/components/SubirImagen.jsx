import React, { useId, useState, useImperativeHandle, forwardRef } from "react";
import { uploadImage, deleteImage } from "../services/imageService";

const SubirImagen = forwardRef(({ handleImgURL }, ref) => {
  const [preview, setPreview] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const botonId = useId();

  // Exponer método al padre
  useImperativeHandle(ref, () => ({
    reset() {
      setPreview(null);
      setImageData(null);
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

    const base64 = await fileToBase64(file);
    console.log("base64", base64);
    setPreview(base64);
  };

  const handleUpload = async () => {
    if (!preview) return;
    setLoading(true);
    try {
      const result = await uploadImage(preview);
      setImageData(result);
      alert("Imagen subida con éxito");
      handleImgURL(result.secure_url);
    } catch (err) {
      alert("Error al subir la imagen: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!imageData?.public_id) return;
    setLoading(true);
    try {
      await deleteImage(imageData.public_id);
      alert("🗑️ Imagen eliminada con éxito");
      setPreview(null);
      setImageData(null);
      handleImgURL(""); // Limpiar URL en el formulario padre
    } catch (err) {
      alert("Error al eliminar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", textAlign: "center" }}>
      <h5>Seleccionar imagen</h5>

      <input
        type="file"
        id={botonId}
        accept="image/*"
        hidden={true}
        onChange={handleFileChange}
        disabled={loading}
      />
      <label
        htmlFor={botonId}
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          display: "inline-block",
          marginBottom: "15px"
        }}
      >
        📤 Seleccionar archivo
      </label>

      {preview && (
        <div style={{ marginTop: 20 }}>
          <img
            src={preview}
            alt="preview"
            style={{ width: "100%", maxWidth: "300px", borderRadius: 10 }}
          />
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        {!imageData ? (
          <button 
            onClick={handleUpload} 
            disabled={loading || !preview}
            style={{
              backgroundColor: preview ? "#28a745" : "#6c757d",
              color: "#fff",
              padding: "8px 16px",
              border: "none",
              borderRadius: "5px",
              cursor: preview ? "pointer" : "not-allowed"
            }}
          >
            {loading ? "Subiendo..." : "Subir Imagen"}
          </button>
        ) : (
          <button 
            onClick={handleDelete} 
            disabled={loading}
            style={{
              backgroundColor: "#dc3545",
              color: "#fff",
              padding: "8px 16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            {loading ? "Eliminando..." : "Eliminar Imagen"}
          </button>
        )}
      </div>

      {imageData && (
        <div style={{ marginTop: 15 }}>
          <p>
            🌐 <strong>URL:</strong>{" "}
            <a href={imageData.secure_url} target="_blank" rel="noreferrer">
              Ver en Cloudinary
            </a>
          </p>
          <p>
            🆔 <strong>Public ID:</strong> {imageData.public_id}
          </p>
        </div>
      )}
    </div>
  );
});

export default SubirImagen;