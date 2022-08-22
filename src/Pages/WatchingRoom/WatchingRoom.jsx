import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import VideoAdder from '../../Components/VideoAdder/VideoAdder';
import { Context } from '../../Contexts/SendMessageInputContext';
import YouTubePlayer from "../../Components/YouTubePlayer/YouTubePlayer";
import ChatPlaylistContainer from '../../Components/ChatPlaylistContainer/ChatPlaylistContainer';

import {
  SOCKET_EVENTS,
  PLAYLIST_STATUS
} from "../../Constants";

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
  const {
    id: userId,
    username,
  } = user;

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_PATH, {
      transports: ["websocket"],
    });
    setSocket(newSocket);
    newSocket.emit(SOCKET_EVENTS.JOIN_ROOM, { id, userId, username });
    newSocket.on(SOCKET_EVENTS.JOINED, ({ room }) => {
      setRoom(JSON.parse(room));
      setPlaylist(JSON.parse(room).playlist);
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
  };
  
  const removeVideo = (videoId) => {
    setPlVideoId(videoId);
    setPlaylistStatus(PLAYLIST_STATUS.REMOVE);
  };
  
  const moveDownVideo = (videoId) => {
    setPlVideoId(videoId);
    setPlaylistStatus(PLAYLIST_STATUS.MOVE_DOWN);
  };


  //mesajlasma socketi eklendiginde calistirilacak fonksiyon
  const click = () => {
    socket.emit(SOCKET_EVENTS.SEND_MESSAGE, { id, text, user });    
  };

  const requestAddVideoToPlaylist = ({link, event}) => {
    if(event.key === 'Enter'){
      socket.emit(SOCKET_EVENTS.UPDATE_PLAYLIST,{
        playlistStatus: PLAYLIST_STATUS.ADD,
        id,
        username,
        link 
      });
    }
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
        <div className="row col">
          <VideoAdder addVideoFunc={requestAddVideoToPlaylist}/>
        </div>
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
        </div>
      </div>
    </Context.Provider>
  );
}

export default WatchingRoomPage;
