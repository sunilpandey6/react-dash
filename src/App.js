import './App.css';
import Line from './g';
import timeframe from './sort';

function App() {
  return (
    <div className="App">
      <Line />
      {/* <cils /> */}
      <div>
        <h1>React Line Chart Example</h1>
        <timeframe />
      </div>
    </div>
    
  );
}

export default App;
