import React, { useEffect, useRef } from 'react';
import './TextInput.css';

function TextInput(props) {

  const input = useRef(null);
  useEffect(() => {
    if (props.isFocused) {
      input.current?.focus();
    }
  }, [])

  const callSetter = (event) => {
    props.valueSetter(event.target.value);
  }

  return (
    <div className="text-input" style={props.style}>
      <p className='header'>{props.label}</p>
      <input type="text" ref={input} onChange={callSetter} placeholder={props.placeholder} />
      {props.detail && (<small className='detail'>{props.detail}</small>)}
    </div>
  );
}

export default TextInput;
