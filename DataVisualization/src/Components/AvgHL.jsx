// import React from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { useContext } from "react";
// import { FileContext } from "./FileContext";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // Helper function to parse numbers safely
// // ... imports same rahenge

// const AvgHL = () => {
//   const { fileDataICE } = useContext(FileContext);

//   const parseNumber = (val) => {
//     if (val === undefined || val === null) return null;
//     let cleaned = val.toString().trim().replace(/,/g, "");
//     let num = Number(cleaned);
//     return isNaN(num) ? null : num;
//   };

//   console.log("File Data ICE:", fileDataICE); // Log the data structure
//   const filteredData = Array.isArray(fileDataICE)
//     ? fileDataICE.filter(
//         (row) =>
//           parseNumber(row["Chainage (m)"]) !== null &&
//           parseNumber(row["Elevation (m)"]) !== null &&
//           parseNumber(row["HL>AVG HL"]) !== null &&
//           parseNumber(row["DEx"]) !== null
//       )
//     : [];

//   // Instead of labels, we give x,y pairs
//   const elevationPoints = filteredData.map((row) => ({
//     x: parseNumber(row["Chainage (m)"]),
//     y: parseNumber(row["Elevation (m)"]),
//   })).filter(point =>
//     !isNaN(point.x) &&
//     !isNaN(point.y) &&
//     point.x !== 0 // Starting 0 chainage skip
//   );

//   console.log("Elevation Points:", elevationPoints);
//   console.log("Sample Elevation Points:", elevationPoints.slice(0, 10));

//   const avgHLPoints = filteredData.map((row) => ({
//     x: parseNumber(row["Chainage (m)"]),
//     y: parseNumber(row["HL>AVG HL"]),
//   })).filter(point =>
//     !isNaN(point.x) &&
//     !isNaN(point.y) &&
//     point.x !== 0 // Starting 0 chainage skip
//   );

// //   const dexPoints = filteredData.map((row) => ({
// //   x: parseNumber(row["Chainage (m)"]),
// //   y: parseNumber(row["DEx"]),
// // })).filter(point =>
// //   !isNaN(point.x) &&
// //   !isNaN(point.y) &&
// //   point.x !== 0
// // )

// // Transform DEx points: x = DEx, y = Chainage
// // const dexVerticalPoints = dexPoints.map(p => ({
// //   x: p.y,  // DEx value becomes x
// //   y: p.x,  // Chainage becomes y
// // }));

//   // const flowRegimePoints = filteredData
//   // .map((row) => {
//   //   const chainage = parseNumber(row["Chainage (m)"]);
//   //   const flowRegimeValue = parseNumber(row["Flow regime"]);

//   //   if (flowRegimeValue === 2) {
//   //     return [
//   //       { x: chainage, y: 2 },
//   //       { x: chainage + 1, y: 2.5 }, // Interpolated point
//   //     ];
//   //   } else if (flowRegimeValue === 3) {
//   //     return [
//   //       { x: chainage, y: 3 },
//   //       { x: chainage - 1, y: 2.5 }, // Interpolated point
//   //     ];
//   //   }

//   //   return { x: chainage, y: flowRegimeValue };
//   // })
//   // .flat() // nested arrays ko flatten karne ke liye
//   // .filter(
//   //   (point) =>
//   //     !isNaN(point.x) &&
//   //     !isNaN(point.y) &&
//   //     point.x !== 0 // 0 chainage skip
//   // );


// //   console.log("Pressure Points:", flowRegimePoints);
// //   console.log("Sample Pressure Points:", flowRegimePoints.slice(0, 10));

//   const data = {
//     datasets: [
//       {
//         label: "Elevation (m)",
//         data: elevationPoints,
//         borderColor: "black",
//         backgroundColor: "black",
//         yAxisID: "y1",
//         fill: false,
//         spanGaps: false,
//         pointRadius: 0,
//         borderWidth: 2,
        
//       },
//       // {
//       //   label: "DEx",
//       //   type: "scatter",
//       //   data: dexVerticalPoints,
//       //   borderColor: "yellow",
//       //   backgroundColor: "yellow",
//       //   yAxisID: "y1",
//       //   fill: false,
//       //   spanGaps: false,
//       //   pointRadius: 0,
//       //   borderWidth: 2,
        
