import React, { useRef, useEffect } from 'react';
import SendMessageInput from '../SendMessageInput/SendMessageInput';
import Message from '../Message/Message';
import './Chat.scss'

function Chat({messages, typingUser}) {

  const bottomRef = useRef(null);

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


  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  const userColor = {}
  var i = 0;

  return (
    <div className='chat-field'>
      <div className='messages'>
        {
          messages.map((message, index) => {
            if(message.isSystemMessage == true){
              return <p className='system-message'>{message.text}</p>
            }
            var userId = message.userId;

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
                key= {index}
                username= {message.username}
                message= {message.text}
                date= {message.date}
                style={{ color: userColor[userId] }}
              />
            )
          })
        }
        <div ref={bottomRef} />
      </div>
      <div className='send-message-input'>
        {typingUser !== "" ? <p>{typingUser} typing</p>: null}
        <SendMessageInput/>
      </div>
    </div>
  );
}

export default Chat;