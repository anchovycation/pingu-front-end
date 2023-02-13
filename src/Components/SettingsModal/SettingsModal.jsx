import React, { useState } from 'react'
import Room from './Room/RoomContainer';
import User from './User/UserContainer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle, faGears, faHome, faUser } from '@fortawesome/free-solid-svg-icons'

import './SettingsModal.scss';
const MENU_TYPES = {
  ROOM: 'room',
  USER: 'user',
}

function SettingsModal({ closeModal }) {
  const [selectedContent, setSelectedContent] = useState(MENU_TYPES.ROOM);
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className='close-button'>
          <FontAwesomeIcon icon={faXmarkCircle} onClick={() => closeModal(false)} />
        </div>
        <div className='row'>
          <div className='col-md-2'>
            <div className="room-user-container">
              <div className='settings'><FontAwesomeIcon icon={faGears} /></div>
              <div className={selectedContent === MENU_TYPES.ROOM ? 'selected' : 'not-selected'}><FontAwesomeIcon icon={faHome} onClick={() => setSelectedContent(MENU_TYPES.ROOM)} /></div>
              <div className={selectedContent === MENU_TYPES.USER ? 'selected' : 'not-selected'}><FontAwesomeIcon icon={faUser} onClick={() => setSelectedContent(MENU_TYPES.USER)} /></div>
            </div>
          </div>
          <div className='col-md-10'>
            {
              selectedContent === MENU_TYPES.ROOM ? <Room /> : <User />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal;
