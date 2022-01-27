import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>App</h1>
      <Link to='/about'>about</Link>
    </div>
  );
}

export default App;
