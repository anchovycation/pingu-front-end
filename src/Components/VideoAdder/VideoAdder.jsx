import React, { useContext, useState } from 'react'
import Socket from '../../Socket';
import TextInput from '../TextInput/TextInput';
import { RoomContext } from "../../Contexts/RoomContext"
import { PLAYLIST_STATUS, SOCKET_EVENTS } from '../../Constants';

function VideoAdder() {
  const { room } = useContext(RoomContext);
  let inputRef = null;
  const setInputRef =(ref)=>{
    inputRef = ref;
  }

  const [link, setLink] = useState('');
  const addVideo = ( event ) => {
    if(!link){
      return;
    }
    
    if(event.key === 'Enter')
    Socket.emit(SOCKET_EVENTS.UPDATE_PLAYLIST, {id: room.id, link, playlistStatus: PLAYLIST_STATUS.ADD });
    inputRef.current.value='';
  };
  
  return (
    <div>
      <TextInput
        placeholder="YouTube video or playlist link"
        valueSetter={setLink}
        press={addVideo}
        refSetter={setInputRef}
      />
    </div>
)
}

export default VideoAdder
