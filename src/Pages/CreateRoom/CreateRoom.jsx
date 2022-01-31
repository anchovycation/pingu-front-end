import React, { useState } from 'react';
import TextInput from '../../Components/TextInput/TextInput';
import CameraChecker from '../../Components/CameraChecker/CameraChecker';

import './CreateRoom.css';

function CreateRoomPage() {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [isCameraReady, setIsCameraReady] = useState(false);


  const submit = () => {
    console.log({ username, roomName, videoLink, isCameraReady });
  }

  return (
    <div className='container create-room'>
      <div className="row">
        <div className="col header">
          <h2>Create a <span id='room'>Room</span></h2>
        </div>
      </div>
      <div className="row">
        <div className="col-4 inputs">
          <div className="row">
            <div className="col-6">
              <TextInput
                valueSetter={setUsername}
                label='Name:'
                placeholder='Phoebe Buffay'
                isFocused={true}
              />
            </div>
            <div className="col-6">
              <TextInput
                valueSetter={setRoomName}
                label='Room Name:'
                placeholder='Central Perk'
              />
            </div>
          </div>
          <div className="row" style={{margin: '15px 0 25px 0'}}>
            <div className="col" style={{ padding: '0'}}>
              <TextInput
                valueSetter={setVideoLink}
                label='Video Link:'
                placeholder='https://www.youtube.com/watch?v=VNbFrgqeaMM'
                detail='*Copy the address in the search bar in the browser'
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <CameraChecker valueSetter={setIsCameraReady}/>
            </div>
          </div>
          <div className="row">
            <div
              className="col"
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '10px'
              }}
            >
              <button className='submit-btn' onClick={submit}>Create</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default CreateRoomPage;
