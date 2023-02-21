import React from 'react'
import PlaylistItem from './PlaylistItem/PlaylistItem';
import './Playlist.scss'

function Playlist({playlist, id, ...props}) {
  return (
    <div className='playlist'>
      {
        playlist.map((video) => <PlaylistItem key={video.id} videoId={video.id} {...video} {...props}  id={id}/> ) 
      }
    </div>
  )
}

export default Playlist
