import React from 'react';
import './Message.scss'

function Message(props) {
  var d = new Date();
  var date = d.toLocaleTimeString();

  const {username, message, style} = props;

  return (
    <div className='message'>     
      <div className='username-date'>
        <strong className='name' style={style}>{username}</strong>
        <small>{date}</small>
      </div>
      {message}
    </div>
  );
}

export default Message;
