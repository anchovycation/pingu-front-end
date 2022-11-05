import React, { useEffect, useRef } from 'react';

import './TextInput.scss';

function TextInput({ 
  detail,
  style,
  isFocused,
  valueSetter,
  label,
  hasError,
  placeholder,
  press,
  refSetter,
  ...props}) {

  const input = useRef(null);
  if (refSetter){
    refSetter(input);
  }

  useEffect(() => {
    if (isFocused) {
      input.current?.focus();
    }
  }, [])

  const callSetter = (event) => {
    let text = event.target.value.trim();
    if(text === ''){
      return;
    }
    valueSetter(text);
  }

  return (
    <div className='text-input' style={style}>
      { label && <p className='header'>{label}</p> }
      <input 
        type="text" 
        className={hasError ? 'error' : undefined} 
        ref={input}
        onChange={callSetter} 
        onKeyPress={press} 
        placeholder={placeholder}
        title={placeholder}
      />
      {detail && (<small className='detail'>{detail}</small>)}
    </div>
  );
}

export default TextInput;
