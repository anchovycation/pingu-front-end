import React, { useEffect, useRef } from 'react';

import './TextInput.scss';

function TextInput(props) {

  const input = useRef(null);
  useEffect(() => {
    if (props.isFocused) {
      input.current?.focus();
    }
  }, [])

  const callSetter = (event) => {
    props.valueSetter(event.target.value.trim());
  }

  return (
    <div className='text-input' style={props.style}>
      <p className='header'>{props.label}</p>
      <input type="text" 
        className={props.hasError ? 'error' : undefined} 
        ref={input} onChange={callSetter} 
        onKeyPress={props.press} 
        placeholder={props.placeholder} 
      />
      {props.detail && (<small className='detail'>{props.detail}</small>)}
    </div>
  );
}

export default TextInput;
