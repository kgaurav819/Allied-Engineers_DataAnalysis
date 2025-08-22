
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
// const parseNumber = (val) => {
//   if (val === undefined || val === null) return null;
//   let cleaned = val.toString().trim().replace(/,/g, "");
//   let num = Number(cleaned);
//   return isNaN(num) ? null : num;
// };

// // Helper to find the right column name from possible variations
// const findColumn = (row, possibleNames) => {
//   const keys = Object.keys(row);
//   for (let name of possibleNames) {
//     const match = keys.find((key) => key.toLowerCase().trim() === name.toLowerCase().trim());
//     if (match) return match;
//   }
//   return null;
// };

// const InclinationAngleChart = () => {
//   const { fileDataICE } = useContext(FileContext);

//   const filteredData = Array.isArray(fileDataICE)
//     ? fileDataICE.filter(
//         (row) =>
//           parseNumber(row["Chainage (m)"]) !== null &&
//           parseNumber(row["Elevation (m)"]) !== null
//       )
//     : [];

//   // Dynamically resolve column keys
//   const elevationProfileKey =
//     filteredData.length > 0
//       ? findColumn(filteredData[0], [
//           "elevation profile angles",
//           "elevation_profile_angles",
//           "Elevation profile angle",
//         ])
//       : null;

//   const dgCriticalKey =
//     filteredData.length > 0
//       ? findColumn(filteredData[0], [
//           "dg critical angle",
//           "dg_critical_angle",
//           "DG critical angle",
//         ])
//       : null;

//   // Elevation Points
//   const elevationPoints = filteredData
//     .map((row) => ({
//       x: parseNumber(row["Chainage (m)"]),
//       y: parseNumber(row["Elevation (m)"]),
//     }))
//     .filter(
//       (point) =>
//         !isNaN(point.x) && !isNaN(point.y) && point.x !== 0 // Skip chainage 0
//     );

//   // DG Critical Points
//   const dgCriticalPoints =
//     dgCriticalKey !== null
//       ? filteredData
//           .map((row) => ({
//             x: parseNumber(row["Chainage (m)"]),
//             y: parseNumber(row[dgCriticalKey]),
//           }))
//           .filter(
//             (point) =>
//               !isNaN(point.x) && !isNaN(point.y) && point.x !== 0
//           )
//       : [];

//   // Elevation Profile Points
//   const elevationProfilePoints =
//     elevationProfileKey !== null
//       ? filteredData
//           .map((row) => ({
//             x: parseNumber(row["Chainage (m)"]),
//             y: parseNumber(row[elevationProfileKey]),
//           }))
//           .filter(
//             (point) =>
//               !isNaN(point.x) && !isNaN(point.y) && point.x !== 0
//           )
//       : [];


//       console.log("ElevationProfileKey:", elevationProfilePoints);
// console.log("DG Critical Key:", dgCriticalPoints);

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
//       {
//         label: "DG critical angle",
//         data: dgCriticalPoints,
//         borderColor: "#24db0f",
//         backgroundColor: "#24db0f",
//         yAxisID: "y2",
//         fill: false,
//         spanGaps: false,
//         pointRadius: 2,
//         borderWidth: 0,
//         showLine: false,
//       },
//       {
//         label: "Elevation profile angle",
//         data: elevationProfilePoints,
//         borderColor: "red",
//         backgroundColor: "red",
//         yAxisID: "y2",
//         fill: false,
//         spanGaps: false,
//         pointRadius: 2,
//         borderWidth: 0,
//         showLine: false,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     interaction: { mode: "index", intersect: false },
//     stacked: false,
//     plugins: {
//       legend: { position: "top" },
//       title: {
//         display: true,
//         text: "Elevation & Inclination Angles vs Chainage",
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
//         title: {
//           display: true,
//           text: "DG Critical Angle & Elevation Profile Angle",
//         },
//       },
//     },
//   };


