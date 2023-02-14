import React from "react";
import NameChanger from "../../NameChanger/NameChanger";

import './Setting.scss'
const components = {
  nameChanger: NameChanger,
  // permission: PermissionManager,
  // deleteRoomButton: deleteRoomButton,
};

function Setting({ settingType, title, info, ...props }) {
  const SpecificSetting = components[settingType];
  return (
    <div className='setting'>
      <div className='title'><h5>{title}</h5></div>
      <div className='container-body'>
        <div className='info'>
          <p>{info}</p>
        </div>
        <div className='setting'>
            <SpecificSetting {...props}/>
        </div>
      </div>
    </div>
  );
}

Setting.defaultProps = {
  settingType: components.nameChanger,
  title: "Setting",
  info: "This is setting",
  props: {}
}

export default Setting;
