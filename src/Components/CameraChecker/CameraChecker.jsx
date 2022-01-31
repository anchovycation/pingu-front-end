import React, { useRef, useState } from 'react';
import './CameraChecker.css'

function CameraChecker(props) {

  const [isChecked, setIsChecked] = useState(false);
  const [videoStream, setvideoStream] = useState(null);
  const [videoErrorMessage, setVideoErrorMessage] = useState(null);

  const videoElement = useRef(null);

  const checkCam = (event) => {
    setIsChecked(event.target.checked);

    if (event.target.checked) {
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }) // get user video
          .then((stream) => {
            setvideoStream(stream);
            videoElement.current.srcObject = stream;
            setVideoErrorMessage(null);
          })
          .catch(function (err) {
            setVideoErrorMessage(err.message);
            return props.valueSetter(false)
          });
      }
    } else {
      //close camera connection
      videoStream.getTracks().forEach(function (track) {
        if (track.readyState === 'live' && track.kind === 'video') {
          track.stop();
        }
      });
    }
    props.valueSetter(event.target.checked);
  }

  return <div className='camera-checker'>
    <div className="row">
      <div className="col-1 video-cbx">
        <input type="checkbox"  onChange={checkCam}/>
        <label className='chechmark'></label>
      </div>
      <div className="col-11">
        <p id='cbx-label'>Connect with camera</p>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <video id='camera' autoPlay={true} ref={videoElement} style={{ display: isChecked ? 'block' : 'none' }} />
      </div>
      <div className='col' style={{ display: isChecked ? 'block' : 'none' }}>
        {videoErrorMessage && <p id='camera-info'>Something went wrong!<br /> <strong id='camera-error'>{videoErrorMessage}</strong></p>}
      </div>
    </div>
  </div>;
}

export default CameraChecker;
