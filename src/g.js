import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';
import d2 from './D2.csv'
function LineChart() {
  const [data, setData] = useState({ x: [], y: [] });
  // const [layout, setLayout] = useState({});

  useEffect(() => {
    // Load data from CSV using PapaParse
    Papa.parse(d2, {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: function(results) {
        
        const { data } = results;
        const x = data.map((row) => row.time);
        console.log(x)
        const y = data.map((row) => row.close);
        console.log(y)
        setData({ x, y });//NIFTY19JUN5000CE
        
      },
    });
  }, []);

  return (
    <div>
      <h1>Line Chart</h1>
      <Plot
        data={[
          {
            x: data.x,
            y: data.y,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' },
          },
        ]}
        layout={{
          title: 'Line Chart from CSV',
          xaxis: { 
            title: 'Time',
            type: 'date'  ,
            tickformat: '%H:%M:%S',},
          yaxis: { title: 'Value' },
        }}
        style={{ width: '100%', height: '500px' }}
      />
    </div>
  );
}

export default LineChart;
