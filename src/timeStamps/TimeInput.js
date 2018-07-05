import React from 'react';


const TimeInput = props  => {
  return (
    <div className="time-input-container">
      <label className="time-input-label">{props.label}</label>
      <input 
         type="text"
         className={props.inputInvalid ? 'error' : ''} 
         placeholder="--" 
         range={props.range} 
         value={props.inputValue} 
         onChange={(e) => {
          return props.onInputTimeChange(e.currentTarget.value);
        }}
      />
    </div>
  )
}

export default TimeInput;