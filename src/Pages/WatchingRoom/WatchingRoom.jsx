import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import ChatPlaylistContainer from '../../Components/ChatPlaylistContainer/ChatPlaylistContainer';
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
  })();
  const [room, setRoom] = useState(state.room);
  const [user, setUser] = useState(state.user);
  const [socket, setSocket] = useState(null);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [playlist, setPlaylist] = useState(state.room.playlist);
  
  const id = room.id;
  const userId = user.id;
  const username = user.username;

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_PATH, {
      transports: ["websocket"],
    });
    setSocket(newSocket);
    newSocket.emit(SOCKET_EVENTS.JOIN_ROOM, { id, userId });
    newSocket.on(SOCKET_EVENTS.JOINED, ({ room }) => {
      setRoom(JSON.parse(room));
    });

    newSocket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, ({ text, user }) => {
      setName("");
      let temp = messages;
      temp.push({
        id: user.id,
        username: user.username,
        role: user.role,
        message: text,
      });
      setMessages([...temp]);
    });

    newSocket.on(SOCKET_EVENTS.DISPLAY, ({ username }) => {
      setName(username);
    });

    return () => newSocket.close();
  }, []);
  
  const press = () => {
    socket.emit(SOCKET_EVENTS.TYPING, { id, username });
  };

  //mesajlasma socketi eklendiginde calistirilacak fonksiyon
  const click = () => {
    socket.emit(SOCKET_EVENTS.SEND_MESSAGE, { id, text, user });    
  };

  let playlistProps = {
    playlist
  },
  chatProps = { 
    messages,
    username
  };

  return (
    <Context.Provider value={{ setText, click, press }}>
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
          <div className='col-3 chat-playlist'>
            <ChatPlaylistContainer playlistProps={playlistProps} chatProps={chatProps} />
            {/* <Chat messages={messages} username={name} /> */}
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
