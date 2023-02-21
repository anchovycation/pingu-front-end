import { useEffect, useState } from "react";
import Socket from "../../Socket";
import { useLocation } from "react-router-dom";
import VideoAdder from '../../Components/VideoAdder/VideoAdder';
import { RoomContext } from '../../Contexts/RoomContext';
import YouTubePlayer from "../../Components/YouTubePlayer/YouTubePlayer";
import ChatPlaylistContainer from '../../Components/ChatPlaylistContainer/ChatPlaylistContainer';
import { SOCKET_EVENTS } from "../../Constants";

import './WatchingRoom.scss';


Socket.connect(process.env.REACT_APP_API_PATH, {
  transports: ["websocket"],
});

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
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState("");
  const [playlist, setPlaylist] = useState(state.room.playlist);

  const id = room.id;
  const {
    id: userId,
    username,
  } = user;
  let playlistProps = {
    playlist,
    id: room.id,
  },
  chatProps = {
    messages,
    typingUser,
  };

  useEffect(() => {
    let initialRoomData = null; // kullanıcı odaya katilinca oda state'i atanmadan odaya katildi mesaji aldigi icin 
    
    Socket.on(SOCKET_EVENTS.JOINED, ({ room }) => {
      let tempRoom = typeof room === 'string' ? JSON.parse(room) : room;
      initialRoomData = tempRoom;
      setRoom(tempRoom);
      setPlaylist(tempRoom.playlist);
      setMessages(tempRoom.messages); 
    });

    Socket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, ({ message }) => {
      setTypingUser("");
      let temp = initialRoomData.messages;
      temp.push(message);
      setMessages([...temp]);
    });

    Socket.on(SOCKET_EVENTS.DISPLAY, ({ username }) => {
      setTypingUser(username);
    });
    
    Socket.on(SOCKET_EVENTS.PLAYLIST_UPDATED, ({ playlist, playlistStatus }) => {
      setPlaylist([...playlist]);
    });
    
    Socket.on(SOCKET_EVENTS.VIDEO_SKIPPED, ({
      video: newVideo,
      playlist: newPlaylist,
    }) => {
      setPlaylist([...newPlaylist]);
      setRoom({
        ...room,
        video: newVideo
      });
    });
    
    Socket.emit(SOCKET_EVENTS.JOIN_ROOM, { id, userId, username });

    return () => Socket.close();
  }, []);

  const skipVideo = () => {
    if(playlist.length === 0){
      return;
    }
    Socket.emit(SOCKET_EVENTS.SKIP_VIDEO, { id });
  }

  return (
    <RoomContext.Provider value={{ room, user }}>
      <div className='watching-room container'>
        <div className="row header">
          <div className="col-4">
            <h2><span className='orange-text'>{room.name}</span></h2>
          </div>
          <div className="col-5">
            <VideoAdder/>
          </div>
          <div className="col-3">
            <span>ayarlar</span>
          </div>
        </div>
        <div className='row'>
          <div className='col-8'>
            <div className="row">
              <div className="col">
                {
                  room?.video?.link ? (<YouTubePlayer url={room.video.link} />) : (<h3>video not found</h3>)
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
    </RoomContext.Provider>
  );
}

export default WatchingRoomPage;
