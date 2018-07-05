import React, { Component } from 'react';
import './TimeStamp.css';
import TimeInput from './TimeInput';

class TimeStampInput extends Component {
  
  render() {
    return (
      <div className="time-stamp-container">
        
        <div className="time-stamp-input-container">
          <TimeInput 
            inputValue={this.props.year}
            range={[18, 30]}
            label="YY"
            inputInvalid={(this.props.timeStampErrorFields.indexOf('year') > -1)}
            onInputTimeChange={(e) => {
              this.props.onInputTimeChange(e, 'year')
            }} 
          />
          /
          <TimeInput
            inputValue={this.props.month}
            label="MM"
            range={[1, 12]}
            inputInvalid={(this.props.timeStampErrorFields.indexOf('month') > -1)}
            onInputTimeChange={(e) => {
              this.props.onInputTimeChange(e, 'month')
            }}
          />
          /
          <TimeInput
            inputValue={this.props.day}
            range={[1, 12]}
            label="DD"
            inputInvalid={(this.props.timeStampErrorFields.indexOf('day') > -1)}
            onInputTimeChange={(e) => {
              this.props.onInputTimeChange(e, 'day')
            }}
          />
          <span>T </span>  
          <TimeInput
            inputValue={this.props.hour}
            range={[0, 23]}
            label="HH"
            inputInvalid={(this.props.timeStampErrorFields.indexOf('hour') > -1)}
            onInputTimeChange={(e) => {
              this.props.onInputTimeChange(e, 'hour')
            }}
          />
          :
          <TimeInput
            inputValue={this.props.minute}
            range={[0, 59]}
            label="MM"
            inputInvalid={(this.props.timeStampErrorFields.indexOf('minute') > -1)}
            onInputTimeChange={(e) => {
              this.props.onInputTimeChange(e, 'minute')
            }}
          />        
        </div>
        <div className="time-stamp-error-container">
          {(!this.props.timeStampValid ? this.props.timeStampError : '')}
        </div>
      </div>
    );
  }
}

export default TimeStampInput;

