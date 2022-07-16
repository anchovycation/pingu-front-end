import React from 'react';
import SendMessageInput from '../SendMessageInput/SendMessageInput';
import Message from '../Message/Message';
import './Chat.scss'

function Chat({messages, username}) {
  const colors = [
    '#FF0000', // red
    '#FFA500', // orange
    '#FFFF00', // yellow
    '#00FF00', // green
    '#00FFFF', // cyan
    '#0000FF', // blue
    '#8F00FF', // violet
    '#FF00FF', // magenta 
    '#FF007F', // rose
  ];

  const userColor = {}
  var i = 0;

  return (
    <div className='chat-field'>
      <div className='messages'>
      {
        messages.map((message) => {
          var userId = message.id;

          //renkler yeniden kullanilir
          if(Object.values(userColor).length  % colors.length  === 0){
            i = 0;
          }

          //yeni bir kullanici mesaj attiginda
          if(!userColor.hasOwnProperty(userId)){
            userColor[userId] = colors[i];
            i++;
          }
          
          return (
            <Message
              key= {message.id}
              username= {message.username}
              message= {message.message}
              style={{ color: userColor[userId] }}
            />
          )
        })
      }    
      </div>
      <div className='send-message-input'>
        {username !== "" ? <p>{username} typing</p>: null}
        <SendMessageInput/>
      </div>
    </div>
  ); 
}

export default Chat;