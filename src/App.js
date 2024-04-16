import logo from './logo.svg';
import './App.css';

import Calculator from './components/Calculator'; // Import the Calculator component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Calculator</h1>
      </header>
      <Calculator />  
    </div>
  );
}

export default App;
