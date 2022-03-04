import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";


import TextInput from '../../Components/TextInput/TextInput';
import CameraChecker from '../../Components/CameraChecker/CameraChecker';

import './JoinRoomChecker.scss';
import axios from '../../Axios';

function JoinRoomCheckerPage(props) {
  const { state } = useLocation();
  const [username, setUsername] = useState('');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const navigate = useNavigate();
  let { roomId } = useParams();
  if (!state) {
    // burada doğrudan link ile gelenler için api ile konuşularak roomId'ye sahip oda olup olmadığı kontrol edilmeli
  }

  const submit = async () => {
    try {
      const { data, status } = await axios.post(`join-room/${roomId}`, {
        username
      }); 
      const { room } = data;
      navigate(`/rooms/${roomId}`, {
        state: {
          room,
          user: room.users[room.users.length - 1],
        }
      });
    } catch (error) {
      return alert(error.response.data.message);
    }
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
            <div className="col">
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

export default JoinRoomCheckerPage;
