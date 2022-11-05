import React from 'react';
import './Message.scss'

function Message({ username, message, date, style, ...props }) {
  let d = new Date(date);
  let formatedDate = d.toLocaleTimeString('en-US', {
    hour12: false,
  });

  return (
    <div className='message'>
      <div className='username-date'>
        <strong className='name' style={style}>{username}</strong>
        <small>{formatedDate}</small>
      </div>
      {message}
    </div>
  );
}

export default Message;
