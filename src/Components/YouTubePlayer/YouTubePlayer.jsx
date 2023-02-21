import React, { useState, useEffect, useContext } from 'react'
import YouTube from 'react-youtube';
import Socket from '../../Socket';
import { RoomContext } from '../../Contexts/RoomContext';
import { VIDEO_STATUS, SOCKET_EVENTS } from '../../Constants';

import './YouTubePlayer.scss';

const getIdFromUrl = ( url ) => {
  const u = new URL(url);
  return new URLSearchParams(u.search).get('v');
}

const YouTubePlayer = (props) => {
  // https://github.com/tjallingt/react-youtube
  const { room } = useContext(RoomContext);
  const [id, setId] = useState(getIdFromUrl(props.url));
  const [didIUpdated, setDidIUpdated] = useState(false);
  const [player, setPlayer] = useState({});
  const [sequence, setSequence] = useState([]);
  const [timer, setTimer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(( )=> {
    setId(getIdFromUrl(props.url));
    player.loadVideoById && player.loadVideoById(id);
  },
  [props.url]);

  const opts = {
    height: '500',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    }
  }

  const onPlayerReady = (event) => {
    let p = event.target
    setPlayer(event.target);
    Socket.on(SOCKET_EVENTS.VIDEO_STATUS_UPDATED, ({ video }) =>  {
      switch(video.status) {
        case VIDEO_STATUS.PLAYED:
          p.playVideo();
          p.seekTo(video.duration);
          break;
        case VIDEO_STATUS.STOPPED:
          p.pauseVideo();
          break;
        default:
          return;
      }
    });

    Socket.on(SOCKET_EVENTS.VIDEO_DURATION_CHANGED, ({ video }) => {
      p.seekTo(video.duration);
      setDidIUpdated(true);
    });
  }

const isSubArrayEnd = (A, B) => {
  if (A.length < B.length)
    return false;
  let i = 0;
  while (i < B.length) {
    if (A[A.length - i - 1] !== B[B.length - i - 1]) 
      return false;
    i++;
  }
  return true;
};

const handleEvent = type => {
  setSequence([...sequence, type]);
  setCurrentTime(player.getCurrentTime());
  if (type === 1 && isSubArrayEnd(sequence, [3]) && !sequence.includes(-1)) {
    setSequence([]);
    if(didIUpdated){
      setDidIUpdated(false);
      return;
    }
    Socket.emit(SOCKET_EVENTS.CHANGE_VIDEO_DURATION, ({ id: room.id, duration: currentTime } ))
    return;
  } else {
    clearTimeout(timer);
    if (type !== 3) {
      let timeout = setTimeout(function () {
        if (type === 1) {
          Socket.emit(SOCKET_EVENTS.UPDATE_VIDEO_STATUS, {id: room.id, videoStatus: VIDEO_STATUS.PLAYED});
        }
        else if (type === 2) {
          Socket.emit(SOCKET_EVENTS.UPDATE_VIDEO_STATUS, {id: room.id, videoStatus: VIDEO_STATUS.STOPPED});
        }
        setSequence([]);
      }, 250);
      setTimer(timeout);
    }
  }
};

  return (
    <div className='youtube-player ratio ratio-16x9'>
      <YouTube videoId={id} opts={opts} onReady={onPlayerReady}  onStateChange={event => handleEvent(event.data)} className='ratio ratio-16x9' />
    </div>
  )
};

export default YouTubePlayer;

