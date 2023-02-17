import { React, useContext } from "react";
import TextInput from "../TextInput/TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { SendMessageInputContext } from "../../Contexts";

import './SendMessageInput.scss'

function SendMessageInput () {
  const { setText, click, press } = useContext(SendMessageInputContext);
  let input = null

  const refSetter = (ref) => {
    input = ref;
  }

  const clickHandler = (event) =>{
    if(input?.current?.value.trim() ==='')
      return;
    
    click(event);
    input.current.value = '';
  }

  const pressHandler = (event) =>{
    if(event.key === 'Enter'){
      return clickHandler(event);
    }
    press(event);
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
