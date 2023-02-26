import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import VideoAdder from '../../Components/VideoAdder/VideoAdder';
import { SendMessageInputContext, NameChangerContext } from '../../Contexts';
import YouTubePlayer from "../../Components/YouTubePlayer/YouTubePlayer";
import ChatPlaylistContainer from '../../Components/ChatPlaylistContainer/ChatPlaylistContainer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears } from '@fortawesome/free-solid-svg-icons'
import SettingsModal from "../../Components/SettingsModal/SettingsModal";

import {
  SOCKET_EVENTS,
  PLAYLIST_STATUS,
  VIDEO_STATUS,
  RENAMES,
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
  const [videoStatus, setVideoStatus] = useState("");
  const [duration, setVideoDuration] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [willBeRenamed, setWillBeRenamed] = useState("");
  const [type, setType] = useState("");

  const player = useRef(null);

  const id = room.id;
  const {
    id: userId,
    username,
  } = user;
  const video = room.video;

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_PATH, {
      transports: ["websocket"],
    });

    let initialRoomData = null; // kullanıcı odaya katilinca oda state'i atanmadan odaya katildi mesaji aldigi icin 
    setSocket(newSocket);
    newSocket.emit(SOCKET_EVENTS.JOIN_ROOM, { id, userId, username });
    newSocket.on(SOCKET_EVENTS.JOINED, ({ room }) => {
      let tempRoom = typeof room === 'string' ? JSON.parse(room) : room;
      initialRoomData = tempRoom;
      setRoom(tempRoom);
      setPlaylist(tempRoom.playlist);
      setMessages(tempRoom.messages);
    });

    newSocket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, ({ message }) => {
      setTypingUser("");
      let temp = initialRoomData.messages;
      temp.push(message);
      setMessages([...temp]);
    });

    newSocket.on(SOCKET_EVENTS.DISPLAY, ({ username }) => {
      setTypingUser(username);
    });

    newSocket.on(SOCKET_EVENTS.PLAYLIST_UPDATED, ({ playlist, playlistStatus }) => {
      setPlaylistStatus("");
      setPlaylist([...playlist]);
    });

    newSocket.on(SOCKET_EVENTS.VIDEO_STATUS_UPDATED, ({ video }) => {
      switch (video.status) {
        case VIDEO_STATUS.PLAYED:
          player.current.playVideo();
          player.current.jumpInVideo(video.duration);
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

    newSocket.on(SOCKET_EVENTS.VIDEO_DURATION_CHANGED, ({ video }) => {
      player.current.jumpInVideo(video.duration);
    });

    newSocket.on(SOCKET_EVENTS.NAME_CHANGED, ({ name, type }) => {
      switch (type) {
        case RENAMES.ROOM:
          setRoom( room => ({
            ...room,
            name: name
          }));
          break;
        case RENAMES.USER:
          setUser(user =>( {
            ...user,
            name: name
          }));
          break;
        default:
          return;
      }
    });

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    socket && socket.emit(SOCKET_EVENTS.UPDATE_PLAYLIST, { id, videoId, username, link, playlistStatus });
  }, [playlistStatus]);

  useEffect(() => {
    socket && socket.emit(SOCKET_EVENTS.UPDATE_VIDEO_STATUS, { id, video, videoStatus });
  }, [videoStatus]);

  useEffect(() => {
    socket && socket.emit(SOCKET_EVENTS.CHANGE_VIDEO_DURATION, ({ id, duration }));
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

  const changeName = () => {
    socket.emit(SOCKET_EVENTS.CHANGE_NAME, { id, type, name: willBeRenamed });
  };

  const requestAddVideoToPlaylist = ({ link, event }) => {
    if (event.key === 'Enter') {
      setLink(link);
      setPlaylistStatus(PLAYLIST_STATUS.ADD)
    }
  };

  const skipVideo = () => {
    if (playlist.length === 0) {
      return;
    }
    socket.emit(SOCKET_EVENTS.SKIP_VIDEO, { id });
  }

  const selectContent = type => {
    setType(type);
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
    <SendMessageInputContext.Provider value={{ setText, click, press }}>
      <NameChangerContext.Provider value={{ setWillBeRenamed, changeName }}>
        {isSettingsOpen && <SettingsModal closeModal={setIsSettingsOpen} selected={selectContent}/>}
        <div className='watching-room container'>
          <div className="row header">
            <div className="col-4">
              <h2><span className='orange-text'>{room.name}</span></h2>
            </div>
            <div className="col-5">
              <VideoAdder addVideoFunc={requestAddVideoToPlaylist} />
            </div>
            <div className="col-3">
              <FontAwesomeIcon icon={faGears} onClick={() => setIsSettingsOpen(true)} />
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
      </NameChangerContext.Provider>
    </SendMessageInputContext.Provider>
  );
}

export default WatchingRoomPage;
