import React, { useState } from 'react';

import TextInput from '../../Components/TextInput/TextInput';
import CameraChecker from '../../Components/CameraChecker/CameraChecker';
import axios from '../../Axios';

import './CreateRoom.scss';
import { useNavigate } from 'react-router-dom';

function CreateRoomPage() {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [videoUrl, setvideoUrl] = useState('');
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isVideoLinkValid, setIsVideoLinkValid] = useState(true);
  const navigate = useNavigate()

  const submit = async () => {
    if (!(videoUrl.startsWith('https://www.youtube.com/watch?v=') || videoUrl.startsWith('https://youtu.be/'))) {
      return setIsVideoLinkValid(false);
    }
    setIsVideoLinkValid(true);
    try {
      let { data, status } = await axios.post('/create-room', {
        username,
        roomName,
        videoUrl,
      })
      if (status !== 201) {
        return;
      }
      const { room, user } = data;
      return navigate(`/rooms/${data.room.id}`, {
        state: {
          room,
          user,
        }
      });
    } catch (error) {
      return alert(error.response.data.message);
    }
  }

  return (
    <div className='container create-room'>
      <div className="row">
        <div className="col header">
          <h2>Create a <span className='orange-text'>Room</span></h2>
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
          <div className="row" style={{ margin: '15px 0 25px 0' }}>
            <div className="col" style={{ padding: '0' }}>
              <TextInput
                valueSetter={setvideoUrl}
                label='Video Link:'
                placeholder='https://www.youtube.com/watch?v=VNbFrgqeaMM'
                detail='*Copy the address in the search bar in the browser or click share button on YouTube'
                hasError={!isVideoLinkValid}
              />
              {
                !isVideoLinkValid &&
                <p className='error-text'>Video address must start with "<strong>https://youtu.be/</strong>" or "<strong>https://www.youtube.com/watch?v=</strong>"</p>
              }
            </div>
          </div>
          <div className="row">
            <div className="col">
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
              <button className='submit-btn' onClick={submit}>Create</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default CreateRoomPage;
