import React from 'react'
import Setting from '../Setting/Setting'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import './RoomContainer.scss';

const props = {
  inputProps: {
    placeholder: "Cental Perk"
  },
  icon: faPen,
}

const components = {
  nameChanger: "nameChanger",
  // permission: PermissionManager,
};

function RoomContainer() {
  return (
    <div className="user-container">
      <Setting settingType={components.nameChanger} title="Room Name" 
        info="Name of the room." {...props}
      />
    </div>
  )
}

export default RoomContainer;