//   console.log("X values:", elevationProfilePoints.map(d => d.x));
// console.log("Y values:", elevationProfilePoints.map(d => d.value));


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
//       <h2>Inclination Angle</h2>
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
//               window.open(`/inclinationAngle-chunks?chunk=${input}`, "_blank");
//             }
//           }}
//         >
//           Show Section-wise Charts
//         </button>
//       </div>
//     </div>
//   );
// };

// export default InclinationAngleChart;




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
const parseNumber = (val) => {
  if (val === undefined || val === null) return null;
  let cleaned = val.toString().trim().replace(/,/g, "");
  let num = Number(cleaned);
  return isNaN(num) ? null : num;
};

// Helper to find the right column name from possible variations
const findColumn = (row, possibleNames) => {
  const keys = Object.keys(row);
  for (let name of possibleNames) {
    const match = keys.find(
      (key) => key.toLowerCase().trim() === name.toLowerCase().trim()
    );
    if (match) return match;
  }
  return null;
};

const InclinationAngleChart = () => {
  const { fileDataICE } = useContext(FileContext);

  // clean + filter
  const cleanData = Array.isArray(fileDataICE)
    ? fileDataICE.map((row) => {
        const cleaned = {};
        Object.keys(row).forEach((key) => {
          cleaned[key.trim()] = row[key];
        });
        return cleaned;
      })
    : [];

  const validData = cleanData
    .filter(
      (row) =>
        parseNumber(row["Chainage (m)"]) !== null &&
        parseNumber(row["Elevation (m)"]) !== null
    )
    .sort(
      (a, b) => parseNumber(a["Chainage (m)"]) - parseNumber(b["Chainage (m)"])
    );

  // Column keys
  const elevationProfileKey =
    validData.length > 0
      ? findColumn(validData[0], [
          "elevation profile angles",
          "elevation_profile_angles",
          "Elevation profile angle",
        ])
      : null;

  const dgCriticalKey =
    validData.length > 0
      ? findColumn(validData[0], [
          "dg critical angle",
          "dg_critical_angle",
          "DG critical angle",
        ])
      : null;

  // Labels (X axis = chainage)
  const labels = validData.map((row) =>
    parseNumber(row["Chainage (m)"]).toFixed(2)
  );

  // Data arrays for each dataset
  const elevationValues = validData.map((row) =>
    parseNumber(row["Elevation (m)"])
  );

  const dgCriticalValues =
    dgCriticalKey !== null
      ? validData.map((row) => parseNumber(row[dgCriticalKey]))
      : [];

  const elevationProfileValues =
    elevationProfileKey !== null
      ? validData.map((row) => parseNumber(row[elevationProfileKey]))
      : [];

  const data = {
    labels,
    datasets: [
      {
        label: "Elevation (m)",
        data: elevationValues,
        borderColor: "black",
        backgroundColor: "black",
        yAxisID: "y1",
        pointRadius: 0,
        borderWidth: 2,
      },
       {
        label: "DG Critical Angle",
        data: dgCriticalValues,
        borderColor: "#24db0f",
        backgroundColor: "#24db0f",
        yAxisID: "y2",
        pointRadius: 0,
        borderWidth: 2,
      },
      // {
      //   label: "DG critical angle",
      //   data: dgCriticalValues,
      //   borderColor: "#24db0f",
      //   backgroundColor: "#24db0f",
      //   yAxisID: "y2",
      //   pointRadius: 0,
      //   borderWidth: 2,
      //   showLine: false,
      // },
      // {
      //   label: "Elevation profile angle",
      //   data: elevationProfileValues,
      //   borderColor: "red",
      //   backgroundColor: "red",
      //   yAxisID: "y2",
      //   pointRadius: 0,
      //   borderWidth: 2,
        
      // },

      {
        label: "Elevation Profile Angle",
        data: elevationProfileValues,
        borderColor: "red",
        backgroundColor: "red",
        yAxisID: "y2",
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: { mode: "index", intersect: false },
    stacked: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Elevation & Inclination Angles vs Chainage",
      },
    },
    scales: {
      x: {
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
        title: {
          display: true,
          text: "DG Critical Angle & Elevation Profile Angle",
        },
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
      <h2>Inclination Angle</h2>
      {validData.length > 0 ? (
        <Line data={data} options={options} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default InclinationAngleChart;


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

// const InclinationAngle = () => {
//   const { fileDataICE } = useContext(FileContext);

//   const parseNumber = (val) => {
//     if (val === undefined || val === null) return null;
//     let cleaned = val.toString().trim().replace(/,/g, "");
//     let num = Number(cleaned);
//     return isNaN(num) ? null : num;
//   };

//     // Function to find column name even if spacing/case is different
//   const findColumn = (row, possibleNames) => {
//     const keys = Object.keys(row).map(k => k.trim().toLowerCase());
//     const match = keys.find(k => possibleNames.includes(k));
//     if (!match) return null;
//     const originalKey = Object.keys(row).find(k => k.trim().toLowerCase() === match);
//     return originalKey;
//   };

//   const filteredData = Array.isArray(fileDataICE) ? fileDataICE : [];
//   console.log("Filtered Data:", filteredData); // Log the filtered data
//   console.log("Filtered Data:", filteredData); // Log the filtered data
//     // ? fileDataICE : [];

//      const chainageKey = filteredData.length > 0
//     ? findColumn(filteredData[0], ["chainage (m)", "chainage"])
//     : null;

//   const elevationKey = filteredData.length > 0
//     ? findColumn(filteredData[0], ["elevation (m)", "elevation"])
//     : null;

//   const dgCriticalKey = filteredData.length > 0
//     ? findColumn(filteredData[0], ["dg critical angle", "dg_critical_angle"])
//     : null;

//   const elevationProfileKey = filteredData.length > 0
//     ? findColumn(filteredData[0], ["elevation profile angles", "elevation_profile_angles"])
//     : null;

//   console.log("Detected Keys:", { chainageKey, elevationKey, dgCriticalKey, elevationProfileKey });

//   // Instead of labels, we give x,y pairs
//   const elevationPoints = filteredData.map((row) => ({
//     x: parseNumber(row["chainageKey"]),
//     y: parseNumber(row["elevationKey"]),
//   })).filter(point =>
//     !isNaN(point.x) &&
//     !isNaN(point.y) &&
//     point.x !== 0 // Starting 0 chainage skip
//   );

//   console.log("Elevation Points:", elevationPoints); // Log elevation points
//   console.log("Sample Elevation Points:", elevationPoints.slice(0, 10));

//   const criticalAnglePoints = filteredData.map((row) => ({
//     x: parseNumber(row["chainageKey"]),
//     y: parseNumber(row["dgCriticalKey"]),
//   })) .filter(point =>
//     point.x != null &&
//     point.y != null &&
//     !isNaN(point.x) &&
//     !isNaN(point.y) &&
//     point.x !== 0
//   );

//   console.log("Pressure Points:", criticalAnglePoints);
//   console.log("Sample Pressure Points:", criticalAnglePoints.slice(0, 10));

//   const elevationProfileAngles = filteredData.map((row) => ({
//     x: parseNumber(row["chainageKey"]),
//     y: parseNumber(row["elevationProfileKey"]),
//   })).filter(point => 
//     point.x != null &&
//     point.y != null &&
//      !isNaN(point.x) &&
//     !isNaN(point.y) &&
//     point.x !== 0
//   );

//   const data = {
//     datasets: [
//       {
//         label: "Elevation (m)",
//         data: elevationPoints,
//         borderColor: "blue",
//         backgroundColor: "blue",
//         yAxisID: "y1",
//         fill: false,
//         spanGaps: false,
//       },
//       {
//         label: "DG CRITICAL ANGLE",
//         data: criticalAnglePoints,
//         borderColor: "red",
//         backgroundColor: "red",
//         borderDash: [5, 5],
//         yAxisID: "y2",
//         fill: false,
//         spanGaps: false,
//       },
//       {
//         label: "ELEVATION PROFILE ANGLES",
//         data: elevationProfileAngles,
//         borderColor: "yellow",
//         backgroundColor: "yellow",
//         borderDash: [5, 5],
//         yAxisID: "y2",
//         fill: false,
//         spanGaps: false,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     interaction: { mode: "index", intersect: false },
//     stacked: false,
//     plugins: {
//       legend: { position: "top" },
//       title: { display: true, text: "Elevation & Inclination Angle vs Chainage" },
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
//         title: { display: true, text: "DG CRITICAL ANGLE" },
//       },
//     },
//   };

//   return (
//     <div style={{ maxWidth: '100%', margin: '21px auto', padding: '2rem', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
//       <h2>Inclination Angle</h2>
//       {Array.isArray(fileDataICE) && fileDataICE.length > 0 ? (
//         <Line data={data} options={options} />
//       ) : (
//         <p>No data available</p>
//       )}
//     </div>
//   );
// };

// export default InclinationAngle;


// import React, { useContext } from "react";
// import { FileContext } from "./FileContext";
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

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function InclinationAngle() {
//   const { files } = useContext(FileContext);

//   if (!files?.length) return <p>No file uploaded</p>;

//   const data = files[0].data; // Assuming first file contains required data

//   const parseNumber = (value) => {
//     if (value == null || value === "") return null;
//     const num = parseFloat(value);
//     return isNaN(num) ? null : num;
//   };

//   // Find column key ignoring case/space
//   const findColumn = (possibleNames) => {
//     return (
//       Object.keys(data[0] || {}).find((key) =>
//         possibleNames.some(
//           (name) =>
//             key.trim().toLowerCase() === name.trim().toLowerCase()
//         )
//       ) || null
//     );
//   };

//   const chainageKey = findColumn(["CHAINAGE", "Chainage"]);
//   const elevationKey = findColumn(["ELEVATION", "Elevation"]);
//   const dgCriticalKey = findColumn([
//     "DG CRITICAL ANGLE",
//     "DG Critical Angle",
//     "dg_critical_angle",
//   ]);
//   const elevationProfileKey = findColumn([
//     "ELEVATION PROFILE ANGLES",
//     "Elevation Profile Angles",
//     "elevation_profile_angles",
//   ]);

//   if (!chainageKey || !elevationKey || !dgCriticalKey || !elevationProfileKey) {
//     return <p>Required columns not found in the file</p>;
//   }

//   const filteredData = data.filter(
//     (row) =>
//       row[chainageKey] != null &&
//       row[elevationKey] != null &&
//       row[dgCriticalKey] != null &&
//       row[elevationProfileKey] != null
//   );

//   const elevationPoints = filteredData
//     .map((row) => ({
//       x: parseNumber(row[chainageKey]),
//       y: parseNumber(row[elevationKey]),
//     }))
//     .filter((point) => point.x !== null && point.y !== null);

//   const criticalAnglePoints = filteredData
//     .map((row) => ({
//       x: parseNumber(row[chainageKey]),
//       y: parseNumber(row[dgCriticalKey]),
//     }))
//     .filter((point) => point.x !== null && point.y !== null);

//   const elevationProfileAngles = filteredData
//     .map((row) => ({
//       x: parseNumber(row[chainageKey]),
//       y: parseNumber(row[elevationProfileKey]),
//     }))
//     .filter((point) => point.x !== null && point.y !== null);

//   const chartData = {
//     labels: elevationPoints.map((p) => p.x),
//     datasets: [
//       {
//         label: "Elevation",
//         data: elevationPoints.map((p) => p.y),
//         borderColor: "blue",
//         backgroundColor: "blue",
//         yAxisID: "y",
//       },
//       {
//         label: "DG Critical Angle",
//         data: criticalAnglePoints.map((p) => p.y),
//         borderColor: "red",
//         backgroundColor: "red",
//         yAxisID: "y1",
//       },
//       {
//         label: "Elevation Profile Angles",
//         data: elevationProfileAngles.map((p) => p.y),
//         borderColor: "green",
//         backgroundColor: "green",
//         yAxisID: "y1",
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     interaction: {
//       mode: "index",
//       intersect: false,
//     },
//     stacked: false,
//     plugins: {
//       title: {
//         display: true,
//         text: "Inclination Angle Chart",
//       },
//     },
//     scales: {
//       y: {
//         type: "linear",
//         display: true,
//         position: "left",
//       },
//       y1: {
//         type: "linear",
//         display: true,
//         position: "right",
//         grid: {
//           drawOnChartArea: false,
//         },
//       },
//     },
//   };

//   return <Line data={chartData} options={options} />;
// }

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

// const InclinationAngleChart = () => {
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
//           parseNumber(row["DG Critical Angle"]) !== null &&
//           parseNumber(row["Elevation Profile Angle"]) !== null

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

//   const dgCriticalPoints = filteredData.map((row) => ({
//     x: parseNumber(row["Chainage (m)"]),
//     y1: parseNumber(row["DG Critical Angle"]),
//   })) .filter(point =>
//     !isNaN(point.x) &&
//     !isNaN(point.y) &&
//     point.x !== 0
//   );

//   // console.log("Pressure Points:", waterHoldUpPoints);
//   // console.log("Sample Pressure Points:", waterHoldUpPoints.slice(0, 10));

  
//   const elevationProfilePoints = filteredData.map((row) => ({
//     x: parseNumber(row["Chainage (m)"]),
//     y1: parseNumber(row["Elevation Profile Angle"]),
//   })) .filter(point =>
//     !isNaN(point.x) &&
//     !isNaN(point.y) &&
//     point.x !== 0
//   );

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
     
//        {
//        label: "DG Critical Angle",
//          data: dgCriticalPoints,
//          borderColor: "yellow",
//          backgroundColor: "yellow",
//          // borderDash: [5, 5],
//          yAxisID: "y2",
//          fill: false,
//          spanGaps: false,
//         pointRadius:4,
//          borderWidth: 0,
//          showLine: false,
//        },

//         {
//        label: "Elevation Profile Angle",
//          data: elevationProfilePoints,
//          borderColor: "red",
//          backgroundColor: "red",
//          // borderDash: [5, 5],
//          yAxisID: "y2",
//          fill: false,
//          spanGaps: false,
//         pointRadius:4,
//          borderWidth: 0,
//          showLine: false,
//        },
//     ],
//   };

//   const options = {
//     responsive: true,
//     interaction: { mode: "index", intersect: false },
//     stacked: false,
//     plugins: {
//       legend: { position: "top" },
//       title: { display: true, text: "Elevation & Inclination Angles vs Chainage" },
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
//         title: { display: true, text: "DG Critical Angle & Elevation Profile Angle" },
//       },
//     },
//   };

//   return (
//     <div style={{ maxWidth: '100%', margin: '21px auto', padding: '2rem', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
//       <h2>Inclination Angle</h2>
//       {Array.isArray(fileDataICE) && fileDataICE.length > 0 ? (
//         <Line data={data} options={options} />
//       ) : (
//         <p>No data available</p>
//       )}

//        {/* Button to show chunks */}

//        <div style={{ marginTop: '2rem', marginBottom: '1rem' }}>
//         <button style={{fontSize: '18px', cursor: 'pointer'}} onClick={() => {
//            const input = prompt('Enter chunk size in meters: ');
//            if (input && !isNaN(input)) {
//              window.open(`/rolledUp-chunks?chunk=${input}`, '_blank');
//            }
//          }}>
//            Show Section-wise Charts
//          </button>
//     </div>
//     </div>
//   );
// };

// export default InclinationAngleChart;


