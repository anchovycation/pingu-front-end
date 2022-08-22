import React, { useState } from 'react'
import TextInput from '../TextInput/TextInput';

function VideoAdder({ addVideoFunc }) {
  let inputRef = null;
  const setInputRef =(ref)=>{
    inputRef = ref;
  }

  const [link, setLink] = useState('');
  const addVideo = ( event ) => {
    if(!link){
      return;
    }
    addVideoFunc({event, link});
    if(event.key === 'Enter')
    inputRef.current.value='';
  };
  
  return (
    <div style={{ width: '680px' }}>
      <div className="col-8">
        <TextInput
          placeholder="YouTube url like https://www.youtube.com/watch?v=CD6yRV1NKBA"
          valueSetter={setLink}
          press={addVideo}
          refSetter={setInputRef}
        />
      </div>
      <div className="col-4">
      </div>
    </div>
)
}

export default VideoAdder
