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

const TemperatureDrop = () => {
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
          parseNumber(row["Temperature change"]) !== null
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

  const temperatureDropPoints = filteredData.map((row) => ({
    x: parseNumber(row["Chainage (m)"]),
    y: parseNumber(row["Temperature change"]),
  })) .filter(point =>
    !isNaN(point.x) &&
    !isNaN(point.y) &&
    point.x !== 0
  );

  console.log("Pressure Points:", temperatureDropPoints);
  console.log("Sample Pressure Points:", temperatureDropPoints.slice(0, 10));

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
        tension: 0.4,
        pointRadius: 0,
        // borderWidth: 2,
      },
      {
        label: "Temperature change",
        data: temperatureDropPoints,
        borderColor: "#24db0f",
        backgroundColor: "#24db0f",
        // borderDash: [5, 5],
        yAxisID: "y2",
        fill: false,
        spanGaps: false,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: { mode: "index", intersect: false },
    stacked: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Elevation & Temperature Drop vs Chainage" },
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
        title: { display: true, text: "Temperature Drop" },
      },
    },
  };

  return (
    <div style={{ maxWidth: '100%', margin: '21px auto', padding: '2rem', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
      <h2>Temperature Drop</h2>
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
             window.open(`/temperatureDrop-chunks?chunk=${input}`, '_blank');
           }
         }}>
           Show Section-wise Charts
         </button>
    </div>
    </div>
  );
};

export default TemperatureDrop;


