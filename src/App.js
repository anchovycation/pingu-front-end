import './App.css';

function App() {
  return (
    <div className='App'>
    <div className='container'>
      <div className="row py-5">
        <div className="col-md-6 text">
          <h1>The best way to <span className='penguening'>penguening</span> with friends.</h1>
          <p className='info'>start watching a YouTube video now</p>
          <a href="/create-room" className='createRoomBtn'>Create a Room</a>
          <button type="button" class="btn btn-link joinBtn">Join a Room</button>  
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
