import React, { useState  } from 'react';
import { useNavigate } from "react-router-dom";


import TextInput from '../../Components/TextInput/TextInput';
import CameraChecker from '../../Components/CameraChecker/CameraChecker';

import './JoinRoom.scss';

function JoinRoomPage() {
  const [username, setUsername] = useState('');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const navigate = useNavigate();

  const submit = () => {
    navigate("/");
    console.log({ username, isCameraReady });
  }

  return (
    <div className='container join-room'>
      <div className="row">
        <div className="col header">
          <h2>Join a <span className='orange-text'>Room</span></h2>
        </div>
      </div>
      <div className="row">
        <div className="col-4 inputs py-5">
          <div className="row">
            <div className="col-6">
              <TextInput
                valueSetter={setUsername}
                label='Name:'
                placeholder='Chandler Bing'
                isFocused={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col py-5">
              <CameraChecker valueSetter={setIsCameraReady} />
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
              <button className='submit-btn' onClick={submit}>Join</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default JoinRoomPage;
