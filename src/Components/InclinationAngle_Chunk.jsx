// import React, { useContext } from 'react';
// import { FileContext } from './FileContext';
// import { useLocation } from 'react-router-dom';
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

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const InclinationAngle_Chunks = () => {
//   const { fileDataICE } = useContext(FileContext);
//   const query = new URLSearchParams(useLocation().search);
//   const chunkSize = parseInt(query.get('chunk') || '500');

//   const filtered = fileDataICE.filter(
//     (item) =>
//       item['Chainage (m)'] &&
//       item['Elevation (m)'] &&
//       item['DG critical angle']&&
//       item['Elevation profile angle']&&
//       !isNaN(item['Chainage (m)']) &&
//       !isNaN(item['Elevation (m)'])&&
//       !isNaN(item['DG critical angle'])&&
//       !isNaN(item['Elevation profile angle'])
//   );

//   const maxDist = Math.max(...filtered.map(row => Number(row['Chainage (m)'])));
//   const chunks = [];

//   for (let start = 0; start < maxDist; start += chunkSize) {
//     const end = start + chunkSize;
//     const chunk = filtered.filter(row =>
//       Number(row['Chainage (m)']) >= start &&
//       Number(row['Chainage (m)']) < end
//     );

//     if (chunk.length > 0) {
//       const labels = chunk.map(item => Number(item['Chainage (m)']).toFixed(2));
//       const dataOn = chunk.map(item => Number(item['Elevation (m)']));
//       const dataOff = chunk.map(item => Number(item['DG critical angle']));
//       const elevationAnglePoints = chunk.map(item => Number(item['Elevation profile angle']));

//       chunks.push({
//         title: `${start}m - ${end}m`,
//         data: {
//           labels,
//           datasets: [
//             {
//               label: 'Elevation (m)',
//               data: dataOn,
//               borderColor: 'rgba(1, 6, 6, 1)',
//               backgroundColor: 'rgba(1, 6, 6, 1)',
//               tension: 0.4,
//               fill: false,
//               yAxisID: 'y',  //Primary Y-Axis
//               pointRadius:0,
//             },
//              {
//               label: 'DG critical angle',
//               data: dataOff,
//               borderColor: '#24db0f',
//               backgroundColor: '#24db0f',
//               tension: 0.4,
//               fill: false,
//               yAxisID: 'y1', //Secondary Y-Axis
//                pointRadius: 4,
//         borderWidth: 0,
//          showLine: false,
//             },
//             {
//               label: 'Elevation profile angle',
//               data: elevationAnglePoints,
//               borderColor: 'red',
//               backgroundColor: 'red',
//               tension: 0.4,
//               fill: false,
//               yAxisID: 'y1', //Secondary Y-Axis
//                pointRadius: 4,
//         borderWidth: 0,
//          showLine: false,
//             },
        
//           ],
//         },
//         options: {
//           responsive: true,
//           plugin: {
//             legend:{
//               position: 'top',
//             },
//             title: {
//               display: true,
//               text: `Elevation & Inclination Angles vs Chainage (${start}m - ${end}m)`
//             },
//           },
//           scales: {
//             x: {
//               title: {
//                 display: true,
//                 text: 'Chainage (m)',
//               },
//             },
//             y: {
//               type: 'linear',
//               display: true,
//               position: 'left',
//               title: {
//                 display: true,
//                 text: 'Elevation (m)',
//               },
//             },
//             y1: {
//               type: 'linear',
//               display: true,
//               position: 'right',
//               title: {
//                 display: true,
//                 text: 'DG Critical Angle & Elevation Profile Angle',
//               },
//               grid: {
//                 drawOnChartArea: false,
//               },
//             },
//           },
//         },
//       });
//     }
//   }

//   return (
//     <div style={{padding : '2rem'}}>
//       <h2>Section-wise Charts of Inclination Angle for (Every {chunkSize}m)</h2>
//       {chunks.map((chunk, i) => (
//         <div key={i} style={{ marginBottom: '2rem',
           
//               border: '1px solid #ccc',
//               borderRadius: '8px',
//               boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
//               backgroundColor: '#fff'
//          }}>
//           <h3>{chunk.title}</h3>
//           <Line data={chunk.data} options={chunk.options} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default InclinationAngle_Chunks;


import React, { useContext } from 'react';
import { FileContext } from './FileContext';
import { useLocation } from 'react-router-dom';
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const InclinationAngle_Chunks = () => {
  const { fileDataICE } = useContext(FileContext);
  const query = new URLSearchParams(useLocation().search);
  const chunkSize = parseInt(query.get('chunk') || '500');

  const filtered = fileDataICE.filter(
    (item) =>
      item['Chainage (m)'] &&
      item['Elevation (m)'] &&
      item['DG critical angle']&&
      item['Elevation profile angle']&&
      !isNaN(item['Chainage (m)']) &&
      !isNaN(item['Elevation (m)'])&&
      !isNaN(item['DG critical angle'])&&
      !isNaN(item['Elevation profile angle'])
  );

  const maxDist = Math.max(...filtered.map(row => Number(row['Chainage (m)'])));
  const chunks = [];

  for (let start = 0; start < maxDist; start += chunkSize) {
    const end = start + chunkSize;
    const chunk = filtered.filter(row =>
      Number(row['Chainage (m)']) >= start &&
      Number(row['Chainage (m)']) < end
    );

    if (chunk.length > 0) {
      const labels = chunk.map(item => Number(item['Chainage (m)']).toFixed(2));
      const dataOn = chunk.map(item => Number(item['Elevation (m)']));
      const dataOff = chunk.map(item => Number(item['DG critical angle']));
      const elevationAnglePoints = chunk.map(item => Number(item['Elevation profile angle']));

      chunks.push({
        title: `${start}m - ${end}m`,
        data: {
          labels,
          datasets: [
            {
              label: 'Elevation (m)',
              data: dataOn,
              borderColor: 'rgba(1, 6, 6, 1)',
              backgroundColor: 'rgba(1, 6, 6, 1)',
              tension: 0.4,
              fill: false,
              yAxisID: 'y',  //Primary Y-Axis
              pointRadius:0,
            },
             {
              label: 'DG critical angle',
              data: dataOff,
              borderColor: '#24db0f',
              backgroundColor: '#24db0f',
              tension: 0.4,
              fill: false,
              yAxisID: 'y1', //Secondary Y-Axis
               pointRadius: 4,
        borderWidth: 0,
         showLine: false,
            },
            {
              label: 'Elevation profile angle',
              data: elevationAnglePoints,
              borderColor: 'red',
              backgroundColor: 'red',
              tension: 0.4,
              fill: false,
              yAxisID: 'y1', //Secondary Y-Axis
               pointRadius: 4,
        borderWidth: 0,
         showLine: false,
            },
        
          ],
        },
        options: {
          responsive: true,
          plugin: {
            legend:{
              position: 'top',
            },
            title: {
              display: true,
              text: `Elevation & Inclination Angles vs Chainage (${start}m - ${end}m)`
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
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'Elevation (m)',
              },
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              title: {
                display: true,
                text: 'DG Critical Angle & Elevation Profile Angle',
              },
              grid: {
                drawOnChartArea: false,
              },
            },
          },
        },
      });
    }
  }

  return (
    <div style={{padding : '2rem'}}>
      <h2>Section-wise Charts of Inclination Angle for (Every {chunkSize}m)</h2>
      {chunks.map((chunk, i) => (
        <div key={i} style={{ marginBottom: '2rem',
           
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              backgroundColor: '#fff'
         }}>
          <h3>{chunk.title}</h3>
          <Line data={chunk.data} options={chunk.options} />
        </div>
      ))}
    </div>
  );
};

export default InclinationAngle_Chunks;


