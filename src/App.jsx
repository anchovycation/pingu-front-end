import { Link } from 'react-router-dom';

import './App.scss';

function App() {
  return (
    <div className='App'>
    <div className='container'>
      <div className="row py-5">
        <div className="col-md-6 text">
          <h1>The best way to <span className='orange-text'>penguening</span> with<br/> friends.</h1>
          <p className='info'>start watching a YouTube video now</p>
          <Link to="/create-room" className='primary-btn'>Create a Room</Link>
          <button type="button" className="btn btn-link join-btn">Join a Room</button>  
        </div>
        <div className="col-md-6">
          <img src="/pingu.png" alt="pingu" className='img-fluid' width="500px" height="500px"/>
        </div>
      </div>
    </div> 
  </div>
  );
}

export default App;