//       // },
//       {
//         label: "HL>AVG HL",
//         data: avgHLPoints,
//         borderColor: "red",
//         backgroundColor: "red",
//         yAxisID: "y2",
//         fill: false,
//         spanGaps: false,
//         pointRadius: 2,
//         borderWidth: 0,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     interaction: { mode: "index", intersect: false },
//     stacked: false,
//     plugins: {
//       legend: { position: "top" },
//       title: { display: true, text: "Elevation & HL>AVG HL vs Chainage" },
//     },
//     scales: {
//       x: {
//         type: "linear",
//         title: { display: true, text: "Chainage (m)" },
//       },
//       y1: {
//         type: "linear",
//         display: true,
//         position: "left",
//         title: { display: true, text: "Elevation (m)" },
//       },
//       y2: {
//         type: "linear",
//         display: true,
//         position: "right",
//         grid: { drawOnChartArea: false },
//         title: { display: true, text: "AVG HL" },
    
        
//       },
//     },
//   };

//   return (
//     <div style={{ maxWidth: '100%', margin: '21px auto', padding: '2rem', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
//       <h2>Liquid HoldUp vs DEx</h2>
//       {Array.isArray(fileDataICE) && fileDataICE.length > 0 ? (
//         <Line data={data} options={options} />
//       ) : (
//         <p>No data available</p>
//       )}

//       {/* Button to show chunks */}
//       <div style={{ marginTop: "2rem", marginBottom: "1rem" }}>
//         <button
//           style={{ fontSize: "18px", cursor: "pointer" }}
//           onClick={() => {
//             const input = prompt("Enter chunk size in meters: ");
//             if (input && !isNaN(input)) {
//               window.open(`/avghl-chunks?chunk=${input}`, "_blank");
//             }
//           }}
//         >
//           Show Section-wise Charts
//         </button>
//       </div>

//     </div>
//   );
// };

// export default AvgHL;





// import React, { useContext } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import annotationPlugin from "chartjs-plugin-annotation";
// import { FileContext } from "./FileContext";

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

// const AvgHL = () => {
//   const { fileDataICE } = useContext(FileContext);

//   const parseNumber = (val) => {
//     if (val === undefined || val === null) return null;
//     let cleaned = val.toString().trim().replace(/,/g, "");
//     let num = Number(cleaned);
//     return isNaN(num) ? null : num;
//   };

//   const filteredData = Array.isArray(fileDataICE)
//     ? fileDataICE.filter(
//         (row) =>
//           parseNumber(row["Chainage (m)"]) !== null &&
//           parseNumber(row["Elevation (m)"]) !== null &&
//           parseNumber(row["HL>AVG HL"]) !== null
//       )
//     : [];

//      // Labels for X-axis
//   const chainageLabels = filteredData.map((row) =>
//     parseNumber(row["Chainage (m)"])
//   );

//   // Elevation points
//   const elevationPoints = filteredData
//     .map((row) => ({
//       x: parseNumber(row["Chainage (m)"]),
//       y: parseNumber(row["Elevation (m)"]),
//     }))
//     .filter((p) => !isNaN(p.x) && !isNaN(p.y) && p.x !== 0);

//   // Avg HL points
//   const avgHLPoints = filteredData
//     .map((row) => ({
//       x: parseNumber(row["Chainage (m)"]),
//       y: parseNumber(row["HL>AVG HL"]),
//     }))
//     .filter((p) => !isNaN(p.x) && !isNaN(p.y) && p.x !== 0);

//   // Collect all DEx values from the DEx column
//   const dexValues = Array.isArray(fileDataICE)
//     ? fileDataICE
//         .map((row) => parseNumber(row["DEx"]))
//         .filter((val) => val !== null && !isNaN(val))
//     : [];

//   // Build annotations for all DEx values
//   const dexAnnotations = dexValues.reduce((acc, val, idx) => {
//     acc[`dexLine${idx}`] = {
//       type: "line",
//       xMin: val,
//       xMax: val,
//       borderColor: "green",
//       borderWidth: 2,
//       label: {
//         content: `DEx ${idx + 1}`,
//         enabled: true,
//         position: "start",
//       },
//     };
//     return acc;
//   }, {});

