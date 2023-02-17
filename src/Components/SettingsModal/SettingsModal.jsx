import React, { useState } from 'react'
import Room from './Room/RoomContainer';
import User from './User/UserContainer';
import { RENAMES } from '../../Constants';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle, faGears, faHome, faUser } from '@fortawesome/free-solid-svg-icons'

import './SettingsModal.scss';

function SettingsModal({ closeModal, selected }) {
  const [selectedContent, setSelectedContent] = useState(RENAMES.ROOM);
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
              <div className={selectedContent === RENAMES.ROOM ? 'selected' : 'not-selected'}><FontAwesomeIcon icon={faHome} onClick={() => {
                setSelectedContent(RENAMES.ROOM);
                selected(RENAMES.ROOM);
              }} /></div>
              <div className={selectedContent === RENAMES.USER ? 'selected' : 'not-selected'}><FontAwesomeIcon icon={faUser} onClick={() => {
                setSelectedContent(RENAMES.USER);
                selected(RENAMES.USER);
                }} /></div>
            </div>
          </div>
          <div className='col-md-10'>
            {
              selectedContent === RENAMES.ROOM ? <Room /> : <User />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal;
