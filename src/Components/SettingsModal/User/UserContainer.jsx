import React, { useState } from 'react'
import Setting from '../../Setting/Setting'
import { faPen } from '@fortawesome/free-solid-svg-icons'


import './UserContainer.scss';

const COMPONENT_TYPES = {
  INPUT: 'input',
  PERMISSION: 'permission',
  BUTTON: 'button'
}

const props = {
  inputProps: {
    placeholder: "Regina Phalange"
  },
  icon: faPen,
}

const components = {
  nameChanger: "nameChanger",
  // permission: PermissionManager,
};

function UserContainer() {
  return (
    <div className="user-container">
      <Setting settingType={components.nameChanger} title="Username" 
        info="Your user name will be visible in the viewers list and the chat." props={props}  
      />
    </div>
  )
}

export default UserContainer;
