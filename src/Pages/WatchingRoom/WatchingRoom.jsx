import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import Chat from "../../Components/Chat/Chat";
import YouTubePlayer from "../../Components/YouTubePlayer/YouTubePlayer";
import SOCKET_EVENTS from "../../Constants/SocketEvents";
import { Context } from '../../Contexts/SendMessageInputContext';

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
  const [text, setText] = useState("");
  const id = room.id;

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_PATH, { transports: ['websocket'] });
    setSocket(newSocket);
    newSocket.emit(SOCKET_EVENTS.JOIN_ROOM, { id });
    newSocket.on(SOCKET_EVENTS.JOINED, ({ room }) => {
      setRoom(room);
    })
    return () => newSocket.close();
  }, []);

  //mesajlasma socketi eklendiginde calistirilacak fonksiyon
  const click = () => {
    console.log(text);
  }
  return (
    <Context.Provider value={{setText, click}}>
      <div className='watching-room container'>
        <div className='row container'>
          <div className="col header">
            <h2><span className='orange-text'>{room.name}</span></h2>
          </div>
        </div>
        <div className='row'>
          <div className='col-8'>
            <div className="">
              {
                room?.video?.link ? (<YouTubePlayer url={room.video.link} />) : (<h3>video not found</h3>)
              }
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
    </Context.Provider>
  );
}

export default WatchingRoomPage;