import React from 'react';
import './Message.scss'

function Message({username, message, style, ...props}) {
  var d = new Date(message.date);
  var date = d.toLocaleTimeString();

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
