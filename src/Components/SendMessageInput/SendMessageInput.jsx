import { useContext, useState } from "react";
import Socket from "../../Socket";
import TextInput from "../TextInput/TextInput";
import { SOCKET_EVENTS } from "../../Constants";
import { RoomContext } from "../../Contexts/RoomContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import './SendMessageInput.scss'

function SendMessageInput () {
  const { room, user } = useContext(RoomContext);
  const [text, setText] = useState("")
  let input = null

  const refSetter = (ref) => {
    input = ref;
  }

  const clickHandler = (event) =>{
    if(input?.current?.value.trim() ==='')
      return;
    
    Socket.emit(SOCKET_EVENTS.SEND_MESSAGE, { id: room.id, text, user });
    input.current.value = '';
  }

  const pressHandler = (event) =>{
    if(event.key === 'Enter'){
      return clickHandler(event);
    }
    Socket.emit(SOCKET_EVENTS.TYPING, { id: room.id, username: user.username });
  }

  return (
    <div className="send-input">
      <div className="row">
        <div className="col-10">
          <TextInput
            valueSetter={setText}
            placeholder='Hey! How you doin?'
            isFocused={true}
            press={pressHandler}
            refSetter={refSetter}
          />
        </div>
        <div className="col-2 icon">
          <FontAwesomeIcon icon={faPaperPlane} onClick={clickHandler}/>
        </div>
      </div>      
    </div>
  );
}

export default SendMessageInput;
