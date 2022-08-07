import { React, useState, useContext } from "react";
import TextInput from "../TextInput/TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Context } from "../../Contexts/SendMessageInputContext";

import './SendMessageInput.scss'

function SendMessageInput () {
  const { setText, click, press } = useContext(Context);
  return (
    <div className="send-input">
      <div className="row">
        <div className="col-10">
          <TextInput
            valueSetter={setText}
            placeholder='Hey! How you doin?'
            isFocused={true}
            press={press}
          />
        </div>
        <div className="col-2 icon">
          <FontAwesomeIcon icon={faPaperPlane} onClick={click}/>
        </div>
      </div>      
    </div>
  );
}

export default SendMessageInput;