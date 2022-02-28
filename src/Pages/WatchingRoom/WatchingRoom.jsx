import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Chat from "../../Components/Chat/Chat";
import YouTubePlayer from "../../Components/YouTubePlayer/YouTubePlayer";
import SOCKET_EVENTS from "../../Constants/SocketEvents";

import './WatchingRoom.scss';

function WatchingRoomPage(params) {
  const [socket, setSocket] = useState({ on() { } });
  const [room, setRoom] = useState(params.room);
  const [user, setUser] = useState(params.user);
  const { roomId } = useParams();

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_PATH, { transports: ['websocket'] });
    setSocket(newSocket);

    newSocket.emit(SOCKET_EVENTS.JOIN_ROOM, { roomId });

    return () => newSocket.close();
  }, []);

  socket.on(SOCKET_EVENTS.JOINED, ({ room }) => {
    setRoom(room);
  })

  return (
    <div className='watching-room container'>
      <div className='row container'>
        <div className="col header">
          <h2><span className='orange-text'>She's Your Lobster </span></h2>
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
  );
}

export default WatchingRoomPage;