//   const data = {
//     labels: filteredData.map((row) => parseNumber(row["Chainage (m)"])),
//     datasets: [
//       {
//         label: "Elevation (m)",
//         data: elevationPoints,
//         borderColor: "black",
//         backgroundColor: "black",
//         yAxisID: "y1",
//         fill: false,
//         pointRadius: 0,
//         borderWidth: 2,
//       },
//       {
//         label: "HL > AVG HL",
//         data: avgHLPoints,
//         borderColor: "red",
//         backgroundColor: "red",
//         yAxisID: "y2",
//         fill: false,
//         pointRadius: 2,
//         borderWidth: 0,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     interaction: { mode: "index", intersect: false },
//     stacked: false,
//     plugins: {
//       legend: { position: "top" },
//       title: { display: true, text: "Elevation & HL>AVG HL vs Chainage" },
//       annotation: {
//         annotations: dexAnnotations,
//       },
//     },
//     scales: {
//       x: {
//         type: "linear",
//         title: { display: true, text: "Chainage (m)" },
//       },
//       y1: {
//         type: "linear",
//         display: true,
//         position: "left",
//         title: { display: true, text: "Elevation (m)" },
//       },
//       y2: {
//         type: "linear",
//         display: true,
//         position: "right",
//         grid: { drawOnChartArea: false },
//         title: { display: true, text: "AVG HL" },
//       },
//     },
//   };

//   return (
//     <div
//       style={{
//         maxWidth: "100%",
//         margin: "21px auto",
//         padding: "2rem",
//         backgroundColor: "#ffffff",
//         borderRadius: "10px",
//         boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
//       }}
//     >
//       <h2>Elevation & HL&AVG HL vs Chainage</h2>
//       {Array.isArray(fileDataICE) && fileDataICE.length > 0 ? (
//         <Line data={data} options={options} />
//       ) : (
//         <p>No data available</p>
//       )}
//     </div>
//   );
// };

// export default AvgHL;



import React, { useContext } from "react";
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
import annotationPlugin from "chartjs-plugin-annotation";
import { FileContext } from "./FileContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const AvgHL = () => {
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
          parseNumber(row["HL>AVG HL"]) !== null
      )
    : [];

  // Labels for X-axis
  const chainageLabels = filteredData.map((row) =>
    parseNumber(row["Chainage (m)"])
  );

  // Elevation values
  const elevationValues = filteredData.map((row) =>
    parseNumber(row["Elevation (m)"])
  );

  // HL > AVG HL values
  const avgHLValues = filteredData.map((row) =>
    parseNumber(row["HL>AVG HL"])
  );

  // Collect all DEx values from the DEx column
  const dexValues = Array.isArray(fileDataICE)
    ? fileDataICE
        .map((row) => parseNumber(row["DEx"]))
        .filter((val) => val !== null && !isNaN(val))
    : [];

  // Build annotations for all DEx values
  const dexAnnotations = dexValues.reduce((acc, val, idx) => {
    acc[`dexLine${idx}`] = {
      type: "line",
      xMin: val,
      xMax: val,
      borderColor: "green",
      borderWidth: 2,
      label: {
        content: `DEx ${idx + 1}`,
        enabled: true,
        position: "start",
      },
    };
    return acc;
  }, {});

  const data = {
    labels: chainageLabels, // x-axis labels
    datasets: [
      {
        label: "Elevation (m)",
        data: elevationValues,
        borderColor: "black",
        backgroundColor: "black",
        yAxisID: "y1",
        fill: false,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: "HL > AVG HL",
        data: avgHLValues,
        borderColor: "red",
        backgroundColor: "red",
        yAxisID: "y2",
        fill: false,
        pointRadius: 2,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: { mode: "index", intersect: false },
    stacked: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Elevation & HL>AVG HL vs Chainage" },
      annotation: { annotations: dexAnnotations },
    },
    scales: {
      x: {
        type: "category", // 👈 treat chainage as categories
        title: { display: true, text: "Chainage (m)" },
        ticks: {
          maxRotation: 90,
          minRotation: 45,
          autoSkip: true,
          maxTicksLimit: 20, // adjust how many chainages show
        },
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
        title: { display: true, text: "AVG HL" },
      },
    },
  };

  return (
    <div
      style={{
        maxWidth: "100%",
        margin: "21px auto",
        padding: "2rem",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
      }}
    >
      <h2>Elevation & HL&AVG HL & DEx vs Chainage</h2>
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
            window.open(`/avghl-chunks?chunk=${input}`, '_blank');
          }
        }}>
          Show Section-wise Charts
        </button>
      </div>
    </div>
  );
};

export default AvgHL;
