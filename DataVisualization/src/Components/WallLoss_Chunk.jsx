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

// const WallLoss_Chunk = () => {
//   const { fileDataICE } = useContext(FileContext);
//   console.log('WallLoss_Chunk fileDataICE:', fileDataICE);
//   const query = new URLSearchParams(useLocation().search);
//   const chunkSize = parseInt(query.get('chunk') || '500');

//   console.log('Chunk Size:', chunkSize);
//   console.log('fileDataICE first row keys:', fileDataICE.length > 0 ? Object.keys(fileDataICE[0]) : 'No data');

//   const filtered = fileDataICE.filter(
//     (item) => {
//       const chainageStr = item['Chainage (m)'] ? item['Chainage (m)'].toString().trim() : '';
// const hasChainage = chainageStr !== '' && !isNaN(chainageStr); 
// console.log('Chainage:', chainageStr, 'Has Chainage:', hasChainage);
// const rawWorst = item['%Wall Loss - Worst'];
// console.log('Raw Worst Value:', rawWorst);
// console.log('Raw Worst Value:', rawWorst);
// const hasWorst = rawWorst !== undefined && !isNaN(Number(rawWorst.replace('%', '').trim()));
// console.log('%Wall Loss - Worst Raw Value:', rawWorst, 'Parsed Value:', Number(rawWorst.replace('%', '').trim()), 'Has Worst:', hasWorst);
// const hasRealistic = item['%Wall Loss - Realistic'] !== undefined && !isNaN(Number(item['%Wall Loss - Realistic'].replace('%', '').trim()));
// const hasGeneral = item['%Wall Loss -  General'] !== undefined && !isNaN(Number(item['%Wall Loss -  General'].replace('%', '').trim()));
// const hasMIC = item['%Wall Loss - MIC'] !== undefined && !isNaN(Number(item['%Wall Loss - MIC'].replace('%', '').trim()));
// console.log('%Wall Loss - Worst:', item['%Wall Loss - Worst'], 'Has Worst:', hasWorst);
// console.log('%Wall Loss - Realistic:', item['%Wall Loss - Realistic'], 'Has Realistic:', hasRealistic);
// console.log('%Wall Loss - General:', item['%Wall Loss -  General'], 'Has General:', hasGeneral);
// console.log('%Wall Loss - MIC:', item['%Wall Loss - MIC'], 'Has MIC:', hasMIC);
// console.log('%Wall Loss - Worst:', item['%Wall Loss - Worst'], 'Has Worst:', hasWorst);
// console.log('%Wall Loss - Worst:', item['%Wall Loss - Worst'], 'Has Worst:', hasWorst);
//       return hasChainage && hasWorst;
//     }
//   );

//   console.log('Filtered data length:', filtered.length);
//   console.log('Sample Chainage values:', filtered.slice(0, 10).map(row => row['Chainage (m)'] ? row['Chainage (m)'].toString().trim() : ''));

//   const maxDist = Math.max(...filtered.map(row => Number(row['Chainage (m)'].toString().trim())));
//   console.log('Max Distance:', maxDist);

//   const chunks = [];

//   for (let start = 0; start < maxDist; start += chunkSize) {
//     const end = start + chunkSize;
//     const chunk = filtered.filter(row =>
//       Number(row['Chainage (m)']) >= start &&
//       Number(row['Chainage (m)']) < end
//     );

//     console.log(`Chunk ${start}m - ${end}m: ${chunk.length} items`);

//     if (chunk.length > 0) {
//       const labels = chunk.map(item => Number(item['Chainage (m)']).toFixed(2));
// const dataOn = chunk.map(item => {
//   const value = Number(item['%Wall Loss - Worst']);
//   console.log('Data On Value:', value);
//   return value;
// });
//       const dataOff = chunk.map(item => Number(item['%Wall Loss - Realistic']));
//       const elevationValues = chunk.map(item => Number(item['Elevation (m)']));
//       const generalValues = chunk.map(item => Number(item['%Wall Loss -  General']));
//       const micValues = chunk.map(item => Number(item['%Wall Loss - MIC']));
//       const o2Values = chunk.map(item => Number(item['%Wall Loss - O2']));

