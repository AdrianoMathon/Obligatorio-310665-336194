import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Grafica = ({ etiquetas, datos, nombreGrafica, nombreDatos }) => {
  // Mapeo de colores por categoría (mismo esquema que FilaRutina)
  const coloresPorCategoria = {
    "FUERZA": " #aebc2f",
    "CARDIO": "#eb5306ff",        
    "FLEXIBILIDAD": "#e08e00",  
    "FUNCIONAL": "#42b8aa",     
    "HIIT": "#899c90",          
  };
 
  // Generar colores según las categorías recibidas
  const generarColores = (categorias) => {
    return categorias.map(categoria => {
      const color = coloresPorCategoria[categoria] || "#95a5a6"; // Gris por defecto
      return color + "cc"; // Añadir transparencia (cc = 80% opacidad)
    });
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: `${nombreGrafica ? nombreGrafica : "Grafica"}`,
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Mostrar solo números enteros
        },
      },
    },
  };

  const data = {
    labels: etiquetas,
    datasets: [
      {
        label: `${nombreDatos ? nombreDatos : "Datos"}`,
        data: datos,
        backgroundColor: generarColores(etiquetas),
        borderColor: generarColores(etiquetas).map(color => 
          color.replace("cc", "") // Remover transparencia para el borde
        ),
        borderWidth: 2,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default Grafica;
