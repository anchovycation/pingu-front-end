import React, { useState  } from 'react';
import { useNavigate } from "react-router-dom";

import TextInput from '../../Components/TextInput/TextInput';

import './JoinRoom.scss';

function JoinRoomPage() {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const next = () => {
    navigate(`/join-room/${roomId}`)
    console.log({ roomId });
  }

  return (
    <div className='container join-room'>
      <div className="row">
        <div className="col header">
          <h2>Join a <span className='orange-text'>Room</span></h2>
        </div>
      </div>
      <div className="row">
      <div className="col-4 input py-5">
          <div className="row">
            <div className="col">
              <TextInput
                valueSetter={setRoomId}
                label='Room ID:'
                placeholder='123456789'
                isFocused={true}
              />
            </div>
          </div>
          <div className="row">
            <div
              className="col py-5"
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '10px'
              }}
            >
              <button className='next-btn' onClick={next}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default JoinRoomPage;
