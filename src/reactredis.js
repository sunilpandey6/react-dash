import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import Redis from 'ioredis';

const RealTimePlot = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Create a Redis client and subscribe to a channel
    const redisClient = new Redis();
    redisClient.subscribe('realtime_data');

    // Handle incoming messages from the channel
    redisClient.on('message', (channel, message) => {
      try {
        // Assuming your data is in JSON format
        const newData = JSON.parse(message);

        // Append the new data to the existing data
        setData((prevData) => [...prevData, newData]);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    });

    return () => {
      // Unsubscribe and close the Redis connection when the component unmounts
      redisClient.unsubscribe('realtime_data');
      redisClient.quit();
    };
  }, []);

  return (
    <div>
      <h1>Real-Time Plot</h1>
      <Plot
        data={[
          {
            x: data.map((item) => item.timestamp), // Replace with your timestamp field
            y: data.map((item) => item.value), // Replace with your value field
            type: 'scatter',
            mode: 'lines',
            name: 'Real-Time Data',
          },
        ]}
        layout={{
          title: 'Real-Time Data Plot',
          xaxis: {
            title: 'Timestamp',
          },
          yaxis: {
            title: 'Value',
          },
        }}
        config={{ responsive: true }}
        style={{ width: '100%', height: '500px' }}
      />
    </div>
  );
};

export default RealTimePlot;
