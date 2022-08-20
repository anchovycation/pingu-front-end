import React from 'react'
import PlaylistItem from './PlaylistItem/PlaylistItem';
import './Playlist.scss'

function Playlist({playlist, ...props}) {
  return (
    <div className='playlist'>
      {
        playlist.map((video) => <PlaylistItem key={video.id} {...video} {...props}/> ) 
      }
    </div>
  )
}

export default Playlist
