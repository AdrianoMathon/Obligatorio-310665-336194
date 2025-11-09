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
  // Generar colores dinámicos para cada barra
  const generarColores = (cantidad) => {
    const colores = [
      "rgba(54, 162, 235, 0.8)",   // Azul
      "rgba(255, 99, 132, 0.8)",   // Rojo
      "rgba(75, 192, 192, 0.8)",   // Verde agua
      "rgba(255, 206, 86, 0.8)",   // Amarillo
      "rgba(153, 102, 255, 0.8)",  // Púrpura
      "rgba(255, 159, 64, 0.8)",   // Naranja
      "rgba(201, 203, 207, 0.8)",  // Gris
      "rgba(255, 99, 255, 0.8)",   // Rosa
      "rgba(100, 200, 100, 0.8)",  // Verde claro
      "rgba(200, 100, 50, 0.8)",   // Café
    ];
    
    // Si hay más categorías que colores, repetir el patrón
    return Array.from({ length: cantidad }, (_, i) => colores[i % colores.length]);
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
        backgroundColor: generarColores(etiquetas.length),
        borderColor: generarColores(etiquetas.length).map(color => 
          color.replace("0.8", "1")
        ),
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default Grafica;
