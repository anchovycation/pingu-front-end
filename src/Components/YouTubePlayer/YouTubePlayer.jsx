import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle} from 'react'
import { VIDEO_STATUS } from '../../Constants';
import YouTube from 'react-youtube';

import './YouTubePlayer.scss';

const getIdFromUrl = ( url ) => {
  const u = new URL(url);
  return new URLSearchParams(u.search).get('v');
}

const YouTubePlayer = forwardRef((props, ref) => {
  // https://github.com/tjallingt/react-youtube
  const [id, setId] = useState(getIdFromUrl(props.url));
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
    setPlayer(event.target);
  }


  useImperativeHandle(ref, () => ({ 
    playVideo: () => {
      player.playVideo();
    },
    stopVideo: () => {
      player.pauseVideo();
    },
    jumpInVideo: (duration) => {
      player.seekTo(duration);
    } 
  }));

const handleStateChange = event => handleEvent(event.data);

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
    props.setVideoDuration(currentTime);
    setSequence([]);
    return;
  } else {
    clearTimeout(timer);
    if (type !== 3) {
      let timeout = setTimeout(function () {
        if (type === 1) {
          props.setVideoStatus(VIDEO_STATUS.PLAYED);
        }
        else if (type === 2) {
          props.setVideoStatus(VIDEO_STATUS.STOPPED);
        }
        setSequence([]);
      }, 250);
      setTimer(timeout);
    }
  }
};

  return (
    <div className='youtube-player ratio ratio-16x9'>
      <YouTube videoId={id} opts={opts} onReady={onPlayerReady}  onStateChange={handleStateChange} className='ratio ratio-16x9' />
    </div>
  )
});

export default YouTubePlayer;

