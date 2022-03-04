import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";

import Chat from "../../Components/Chat/Chat";
import './WatchingRoom.scss';

function WatchingRoomPage() {
  const { state } = useLocation();
  (() => {
    if (!state) {
      // Parametre olarak gelen oda ve kullanıcı değerleri olmadığında kullanıcı oda bulunamadı sayfasına yönlendirilmeli.
      window.location.replace('/');
    }
  })()
  const [room, setRoom] = useState(state.room);
  const [user, setUser] = useState(state.user);
  const [socket, setSocket] = useState(null);
  const roomId = room.id;

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_PATH, { transports: ['websocket'] });
    setSocket(newSocket);

    newSocket.emit('join-room', { roomId });

    return () => newSocket.close();
  }, [setSocket]);

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
        <div className='col-3 chat'><Chat />
        </div>
      </div>
      <div className='row'>
        <div className='col-8 cameras'>cameras</div>
        <div className='col-3 control-panel'>control panel</div>
      </div>
    </div>
  );
}

export default WatchingRoomPage;