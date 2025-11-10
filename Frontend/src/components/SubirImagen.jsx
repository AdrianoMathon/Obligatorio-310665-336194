import React, { useId, useState, useImperativeHandle, forwardRef } from "react";

const SubirImagen = forwardRef(({ handleImgURL }, ref) => {
  const [preview, setPreview] = useState(null);
  const botonId = useId();

  // Exponer método al padre
  useImperativeHandle(ref, () => ({
    reset() {
      setPreview(null);
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
    handleImgURL(base64);
  };

  const handleClear = () => {
    setPreview(null);
    handleImgURL(""); // Limpiar en Formik
    
    // Limpiar el input file
    const input = document.getElementById(botonId);
    if (input) {
      input.value = "";
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

      {preview && (
        <div style={{ marginTop: 15 }}>
          <p style={{ color: "#28a745", fontWeight: "bold" }}>
            ✅ Imagen seleccionada - se subirá al crear la rutina
          </p>
          <button
            onClick={handleClear}
            style={{
              backgroundColor: "#dc3545",
              color: "#fff",
              padding: "6px 12px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px"
            }}
          >
            🗑️ Eliminar imagen
          </button>
        </div>
      )}
    </div>
  );
});

export default SubirImagen;