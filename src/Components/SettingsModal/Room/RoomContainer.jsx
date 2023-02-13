import React, { useState } from 'react'
import Setting from '../../Setting/Setting'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import './RoomContainer.scss';

const props = {
  inputProps: {
    placeholder: "Cental Perk"
  },
  icon: faCheck,
}

const components = {
  nameChanger: "nameChanger",
  // permission: PermissionManager,
};

function RoomContainer() {
  return (
    <div className="user-container">
      <Setting settingType={components.nameChanger} title="Room Name" 
        info="Name of the room." props={props}  
      />
    </div>
  )
}

export default RoomContainer;
