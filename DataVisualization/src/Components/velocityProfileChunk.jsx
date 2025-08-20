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

const VelocityProfile_Chunk = () => {
  const { fileDataICE } = useContext(FileContext);
  const query = new URLSearchParams(useLocation().search);
  const chunkSize = parseInt(query.get('chunk') || '500');

  const filtered = fileDataICE.filter(
    (item) =>
      item['Chainage (m)'] &&
      item['Superficial gas velocity (ft/s)'] &&
      item['Superficial water velocity (ft/s)']&&
      item['Mixture velocity (ft/s)']&&
      item['Superficial Liquid Velocity  (Hydrocarbon) (ft/s)']&&
      item['Elevation (m)']&&
      !isNaN(item['Chainage (m)']) &&
      !isNaN(item['Superficial gas velocity (ft/s)'])&&
      !isNaN(item['Superficial water velocity (ft/s)'])&&
      !isNaN(item['Mixture velocity (ft/s)'])&&
      !isNaN(item['Superficial Liquid Velocity  (Hydrocarbon) (ft/s)'])&&
      !isNaN(item ['Elevation (m)'])
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
      const dataOn = chunk.map(item => Number(item['Superficial gas velocity (ft/s)']));
      const dataOff = chunk.map(item => Number(item['Superficial water velocity (ft/s)']));
      const elevationValues = chunk.map(item => Number(item['Elevation (m)']));
      const generalValues = chunk.map(item => Number(item['Mixture velocity (ft/s)']));
      const liquidVelocity = chunk.map(item => Number(item['Superficial Liquid Velocity  (Hydrocarbon) (ft/s)']))
  

      chunks.push({
        title: `${start}m - ${end}m`,
        data: {
          labels,
          datasets: [
            {
              label: 'Superficial gas velocity (ft/s)',
              data: dataOn,
              borderColor: 'yellow',
              backgroundColor: 'yellow',
              tension: 0.4,
              fill: false,
               pointRadius: 7,
        borderWidth: 0,
        showLine: false,
        yAxisID: 'y1',
            },
             {
              label: 'Superficial water velocity (ft/s)',
              data: dataOff,
              borderColor: '#1c95e6',
              backgroundColor: '#1c95e6',
              tension: 0.4,
              fill: false,
               pointRadius: 4,
        borderWidth: 0,
        showLine: false,
        yAxisID: 'y1',
            },

            {
              label: 'Superficial Liquid Velocity  (Hydrocarbon) (ft/s)',
              data: liquidVelocity,
              borderColor: '#24db0f',
              backgroundColor: '#24db0f',
              tension: 0.4,
              fill: false,
               pointRadius: 4,
        borderWidth: 0,
        showLine: false,
        yAxisID: 'y1',
            },
            {
              label: 'Mixture velocity (ft/s)',
              data: generalValues,
              borderColor: 'red',
              backgroundColor: 'red',
              tension: 0.4,
              fill: false,
              pointRadius: 4,
              borderWidth: 0,
              showLine: false,
              yAxisID: 'y1',
            },
        
             {
        label: `Elevation (m)`,
        data: elevationValues,
        fill: false,
        borderColor: 'black',
        backgroundColor: 'black',
        tension: 0.4,
        yAxisID: 'y',
        pointRadius: 0,
      },
          ],
        },
      });
    }
  }

  return (
    <div style = {{padding: '2rem'}}>
      <h2>Section-wise Charts of Velocity Profile for (Every {chunkSize}m)</h2>
      {chunks.map((chunk, i) => (
        <div key={i} style={{ marginBottom: '2rem' ,
           padding: '1rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              backgroundColor: '#fff'
        }}>
          <h3>{chunk.title}</h3>

          <Line data={chunk.data} options={{ responsive: true, plugins: { legend: { position: 'top' } },
        
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
              text: 'Elevation (m)'
            }
          },
          y1: {
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Velocity Profile', 
        },
        grid: {
          drawOnChartArea: false,  //avoids overlaps of grid lines
        },
      
      },
        }
        }} />
        </div>
      ))}
    </div>
  );
};

export default VelocityProfile_Chunk;

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

// const VelocityProfile_Chunk = () => {
//   const { fileDataICE } = useContext(FileContext);
//   const query = new URLSearchParams(useLocation().search);
//   const chunkSize = parseInt(query.get('chunk') || '500');

