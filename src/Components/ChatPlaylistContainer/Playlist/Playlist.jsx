import React from 'react'
import PlaylistItem from './PlaylistItem/PlaylistItem';

function Playlist({playlist, ...props}) {
  return (
    <div>
      {
        playlist.map((props) => <PlaylistItem key={props.id} {...props}/> ) 
      }
    </div>
  )
}

export default Playlist
