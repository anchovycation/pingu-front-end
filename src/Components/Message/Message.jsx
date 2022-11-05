import React from 'react';
import './Message.scss'

function Message({ username, message, date, style, ...props }) {
  var d = new Date(date);
  var date = d.toLocaleTimeString('en-US', {
    hour12: false,
  });

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
