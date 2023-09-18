import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import Papa from 'papaparse';

function StockMarketChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Load and parse the CSV data
    Papa.parse('./D2.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        const csvData = result.data;

        // Extract time and close values
        const time = csvData.map((row) => row.time);
        const close = csvData.map((row) => row.close);

        // Create a Plotly trace for the chart
        const trace = {
          x: time,
          y: close,
          type: 'scatter',
          mode: 'lines',
          name: 'Close Price',
        };

        setData([trace]);
      },
    });
  }, []);

  return (
    <div>
      <h1>Stock Market Chart</h1>
      <Plot
        data={data}
        layout={{
          title: 'Stock Market Chart',
          xaxis: {
            title: 'Time',
            type: 'category', // Treat time as categorical data
            tickmode: 'auto',
          },
          yaxis: {
            title: 'Close Price',
          },
        }}
        config={{ responsive: true }}
        style={{ width: '100%', height: '500px' }}
      />
    </div>
  );
}

export default StockMarketChart;
