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
  const [id, setId] = useState(getIdFromUrl(props.url))
  const [player, setPlayer] = useState({})

  useEffect(() => {
    setId(getIdFromUrl(props.url));
  }, []);

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

  const playVideo = () => {
    props.setVideoStatus(VIDEO_STATUS.PLAYED);
  }

  const stopVideo = () => {
    props.setVideoStatus(VIDEO_STATUS.STOPPED);
  }


  useImperativeHandle(ref, () => ({ 
    playVideo: () => {
      player.playVideo();
    },
    stopVideo: () => {
      player.pauseVideo();
    } 
  }));

  return (
    <div className='youtube-player ratio ratio-16x9'>
      <YouTube videoId={id} opts={opts} onReady={onPlayerReady} onPlay={playVideo} onPause={stopVideo} className='ratio ratio-16x9' />
    </div>
  )
});

export default YouTubePlayer;

