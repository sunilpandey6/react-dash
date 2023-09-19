import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const RealTimePlot = () => {
  const [data, setData] = useState({ x: [], y: [] });

  useEffect(() => {
    const socket = new WebSocket('ws://your_server_address/ws/realtime_data/'); // Replace with your server address

    socket.onmessage = (event) => {
      const jsonData = JSON.parse(event.data);
      const newTimestamp = jsonData.timestamp;
      const newValue = jsonData.value;

      setData((prevData) => ({
        x: [...prevData.x, newTimestamp],
        y: [...prevData.y, newValue],
      }));
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h1>Real-Time Data Plot</h1>
      <Plot
        data={[
          {
            x: data.x,
            y: data.y,
            type: 'scatter',
            mode: 'lines',
            marker: { color: 'blue' },
            name: 'Real-Time Data',
          },
        ]}
        layout={{
          title: 'Real-Time Data Plot',
          xaxis: { title: 'Timestamp' },
          yaxis: { title: 'Value' },
        }}
        config={{ responsive: true }}
        style={{ width: '100%', height: '400px' }}
      />
    </div>
  );
};

export default RealTimePlot;
