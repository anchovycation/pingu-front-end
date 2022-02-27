import React from 'react';
import SendMessageInput from '../SendMessageInput/SendMessageInput';
import Message from '../Message/Message';
import './Chat.scss'

function Chat() {
  const messages = [
    {
      id: 1,
      message:'How you doin?',
      user: {
        id:1,
        username: 'joey'
      }
    },
    {
      id: 2,
      message:'Noooo!',
      user: {
        id:2,
        username: 'rachel'
      }
    },
    {
      id: 3,
      message:'Pivot',
      user: {
        id:3,
        username: 'ross'
      }
    },
    {
      id: 4,
      message:'I know!',
      user: {
        id:4,
        username: 'monica'
      }
    },
    {
      id: 5,
      message:'Could I be anymore excited?',
      user: {
        id:5,
        username: 'chandler'
      }
    },
    {
      id: 6,
      message:'They don\'t know that we know that they know!',
      user: {
        id: 6,
        username: 'phoebe'
      }
    },
    {
      id: 7,
      message:'We were on a break!',
      user: {
        id: 3,
        username: 'ross'
      }
    },
    {
      id: 8,
      message:'Smelly cat',
      user: {
        id: 6,
        username: 'phoebe'
      }
    },
    {
      id: 9,
      message:'Joey doesn’t share food!',
      user: {
        id:1,
        username: 'joey'
      }
    },
  ]

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
          var userId = message.user.id;

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
              username= {message.user.username}
              message= {message.message}
              style={{ color: userColor[userId] }}
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