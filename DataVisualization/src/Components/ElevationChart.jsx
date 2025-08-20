// import React, { useContext } from 'react';
// import { FileContext } from './FileContext';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import annotationPlugin from 'chartjs-plugin-annotation';
// import {useNavigate} from 'react-router-dom';


// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   annotationPlugin
// );

// const ElevationChart = () => {
//   const { fileDataICE } = useContext(FileContext);
//   const navigate = useNavigate();

//   console.log('ElevationChart fileDataICE:', fileDataICE);

//   const xKey = 'Chainage (m)';
//   const yKey1 = 'Elevation (m)';
//   const yKey2 = 'Water Holdup (ABBL)';

//   // Clean and trim column headers (just in case)
//   const cleanData = fileDataICE.map(row => {
//     const cleaned = {};
//     Object.keys(row).forEach(key => {
//       cleaned[key.trim()] = row[key];
//     });
//     return cleaned;
//   });

//   // Convert Chainage to numbers
//   const chainageValues = cleanData.map(row => {
//     const val = Number(row[xKey]);
//     return isNaN(val) ? 0 : val;
//   });

//   // Convert elevation values to numbers and replace null/undefined with 0
//   let elevationValues = cleanData.map((row) => {
//     const val = Number(row[yKey1]);
//     return isNaN(val) ? 0 : val;
//   });

//   // Optional: Replace zero values that cause sharp drop with previous non-zero value (simple forward fill)
//   for (let i = 1; i < elevationValues.length; i++) {
//     if (elevationValues[i] === 0 && elevationValues[i - 1] !== 0) {
//       elevationValues[i] = elevationValues[i - 1];
//     }
//   }

//   // Convert water holdup values to numbers
//   const waterHoldupValues = cleanData.map((row) => {
//     const val = Number(row[yKey2]);
//     return isNaN(val) ? 0 : val;
//   });

//   const chartData = {
//     // Remove labels array for linear x-axis
//     datasets: [
//       {
//         label: `${yKey1} `,
//         data: chainageValues.map((x, i) => ({ x, y: elevationValues[i] })),
//         fill: false,
//         borderColor: 'rgba(0, 0, 0, 1)',  // solid black line
//         backgroundColor: 'rgba(0, 0, 0, 1)',
//         borderWidth: 2,
//         tension: 0,
//         yAxisID: 'y', //Primary Axis
//         pointRadius: 0,
//       },

//        {
//         label: `${yKey2} `,
//         data: chainageValues.map((x, i) => ({ x, y: waterHoldupValues[i] })),
//         fill: false,
//         borderColor: '#FF00FF',
//         backgroundColor: '#FF00FF',
//         borderWidth: 2,
//         tension: 0.4,
//         yAxisID: 'y1', //Secondary Axis
//         pointRadius: 5,
//         showLine: true,
//         pointHoverRadius: 7,

//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     mainAspectRation: false,
//     plugins: {
//       title: {
//         display: true,
//         text: `Elevation & Water HoldUp vs Chainage`,
//       },
//       legend: {
//         display: true,
//       },
//     },

//     scales: {
//       x: {
//         type: 'linear',  // Change x-axis to linear scale
//         title: {
//           display: true,
//           text: xKey,
//         },
//         ticks: {
//           maxTicksLimit: 10,
//           autoSkip: true,
//           maxRotation: 45,
//           minRotation: 30,
//           callback: function(value) {
//             return Number(value).toFixed(0);
//           }
//         }
//       },
//       y: {
//         display: true,
//         position: 'left',
//         title: {
//           display: true,
//           text: yKey1,  //Elevation
//         },
//       },

//       y1: {
//         display: true,
//         position: 'right',
//         title: {
//           display: true,
//           text: yKey2, //HL
//         },
//         grid: {
//           drawOnChartArea: false,  //avoids overlaps of grid lines
//         },
//       },
//     },
//   };

//   return (
//     <div style = {{ maxWidth: '100%',
//       margin: '21px auto',
//       padding: '2rem',
//       backgroundColor: '#ffffff',
//       borderRadius: '10px',
//       boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
//     }}>
//       <h2>Liquid Hold-Up</h2>
//       {fileDataICE.length > 0 ? <Line data={chartData} options={options} /> :null}

//        {/* Button to show chunks */}

