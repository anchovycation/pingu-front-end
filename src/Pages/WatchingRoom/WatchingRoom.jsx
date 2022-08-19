import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import ChatPlaylistContainer from '../../Components/ChatPlaylistContainer/ChatPlaylistContainer';
import YouTubePlayer from "../../Components/YouTubePlayer/YouTubePlayer";
import { SOCKET_EVENTS, PLAYLIST_STATUS } from "../../Constants";
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
  const [typingUser, setTypingUser] = useState("");
  const [playlist, setPlaylist] = useState(state.room.playlist);
  const [playlistStatus, setPlaylistStatus] = useState("");
  const [videoId, setPlVideoId] = useState("");
  
  const id = room.id;
  const userId = user.id;
  const username = user.username;

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_PATH, {
      transports: ["websocket"],
    });
    setSocket(newSocket);
    newSocket.emit(SOCKET_EVENTS.JOIN_ROOM, { id, userId, username });
    newSocket.on(SOCKET_EVENTS.JOINED, ({ room }) => {
      setRoom(JSON.parse(room));
    });

    newSocket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, ({ text, user }) => {
      setTypingUser("");
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
      setTypingUser(username);
    });

    newSocket.on(SOCKET_EVENTS.PLAYLIST_UPDATED, ({playlist, playlistStatus}) => {
      setPlaylistStatus("");
      setPlaylist([...playlist]);
    });

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    socket && socket.emit(SOCKET_EVENTS.UPDATE_PLAYLIST, {id, videoId, username, link:text, playlistStatus});
  }, [playlistStatus]);
  
  const press = () => {
    socket.emit(SOCKET_EVENTS.TYPING, { id, username });
  };

  const moveUpVideo = (videoId) => {
    setPlVideoId(videoId);
    setPlaylistStatus(PLAYLIST_STATUS.MOVE_UP);
    let temp = playlist;
    const index = playlist.findIndex(video => video.id === videoId); 

    if (index === 0) {
      return;
    }

    const element = temp.splice(index, 1)[0];

    temp.splice(index - 1, 0, element);
    setPlaylist([...temp]);
    return playlist;
  };
  
  const removeVideo = (videoId) => {
    setPlVideoId(videoId);
    setPlaylistStatus(PLAYLIST_STATUS.REMOVE);
    let temp = playlist;
    const index = playlist.findIndex(video => video.id === videoId);

    temp.splice(index, 1);
    setPlaylist([...temp]);

    return playlist;
  };
  
  const moveDownVideo = (videoId) => {
    setPlVideoId(videoId);
    setPlaylistStatus(PLAYLIST_STATUS.MOVE_DOWN);
    let temp = playlist;
    const index = playlist.findIndex(video => video.id === videoId); 

    if (playlist.length === index) {
      return;
    }

    const element = temp.splice(index, 1)[0];
    temp.splice(index + 1, 0, element);
    setPlaylist([...temp]);
  
    return playlist;
  };


  //mesajlasma socketi eklendiginde calistirilacak fonksiyon
  const click = () => {
    socket.emit(SOCKET_EVENTS.SEND_MESSAGE, { id, text, user });    
  };

  let playlistProps = {
    playlist,
    moveUpVideo,
    removeVideo,
    moveDownVideo,
  },
  chatProps = { 
    messages,
    typingUser,
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
          </div>
        </div>
        <div className='row'>
          <div className='col-8 cameras'>cameras</div>
          <div className='col-3 control-panel'><button onClick={() => setPlaylistStatus(PLAYLIST_STATUS.ADD)}> video ekle</button></div>
        </div>
      </div>
    </Context.Provider>
  );
}

export default WatchingRoomPage;