//       chunks.push({
//         title: `${start}m - ${end}m`,
//         data: {
//           labels,
//           datasets: [
//             {
//               label: '%Wall Loss - Worst',
//               data: dataOn,
//               borderColor: 'green',
//               backgroundColor: 'green',
//               tension: 0.4,
//               fill: false,
//               pointRadius: 4,
//               borderWidth: 0,
//               showLine: false,
//             },
//             {
//               label: '%Wall Loss - Realistic',
//               data: dataOff,
//               borderColor: 'yellow',
//               backgroundColor: 'yellow',
//               tension: 0.4,
//               fill: false,
//               pointRadius: 4,
//               borderWidth: 0,
//               showLine: false,
//             },
//             {
//               label: '%Wall Loss -  General',
//               data: generalValues,
//               borderColor: 'pink',
//               backgroundColor: 'pink',
//               tension: 0.4,
//               fill: false,
//               pointRadius: 4,
//               borderWidth: 0,
//               showLine: false,
//             },
//             {
//               label: '%Wall Loss - MIC',
//               data: micValues,
//               borderColor: 'magenta',
//               backgroundColor: 'magenta',
//               tension: 0.4,
//               fill: false,
//               pointRadius: 4,
//               borderWidth: 0,
//               showLine: false,
//             },
//             {
//               label: '%Wall Loss - O2',
//               data: o2Values,
//               borderColor: 'brown',
//               backgroundColor: 'brown',
//               tension: 0.4,
//               fill: false,
//               pointRadius: 4,
//               borderWidth: 0,
//               showLine: false,
//             },
//             {
//               label: `Elevation (m)`,
//               data: elevationValues,
//               fill: false,
//               borderColor: 'black',
//               backgroundColor: 'black',
//               tension: 0.4,
//               yAxisID: 'y1',
//               pointRadius: 0,
//             },
//           ],
//         },
//       });
//     }
//   }

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Section-wise Charts of %Wall Loss for (Every {chunkSize}m)</h2>
//       {chunks.map((chunk, i) => (
//         <div key={i} style={{
//           marginBottom: '2rem',
//           padding: '1rem',
//           border: '1px solid #ccc',
//           borderRadius: '8px',
//           boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
//           backgroundColor: '#fff'
//         }}>
//           <h3>{chunk.title}</h3>

//           <Line data={chunk.data} options={{
//             responsive: true,
//             plugins: { legend: { position: 'top' } },
//             scales: {
//               x: {
//                 title: {
//                   display: true,
//                   text: 'Chainage (m)',
//                 },
//               },
//               y: {
//                 title: {
//                   display: true,
//                   text: '%Wall Loss'
//                 }
//               },
//               y1: {
//                 display: true,
//                 position: 'right',
//                 title: {
//                   display: true,
//                   text: 'Elevation (m)',
//                 },
//                 grid: {
//                   drawOnChartArea: false,
//                 },
//               },
//             }
//           }} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default WallLoss_Chunk;

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

