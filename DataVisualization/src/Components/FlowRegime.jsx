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

const FlowRegime = () => {
  const { fileDataICE } = useContext(FileContext);

  const parseNumber = (val) => {
    if (val === undefined || val === null) return null;
    let cleaned = val.toString().trim().replace(/,/g, "");
    let num = Number(cleaned);
    return isNaN(num) ? null : num;
  };

  console.log("File Data ICE:", fileDataICE); // Log the data structure
  const filteredData = Array.isArray(fileDataICE)
    ? fileDataICE.filter(
        (row) =>
          parseNumber(row["Chainage (m)"]) !== null &&
          parseNumber(row["Elevation (m)"]) !== null &&
          parseNumber(row["Flow regime"]) !== null
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

  const flowRegimePoints = filteredData.map((row) => ({
    x: parseNumber(row["Chainage (m)"]),
    y: parseNumber(row["Flow regime"]),
  })) .filter(point =>
    !isNaN(point.x) &&
    !isNaN(point.y) &&
    point.x !== 0
  );

  // const flowRegimePoints = filteredData
  // .map((row) => {
  //   const chainage = parseNumber(row["Chainage (m)"]);
  //   const flowRegimeValue = parseNumber(row["Flow regime"]);

  //   if (flowRegimeValue === 2) {
  //     return [
  //       { x: chainage, y: 2 },
  //       { x: chainage + 1, y: 2.5 }, // Interpolated point
  //     ];
  //   } else if (flowRegimeValue === 3) {
  //     return [
  //       { x: chainage, y: 3 },
  //       { x: chainage - 1, y: 2.5 }, // Interpolated point
  //     ];
  //   }

  //   return { x: chainage, y: flowRegimeValue };
  // })
  // .flat() // nested arrays ko flatten karne ke liye
  // .filter(
  //   (point) =>
  //     !isNaN(point.x) &&
  //     !isNaN(point.y) &&
  //     point.x !== 0 // 0 chainage skip
  // );


  console.log("Pressure Points:", flowRegimePoints);
  console.log("Sample Pressure Points:", flowRegimePoints.slice(0, 10));

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
        label: "Flow regime",
        data: flowRegimePoints,
        borderColor: "red",
        backgroundColor: "red",
        borderDash: [5, 5],
        yAxisID: "y2",
        fill: false,
        spanGaps: false,
        pointRadius: 4,
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
      title: { display: true, text: "Elevation & Flow Regime vs Chainage" },
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
        title: { display: true, text: "Flow Regime" },
        min: 1.8,
        max: 3.4,
      },
    },
  };

  return (
    <div style={{ maxWidth: '100%', margin: '21px auto', padding: '2rem', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
      <h2>Flow Regime</h2>
      {Array.isArray(fileDataICE) && fileDataICE.length > 0 ? (
        <Line data={data} options={options} />
      ) : (
        <p>No data available</p>
      )}

      {/* Button to show chunks */}
      <div style={{ marginTop: "2rem", marginBottom: "1rem" }}>
        <button
          style={{ fontSize: "18px", cursor: "pointer" }}
          onClick={() => {
            const input = prompt("Enter chunk size in meters: ");
            if (input && !isNaN(input)) {
              window.open(`/flowregime-chunks?chunk=${input}`, "_blank");
            }
          }}
        >
          Show Section-wise Charts
        </button>
      </div>

    </div>
  );
};

export default FlowRegime;


