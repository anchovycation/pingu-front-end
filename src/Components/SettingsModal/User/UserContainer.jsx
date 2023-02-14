import React from 'react'
import Setting from '../Setting/Setting'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import './UserContainer.scss';


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
        info="Your user name will be visible in the viewers list and the chat." {...props}  
      />
    </div>
  )
}

export default UserContainer;
