import React, { useState, useRef } from 'react'
import YouTube from 'react-youtube';

import './YouTubePlayer.scss';

const YouTubePlayer = ({ url }) => {
  // https://github.com/tjallingt/react-youtube
  url = new URL(url);
  const [id, setId] = useState(new URLSearchParams(url.search).get('v'))
  const [player, setPlayer] = useState({})

  const opts = {
    height: '500',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    }
  }
  const onPlayerReady = (event) => {
    setPlayer(event.target)
  }

  return (
    <div className='youtube-player ratio ratio-16x9'>
      <YouTube videoId={id} opts={opts} onReady={onPlayerReady} className='ratio ratio-16x9' />
    </div>
  )
}

export default YouTubePlayer