//   // Filter valid rows
//   const filtered = fileDataICE.filter(
//     (item) =>
//       item['Chainage (m)'] &&
//       item['Superficial gas velocity (ft/s)'] &&
//       item['Superficial water velocity (ft/s)'] &&
//       item['Mixture velocity (ft/s)'] &&
//       item['Elevation (m)'] &&
//       !isNaN(item['Chainage (m)']) &&
//       !isNaN(item['Superficial gas velocity (ft/s)']) &&
//       !isNaN(item['Superficial water velocity (ft/s)']) &&
//       !isNaN(item['Mixture velocity (ft/s)']) &&
//       !isNaN(item['Elevation (m)'])
//   );

//   const maxDist = Math.max(...filtered.map((row) => Number(row['Chainage (m)'])));
//   const chunks = [];

//   for (let start = 0; start < maxDist; start += chunkSize) {
//     const end = start + chunkSize;
//     const chunk = filtered.filter(
//       (row) =>
//         Number(row['Chainage (m)']) >= start && Number(row['Chainage (m)']) < end
//     );

//     if (chunk.length > 0) {
//       // Prepare clean numeric arrays
//       const labels = chunk.map((item) => Number(item['Chainage (m)']).toFixed(2));

//       const dataGas = chunk.map((item) => {
//         const val = Number(item['Superficial gas velocity (ft/s)']);
//         return isNaN(val) ? null : val;
//       });

//       const dataWater = chunk.map((item) => {
//         const val = Number(item['Superficial water velocity (ft/s)']);
//         return isNaN(val) ? null : val;
//       });

//       const dataMixture = chunk.map(item => ({
//   x: Number(item['Chainage (m)']),
//   y: Number(item['Mixture velocity (ft/s)'])
// }));

//       const elevationValues = chunk.map((item) => {
//         const val = Number(item['Elevation (m)']);
//         return isNaN(val) ? null : val;
//       });

//       chunks.push({
//         title: `${start}m - ${end}m`,
//         data: {
//           labels,
//           datasets: [
//             {
//               label: 'Superficial gas velocity (ft/s)',
//               data: dataGas,
//               borderColor: 'yellow',
//               backgroundColor: 'yellow',
//               tension: 0.4,
//               fill: false,
//               pointRadius: 7,
//               borderWidth: 0,
//               showLine: false,
//               yAxisID: 'y1',
//             },
//             {
//               label: 'Superficial water velocity (ft/s)',
//               data: dataWater,
//               borderColor: 'brown',
//               backgroundColor: 'brown',
//               tension: 0.4,
//               fill: false,
//               pointRadius: 4,
//               borderWidth: 0,
//               showLine: false,
//               yAxisID: 'y1',
//             },
//             {
//               label: 'Mixture velocity (ft/s)',
//               data: dataMixture,
//               borderColor: 'red',
//               backgroundColor: 'red',
//               tension: 0.4,
//               fill: false,
//               pointRadius: 4,
//               borderWidth: 0,
//               showLine: false,
//               yAxisID: 'y1',
//             },
//             {
//               label: 'Elevation (m)',
//               data: elevationValues,
//               fill: false,
//               borderColor: 'black',
//               backgroundColor: 'black',
//               tension: 0.4,
//               yAxisID: 'y',
//               pointRadius: 0,
//             },
//           ],
//         },
//       });
//     }
//   }

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Section-wise Charts of Velocity Profile (Every {chunkSize}m)</h2>
//       {chunks.map((chunk, i) => (
//         <div
//           key={i}
//           style={{
//             marginBottom: '2rem',
//             padding: '1rem',
//             border: '1px solid #ccc',
//             borderRadius: '8px',
//             boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
//             backgroundColor: '#fff',
//           }}
//         >
//           <h3>{chunk.title}</h3>
//           <Line
//             data={chunk.data}
//             options={{
//               responsive: true,
//               plugins: { legend: { position: 'top' } },
//               scales: {
//                 x: {
//                   title: { display: true, text: 'Chainage (m)' },
//                 },
//                 y: {
//                   title: { display: true, text: 'Elevation (m)' },
//                 },
//                 y1: {
//                   display: true,
//                   position: 'right',
//                   title: { display: true, text: 'Velocity Profile (ft/s)' },
//                   grid: { drawOnChartArea: false },
//                 },
//               },
//             }}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default VelocityProfile_Chunk;
