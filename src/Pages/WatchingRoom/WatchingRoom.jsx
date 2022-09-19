import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import VideoAdder from '../../Components/VideoAdder/VideoAdder';
import { Context } from '../../Contexts/SendMessageInputContext';
import YouTubePlayer from "../../Components/YouTubePlayer/YouTubePlayer";
import ChatPlaylistContainer from '../../Components/ChatPlaylistContainer/ChatPlaylistContainer';

import {
  SOCKET_EVENTS,
  PLAYLIST_STATUS,
  VIDEO_STATUS,
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
  const [link, setLink] = useState('');
  const [videoStatus, setVideoStatus] =  useState("");
  const player = useRef(null);

  const id = room.id;
  const {
    id: userId,
    username,
  } = user;
  const video = room.video;
  const [duration, setVideoDuration] = useState(video.duration);

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

    newSocket.on(SOCKET_EVENTS.PLAYLIST_UPDATED, ({ playlist, playlistStatus }) => {
      setPlaylistStatus("");
      setPlaylist([...playlist]);
    });

    newSocket.on(SOCKET_EVENTS.VIDEO_STATUS_UPDATED, ({ video }) =>  {
      console.log(video.status);
      switch(video.status) {
        case VIDEO_STATUS.PLAYED:
          player.current.playVideo();
          break;
        case VIDEO_STATUS.STOPPED:
          player.current.stopVideo();
          break;
        default:
          return;
      }
      setVideoStatus("");
    });

    newSocket.on(SOCKET_EVENTS.VIDEO_SKIPPED, ({ 
      video: newVideo,
      playlist: newPlaylist,
    }) => {
      setPlaylist([...newPlaylist]);
      setRoom({ 
        ...room,
        video: newVideo
      });
    });

    newSocket.on(SOCKET_EVENTS.VIDEO_DURATION_CHANGED, ({ video } ) => {
      player.current.jumpInVideo(video.duration);
    });

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    socket && socket.emit(SOCKET_EVENTS.UPDATE_PLAYLIST, {id, videoId, userId, link, playlistStatus});
  }, [playlistStatus]);

  useEffect(() => {
    socket && socket.emit(SOCKET_EVENTS.UPDATE_VIDEO_STATUS, {id, userId, video, videoStatus});
  }, [videoStatus]);
  
  useEffect(() => {
    socket && socket.emit(SOCKET_EVENTS.CHANGE_VIDEO_DURATION, ({ id, userId, duration } ));
  }, [duration]);
  
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
      setLink(link);
      setPlaylistStatus(PLAYLIST_STATUS.ADD)
    }
  };

  const skipVideo = () => {
    if(playlist.length === 0){
      return;
    }
    socket.emit(SOCKET_EVENTS.SKIP_VIDEO, { id, userId });
  }

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
            <div className="row">
              <div className="col">
                {
                  room?.video?.link ? (<YouTubePlayer url={room.video.link} ref={player} setVideoStatus={setVideoStatus} setVideoDuration={setVideoDuration} />) : (<h3>video not found</h3>)
                }
              </div>
            </div>
            <div className="row">
              <div className="col ">
                <button 
                  className="skip-button"
                  onClick={skipVideo}
                >skip video</button>
              </div>
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
