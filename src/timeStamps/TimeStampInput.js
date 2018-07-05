import React, { Component } from 'react';
import './TimeStamp.css';
import TimeInput from './TimeInput';

const TimeStampInput = props => {  
  return (
    <div className="time-stamp-container">
      <div className="time-stamp-input-container">
        <TimeInput 
          inputValue={props.year}
          range={[18, 30]}
          label="YY"
          inputInvalid={(props.timeStampErrorFields.indexOf('year') > -1)}
          onInputTimeChange={(e) => {
            props.onInputTimeChange(e, 'year')
          }} 
        />
        /
        <TimeInput
          inputValue={props.month}
          label="MM"
          range={[1, 12]}
          inputInvalid={(props.timeStampErrorFields.indexOf('month') > -1)}
          onInputTimeChange={(e) => {
            props.onInputTimeChange(e, 'month')
          }}
        />
        /
        <TimeInput
          inputValue={props.day}
          range={[1, 12]}
          label="DD"
          inputInvalid={(props.timeStampErrorFields.indexOf('day') > -1)}
          onInputTimeChange={(e) => {
            props.onInputTimeChange(e, 'day')
          }}
        />
        <span>T </span>  
        <TimeInput
          inputValue={props.hour}
          range={[0, 23]}
          label="HH"
          inputInvalid={(props.timeStampErrorFields.indexOf('hour') > -1)}
          onInputTimeChange={(e) => {
            props.onInputTimeChange(e, 'hour')
          }}
        />
        :
        <TimeInput
          inputValue={props.minute}
          range={[0, 59]}
          label="MM"
          inputInvalid={(props.timeStampErrorFields.indexOf('minute') > -1)}
          onInputTimeChange={(e) => {
            props.onInputTimeChange(e, 'minute')
          }}
        />        
      </div>
      <div className="time-stamp-error-container">
        {(!props.timeStampValid ? props.timeStampError : '')}
      </div>
    </div>
  );
  
}

export default TimeStampInput;

