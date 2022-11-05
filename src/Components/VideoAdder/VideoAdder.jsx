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