//       <div style={{ marginTop: '2rem', marginBottom: '1rem' }}>
//         <button style={{fontSize: '18px', cursor: 'pointer'}} onClick={() => {
//           const input = prompt('Enter chunk size in meters: ');
//           if (input && !isNaN(input)) {
//             window.open(`/rolledUp-chunks?chunk=${input}`, '_blank');
//           }
//         }}>
//           Show Section-wise Charts
//         </button>
//       </div>
//   </div>
//   );
// };

// export default ElevationChart;

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useContext } from "react";
import { FileContext } from "./FileContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Helper function to parse numbers safely
// ... imports same rahenge

const ElevationChart = () => {
  const { fileDataICE } = useContext(FileContext);

  const parseNumber = (val) => {
    if (val === undefined || val === null) return null;
    let cleaned = val.toString().trim().replace(/,/g, "");
    let num = Number(cleaned);
    return isNaN(num) ? null : num;
  };

  const filteredData = Array.isArray(fileDataICE)
    ? fileDataICE.filter(
        (row) =>
          parseNumber(row["Chainage (m)"]) !== null &&
          parseNumber(row["Elevation (m)"]) !== null &&
          parseNumber(row["HL (Abbls)"]) !== null
      )
    : [];

  // Instead of labels, we give x,y pairs
  const elevationPoints = filteredData.map((row) => ({
    x: parseNumber(row["Chainage (m)"]),
    y: parseNumber(row["Elevation (m)"]),
  })).filter(point =>
    !isNaN(point.x) &&
    !isNaN(point.y) &&
    point.x !== 0 // Starting 0 chainage skip
  );

  console.log("Elevation Points:", elevationPoints);
  console.log("Sample Elevation Points:", elevationPoints.slice(0, 10));

  const waterHoldUpPoints = filteredData.map((row) => ({
    x: parseNumber(row["Chainage (m)"]),
    y: parseNumber(row["HL (Abbls)"]),
  })) .filter(point =>
    !isNaN(point.x) &&
    !isNaN(point.y) &&
    point.x !== 0
  );

  console.log("Pressure Points:", waterHoldUpPoints);
  console.log("Sample Pressure Points:", waterHoldUpPoints.slice(0, 10));

  const data = {
    datasets: [
      {
        label: "Elevation (m)",
        data: elevationPoints,
        borderColor: "black",
        backgroundColor: "black",
        yAxisID: "y1",
        fill: false,
        spanGaps: false,
        pointRadius: 0,
        borderWidth: 2,
      },
     
       {
       label: "HL (Abbls)",
         data: waterHoldUpPoints,
         borderColor: "#1c95e6",
         backgroundColor: "#1c95e6",
         // borderDash: [5, 5],
         yAxisID: "y2",
         fill: false,
         spanGaps: false,
        pointRadius:4,
         borderWidth: 0,
         showLine: false,
       },
    ],
  };

  const options = {
    responsive: true,
    interaction: { mode: "index", intersect: false },
    stacked: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Elevation & Water HoldUp vs Chainage" },
    },
    scales: {
      x: {
        type: "linear",
        title: { display: true, text: "Chainage (m)" },
      },
      y1: {
        type: "linear",
        display: true,
        position: "left",
        title: { display: true, text: "Elevation (m)" },
      },
      y2: {
        type: "linear",
        display: true,
        position: "right",
        grid: { drawOnChartArea: false },
        title: { display: true, text: "HL (Abbls)" },
      },
    },
  };

  return (
    <div style={{ maxWidth: '100%', margin: '21px auto', padding: '2rem', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
      <h2>Liquid HoldUp</h2>
      {Array.isArray(fileDataICE) && fileDataICE.length > 0 ? (
        <Line data={data} options={options} />
      ) : (
        <p>No data available</p>
      )}

       {/* Button to show chunks */}

       <div style={{ marginTop: '2rem', marginBottom: '1rem' }}>
        <button style={{fontSize: '18px', cursor: 'pointer'}} onClick={() => {
           const input = prompt('Enter chunk size in meters: ');
           if (input && !isNaN(input)) {
             window.open(`/rolledUp-chunks?chunk=${input}`, '_blank');
           }
         }}>
           Show Section-wise Charts
         </button>
    </div>
    </div>
  );
};

export default ElevationChart;


