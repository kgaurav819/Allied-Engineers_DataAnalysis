import React, { useContext } from 'react';
import { FileContext } from './FileContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import {useNavigate} from 'react-router-dom';

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

const VelocityProfile = () => {
  const { fileDataICE } = useContext(FileContext);
   const navigate = useNavigate();

  const xKey = 'Chainage (m)';
  const yKey1 = 'Mixture velocity (ft/s)';
  const yKey2 = 'Superficial gas velocity (ft/s)';
  const yKey3 = 'Elevation (m)';
  const yKey4 = 'Superficial water velocity (ft/s)';
  const yKey5 = 'Superficial Liquid Velocity  (Hydrocarbon) (ft/s)'
  

  // Clean and trim column headers (just in case)
  const cleanData = fileDataICE.map(row => {
    const cleaned = {};
    Object.keys(row).forEach(key => {
      cleaned[key.trim()] = row[key];
    });
    return cleaned;
  });

  // Filter out invalid data and sort by chainage
  const validData = cleanData.filter(row => 
    row[xKey] && 
    !isNaN(Number(row[xKey])) &&
    row[yKey1] && 
    row[yKey2] && 
    row[yKey3] &&
    row[yKey5]
  ).sort((a, b) => Number(a[xKey]) - Number(b[xKey]));

  const labels = validData.map((row) => Number(row[xKey]).toFixed(2));
  const mixtureVelocity = validData.map((row) => Number(row[yKey1]));
  const gasVelocity = validData.map((row) => Number(row[yKey2]));
  const elevationValues = validData.map((row) => Number(row[yKey3]));
  const waterVelocity = validData.map((row) => Number(row[yKey4]));
  const liquidVelocity = validData.map((row) => Number(row[yKey5]));
  
  const chartData = {
    labels,
    datasets: [
      
      {
        label: `${yKey1}`,
        data: mixtureVelocity,
        fill: false,
        borderColor: 'red',
        backgroundColor: 'red',
         pointRadius: 2,
        borderWidth: 0,
        showLine: false,
        tension: 0.4,
        yAxisID: 'y1',
        
      },

       {
        label: `${yKey2}`,
        data: gasVelocity,
        fill: false,
        borderColor: 'yellow',
        backgroundColor: 'yellow',
        tension: 0.4,
         pointRadius: 7,
        borderWidth: 0,
        showLine: false,
        yAxisID: 'y1',
      },
      {
        label: `${yKey4}`,
        data: waterVelocity,
        fill: false,
        borderColor: '#1c95e6',
        backgroundColor: '#1c95e6',
        tension: 0.4,
         pointRadius: 4,
        borderWidth: 0,
        showLine: false,
        yAxisID: 'y1',
      },
      {
        label: `${yKey5}`,
        data: liquidVelocity,
        fill: false,
        borderColor: '#24db0f',
        backgroundColor: '#24db0f',
        tension: 0.4,
        pointRadius: 4,
        borderWidth: 0,
        showLine: false,
        yAxisID: 'y1',
      },
       
       {
        label: `${yKey3}`,
        data: elevationValues,
        fill: false,
        borderColor: 'black',
        backgroundColor: 'black',
        tension: 0.4,
        yAxisID: 'y',
        pointRadius: 0,
      },
  
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Elevation & Velocity Profile`,
      },
      legend: {
        display: true,
      },
    },

    scales: {
      x: {
        title: {
          display: true,
          text: 'Chainage (m)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Elevation (m)',
        },
      },
      y1: {
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Velocity Profile', //HL
        },
        grid: {
          drawOnChartArea: false,  //avoids overlaps of grid lines
        },
      },
    },
  };

  return(
    <div style = {{ maxWidth: '100%',
      margin: '21px auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
    }}>

      <h2>Velocity Profile</h2>
     {fileDataICE.length > 0 ? <Line data={chartData} options={options} /> : null}

      {/* Button to show chunks */}

      <div style={{ marginTop: '2rem', marginBottom: '1rem' }}>
        <button style={{fontSize: '18px', cursor: 'pointer'}} onClick={() => {
          const input = prompt('Enter chunk size in meters: ');
          if (input && !isNaN(input)) {
            window.open(`/velocityProfile-chunks?chunk=${input}`, '_blank');
          }
        }}>
          Show Section-wise Charts
        </button>
      </div>
     </div>
  );
};

export default VelocityProfile;
