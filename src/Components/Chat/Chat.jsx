import React from 'react';
import SendMessageInput from '../SendMessageInput/SendMessageInput';
import Message from '../Message/Message';
import './Chat.scss'

function Chat() {
  const messages = [
    {
      id: 1,
      message:'How you doin?',
      username: 'joey',
    },
    {
      id: 2,
      message:'Noooo!',
      username: 'rachel',
    },
    {
      id: 3,
      message:'Pivot',
      username: 'ross',
    },
    {
      id: 4,
      message:'I know!',
      username: 'monica',
    },
    {
      id: 5,
      message:'Could I be anymore excited?',
      username: 'chandler',
    },
    {
      id: 6,
      message:'They don\'t know that we know that they know!',
      username: 'phoebe',
    },
  ]

  return (
    <div className='chat-field'>
      <div className='messages'>
      {
        messages.map(message => {
          return (
            <Message
              key= {message.id}
              style={message.style}
              username= {message.username}
              message= {message.message}
            />
          )
        })
      }      
      </div>
      <div className='send-message-input'>
        <SendMessageInput/>
      </div>
    </div>    
  );
}

export default Chat;