const WallLoss_Chunk = () => {
  const { fileDataICE } = useContext(FileContext);
  console.log('WallLoss_Chunk fileDataICE:', fileDataICE);

  const query = new URLSearchParams(useLocation().search);
  const chunkSize = parseInt(query.get('chunk') || '500');

  console.log('Chunk Size:', chunkSize);
  console.log(
    'fileDataICE first row keys:',
    fileDataICE.length > 0 ? Object.keys(fileDataICE[0]) : 'No data'
  );

  // 🔹 Helper: parse numbers and handle % strings
  const parsePercent = (value) => {
    if (value == null) return null;
    if (typeof value === 'string') {
      return parseFloat(value.replace('%', '').trim());
    }
    return Number(value);
  };

  // 🔹 Normalize keys (trim column names)
  const cleanData = fileDataICE.map((row) => {
    const cleaned = {};
    Object.keys(row).forEach((key) => {
      cleaned[key.trim()] = row[key];
    });
    return cleaned;
  });

  const filtered = cleanData.filter((item) => {
    const chainageStr = item['Chainage (m)']
      ? item['Chainage (m)'].toString().trim()
      : '';
    const hasChainage = chainageStr !== '' && !isNaN(chainageStr);

    const hasWorst =
      item['%Wall Loss - Worst'] !== undefined &&
      !isNaN(parsePercent(item['%Wall Loss - Worst']));

    return hasChainage && hasWorst;
  });

  console.log('Filtered data length:', filtered.length);

  const maxDist = Math.max(
    ...filtered.map((row) => Number(row['Chainage (m)'].toString().trim()))
  );

  console.log('Max Distance:', maxDist);

  const chunks = [];

  for (let start = 0; start < maxDist; start += chunkSize) {
    const end = start + chunkSize;
    const chunk = filtered.filter(
      (row) =>
        Number(row['Chainage (m)']) >= start &&
        Number(row['Chainage (m)']) < end
    );

    if (chunk.length > 0) {
      const labels = chunk.map((item) =>
        Number(item['Chainage (m)']).toFixed(2)
      );

      // 🔹 Use parsePercent for all wall loss values
      const dataWorst = chunk.map((item) =>
        parsePercent(item['%Wall Loss - Worst'])
      );
      const dataRealistic = chunk.map((item) =>
        parsePercent(item['%Wall Loss - Realistic'])
      );
      const dataGeneral = chunk.map((item) =>
        parsePercent(item['%Wall Loss -  General'])
      );
     
    const dataMIC = chunk.map((item) =>
  parsePercent(item['%Wall Loss -  MIC']) // <-- double space!
    );

      console.log("Available Keys after cleaning:", Object.keys(cleanData[0] || {}));

      const dataO2 = chunk.map((item) =>
        parsePercent(item['%Wall Loss -  O2'])
      ); // ⚠️ double space before O2 → check CSV
      const elevationValues = chunk.map((item) =>
        Number(item['Elevation (m)'])
      );

      chunks.push({
        title: `${start}m - ${end}m`,
        data: {
          labels,
          datasets: [
            {
              label: '%Wall Loss - Worst',
              data: dataWorst,
              borderColor: 'green',
              backgroundColor: 'green',
              tension: 0.4,
              fill: false,
              pointRadius: 4,
              borderWidth: 0,
              showLine: false,
            },
            {
              label: '%Wall Loss - Realistic',
              data: dataRealistic,
              borderColor: 'orange', // 🔹 visible instead of yellow
              backgroundColor: 'orange',
              tension: 0.4,
              fill: false,
              pointRadius: 4,
              borderWidth: 2,
              showLine: true,
            },
            {
              label: '%Wall Loss - General',
              data: dataGeneral,
              borderColor: 'pink',
              backgroundColor: 'pink',
              tension: 0.4,
              fill: false,
              pointRadius: 4,
              borderWidth: 0,
              showLine: false,
            },
            {
              label: '%Wall Loss - MIC',
              data: dataMIC,
              borderColor: 'magenta',
              backgroundColor: 'magenta',
              tension: 0.4,
              fill: false,
              pointRadius: 4,
              borderWidth: 0,
              showLine: false,
            },
            {
              label: '%Wall Loss - O2',
              data: dataO2,
              borderColor: 'red',
              backgroundColor: 'red',
              tension: 0.4,
              fill: false,
              pointRadius: 4,
              borderWidth: 0,
              showLine: false,
            },
            {
              label: 'Elevation (m)',
              data: elevationValues,
              fill: false,
              borderColor: 'black',
              backgroundColor: 'black',
              tension: 0.4,
              yAxisID: 'y1',
              pointRadius: 0,
            },
          ],
        },
      });
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Section-wise Charts of %Wall Loss (Every {chunkSize}m)</h2>
      {chunks.map((chunk, i) => (
        <div
          key={i}
          style={{
            marginBottom: '2rem',
            padding: '1rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            backgroundColor: '#fff',
          }}
        >
          <h3>{chunk.title}</h3>

          <Line
            data={chunk.data}
            options={{
              responsive: true,
              plugins: { legend: { position: 'top' } },
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
                    text: '%Wall Loss',
                  },
                },
                y1: {
                  display: true,
                  position: 'right',
                  title: {
                    display: true,
                    text: 'Elevation (m)',
                  },
                  grid: {
                    drawOnChartArea: false,
                  },
                },
              },
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default WallLoss_Chunk;
