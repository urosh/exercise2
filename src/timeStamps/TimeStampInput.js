import React, { Component } from 'react';
import './TimeStamp.css';
import TimeInput from './TimeInput';
import { connect } from 'react-redux';
import { setValidation, setTimeStamp, addTransaction } from '../reducers/transactions';


const inputValidator = {
  'year': {
    min: 18,
    max: 99
  },
  month: {
    min: 1,
    max: 12
  },
  day: {
    max: [31, 27, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    min: 1
  },
  hour: {
    max: 23,
    min: 0
  },
  minute: {
    max: 59,
    min: 0
  },
  errorMessages: {
    formatError: (type) => {
      return `Time stamp not correct. Please check ${(type ? type : this.props.timeStampErrorFields[0])} format.`
    },
    timeError: `Please select time stamp in future.`,
    amountError: 'Amount is not correct. Please check the amount value and try again'
  }
}

const leapYearCheck = (year) => {
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}



const TimeStampInput = props => {
  
  const setTime = (e, type) => {
    // Remove all non number characters
    e = e.replace(/[^0-9]+/, '')

    validateInput(e, type)

    props.setTimeStamp({
      ...props.timeStamps,
      [type]: e
    })
  }

  const validateDays = e => {
    let day = e || props.timeStamps.day;
    let type = 'day';
    let monthDays = inputValidator.day.max[this.props.timeStamps.month - 1];

    if (Number(props.timeStamps.month) === 2) {
      // Check leap year
      monthDays = leapYearCheck(Number(props.timeStamps.year) + 2000) ? 29 : 28;

    }

    if (day > monthDays) {
      // Need to update state
      return props.setValidation({
        timeStampValid: false,
        timeStampError: `Time stamp not correct. Please check day format.`,
        timeStampErrorFields: [...props.timeStampErrorFields, type]
      })

    }

    let timeStampErrorFields = props.timeStampErrorFields.filter(t => t !== type);

    return props.setValidation({
      timeStampValid: timeStampErrorFields.length ? false : true,
      timeStampError: timeStampErrorFields.length ? `Time stamp not correct. Please check ${this.props.timeStampErrorFields[0]} format.` : '',
      timeStampErrorFields: [...timeStampErrorFields]
    }, () => {
      //this.validateFuture();
    })

    // Validate
    // get Number of days in the current month
  }


  const validateInput = (e, type) => {

    if (type === 'day') return validateDays(e);

    if (Number(e) < inputValidator[type].min) {
      return props.setValidation({
        timeStampValid: false,
        timeStampError: `Time stamp not correct. Please check ${type} format.`,
        timeStampErrorFields: [...props.timeStampErrorFields, type]
      })

    }

    if (Number(e) > inputValidator[type].max) {
      return props.setValidation({
        timeStampValid: false,
        timeStampError: `Time stamp not correct. Please check ${type} format.`,
        timeStampErrorFields: [...props.timeStampErrorFields, type]
      })
    }

    if (String(e).length > 2) {
      return props.setValidation({
        timeStampValid: false,
        timeStampError: `Time ${type} not correct`,
        timeStampErrorFields: [...props.timeStampErrorFields, type]
      })
    }

    let timeStampErrorFields = props.timeStampErrorFields.filter(t => t !== type);

    props.setValidation({
      timeStampValid: timeStampErrorFields.length ? false : true,
      timeStampError: timeStampErrorFields.length ? `Time stamp not correct. Please check ${this.props.timeStampErrorFields[0]} format.` : '',
      timeStampErrorFields: [...timeStampErrorFields]
    }, () => {
      if (type === 'month' || type === 'year') {
        validateDays();
      } else {
        //validateFuture();
      }
    })

  }

/*  onAmountChange={this.setAmount}
                  onInputTimeChange={this.setTime} */
  const setAmount = e => {
    e = e.replace(/[^0-9]+/, '')

    if (e < 1) {
      props.setValidation({
        timeStampValid: false,
        timeStampError: inputValidator.errorMessages.amountError,
        timeStampErrorFields: [...props.timeStampErrorFields, 'amount']
      });
    } else {
      let timeStampErrorFields = props.timeStampErrorFields.filter(t => t !== 'amount');

      props.setValidation({
        timeStampValid: timeStampErrorFields.length ? false : true,
        timeStampError: timeStampErrorFields.length ? `Time stamp not correct. Please check ${props.timeStampErrorFields[0]} format.` : '',
        timeStampErrorFields: [...timeStampErrorFields]
      })
    }

    setTimeStamp({
      ...props.timeStamps,
      amount: e
    })

  }
  console.log(props);
  return (
    <div className="time-stamp-container">
      <div className="time-stamp-input-container">
        <TimeInput
          inputValue={props.timeStamps.year}
          range={[18, 30]}
          label="YY"
          inputInvalid={(props.timeStampErrorFields.indexOf('year') > -1)}
          onInputTimeChange={(e) => {
            setTime(e, 'year')
          }}
        />
        /
        <TimeInput
          inputValue={props.timeStamps.month}
          label="MM"
          range={[1, 12]}
          inputInvalid={(props.timeStampErrorFields.indexOf('month') > -1)}
          onInputTimeChange={(e) => {
            setTime(e, 'month')
          }}
        />
        /
        <TimeInput
          inputValue={props.timeStamps.day}
          range={[1, 12]}
          label="DD"
          inputInvalid={(props.timeStampErrorFields.indexOf('day') > -1)}
          onInputTimeChange={(e) => {
            setTime(e, 'day')
          }}
        />
        <span>T </span>
        <TimeInput
          inputValue={props.timeStamps.hour}
          range={[0, 23]}
          label="HH"
          inputInvalid={(props.timeStampErrorFields.indexOf('hour') > -1)}
          onInputTimeChange={(e) => {
            setTime(e, 'hour')
          }}
        />
        :
        <TimeInput
          inputValue={props.timeStamps.minutes}
          range={[0, 59]}
          label="MM"
          inputInvalid={(props.timeStampErrorFields.indexOf('minutes') > -1)}
          onInputTimeChange={(e) => {
            setTime(e, 'minutes')
          }}
        />
        <span>  </span>
        <div className="time-input-container amount">
          <label className="time-input-label">Amount</label>
          <input
            type="text"
            className={(props.timeStampErrorFields.indexOf('amount') > -1) ? 'error' : ''}
            placeholder="--"
            value={props.timeStamps.amount}
            onChange={(e) => {
              return props.setAmount(e.currentTarget.value);
            }}
          />$
        </div>

      </div>
      <div className="time-stamp-error-container">
        {(!props.timeStampValid ? props.timeStampError : '')}
      </div>
    </div>
  );

}

export default connect((state) => ({
  timeStampValid: state.timeStampValid,
  timeStampError: state.timeStampError,
  timeStampErrorFields: state.timeStampErrorFields,
  timeStamps: state.timeStamps
}), {
  setValidation,
  setTimeStamp
})(TimeStampInput);

