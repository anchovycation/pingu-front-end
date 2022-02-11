import './WatchingRoom.scss';

function WatchingRoomPage() {
  return (
    <div className='watching-room container'>
      <div className='row container'>
        <div className="col header">
          <h2><span className='orange-text'>She's Your Lobster </span></h2>
        </div>
      </div>
      <div className='row'>
        <div className='col-8'>
        <div className="ratio ratio-16x9">
        <iframe src="https://www.youtube.com/embed/K05-DOiXnF0" allowfullscreen></iframe>
        </div>
        </div>
        <div className='col-3 chat'>chat</div>
      </div>
      <div className='row'>
        <div className='col-8 cameras'>cameras</div>
        <div className='col-3 control-panel'>control panel</div>
      </div>
  </div>
  );
}

export default WatchingRoomPage;