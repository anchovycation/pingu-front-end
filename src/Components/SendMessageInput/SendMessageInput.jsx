import { React, useState } from "react";
import TextInput from "../TextInput/TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import './SendMessageInput.scss'

function SendMessageInput (props) {
  const [message, setMessage] = useState('');

  return (
    <div className="send-input">
      <div className="row">
        <div className="col-10">
          <TextInput
            valueSetter={setMessage}
            placeholder='Hey! How you doin?'
            isFocused={true}
          />
        </div>
        <div className="col-2 icon">
          <FontAwesomeIcon icon={faPaperPlane}/>
        </div>
      </div>      
    </div>
  );
}

export default SendMessageInput;