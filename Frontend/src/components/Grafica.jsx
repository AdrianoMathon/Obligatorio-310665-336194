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
      const color = coloresPorCategoria[categoria] || "#95a5a6"; 
      return color + "cc"; 
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
          stepSize: 1, 
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
          color.replace("cc", "")
        ),
        borderWidth: 2,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default Grafica;
