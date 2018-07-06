import React, { Component } from 'react';
import './App.css';
import Balance from './balances/Balance';
import TimeStampInput from './timeStamps/TimeStampInput';
import HistoryTable from './history/HistoryTable';
import { connect } from 'react-redux';
import { setValidation, setTimeStamp, addTransaction } from './reducers/transactions';

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


class App extends Component {
  componentDidMount() {
    console.log('COMPONENT READY');
  }

 
  validateFuture = () => {
    // Get now and compare this.state.timeStamps

  }

  validateDays = e => {
    let day = e || this.props.timeStamps.day;
    let type = 'day';
    let monthDays = inputValidator.day.max[this.props.timeStamps.month - 1];

    if (Number(this.props.timeStamps.month) === 2) {
      // Check leap year
      monthDays = leapYearCheck(Number(this.props.timeStamps.year) + 2000) ? 29 : 28;

    }

    if (day > monthDays) {
      // Need to update state
      return this.props.setValidation({
        timeStampValid: false,
        timeStampError: `Time stamp not correct. Please check day format.`,
        timeStampErrorFields: [...this.props.timeStampErrorFields, type]
      })

    }

    let timeStampErrorFields = this.props.timeStampErrorFields.filter(t => t !== type);

    return this.props.setValidation({
      timeStampValid: timeStampErrorFields.length ? false : true,
      timeStampError: timeStampErrorFields.length ? `Time stamp not correct. Please check ${this.props.timeStampErrorFields[0]} format.` : '',
      timeStampErrorFields: [...timeStampErrorFields]
    }, () => {
      this.validateFuture();
    })

    // Validate
    // get Number of days in the current month
  }

  validateInput = (e, type) => {

    if (type === 'day') return this.validateDays(e);
    if (Number(e) < inputValidator[type].min) {
      return this.props.setValidation({
        timeStampValid: false,
        timeStampError: `Time stamp not correct. Please check ${type} format.`,
        timeStampErrorFields: [...this.props.timeStampErrorFields, type]
      })

    }

    if (Number(e) > inputValidator[type].max) {
      return this.props.setValidation({
        timeStampValid: false,
        timeStampError: `Time stamp not correct. Please check ${type} format.`,
        timeStampErrorFields: [...this.props.timeStampErrorFields, type]
      })
    }

    if (String(e).length > 2) {
      return this.props.setValidation({
        timeStampValid: false,
        timeStampError: `Time ${type} not correct`,
        timeStampErrorFields: [...this.props.timeStampErrorFields, type]
      })
    }

    let timeStampErrorFields = this.props.timeStampErrorFields.filter(t => t !== type);

    this.props.setValidation({
      timeStampValid: timeStampErrorFields.length ? false : true,
      timeStampError: timeStampErrorFields.length ? `Time stamp not correct. Please check ${this.props.timeStampErrorFields[0]} format.` : '',
      timeStampErrorFields: [...timeStampErrorFields]
    }, () => {
      if (type === 'month' || type === 'year') {
        this.validateDays();
      } else {
        this.validateFuture();
      }
    })

  }

  setTime = (e, type) => {
    // Remove all non number characters
    e = e.replace(/[^0-9]+/, '')

    this.validateInput(e, type)

    this.props.setTimeStamp({
      ...this.props.timeStamps,
      [type]: e
    })
  }

  setAmount = e => {
    e = e.replace(/[^0-9]+/, '')

    if(e < 1) {
      this.props.setValidation({
        timeStampValid: false,
        timeStampError: inputValidator.errorMessages.amountError,
        timeStampErrorFields: [...this.props.timeStampErrorFields,'amount']
      });
    }else{
      let timeStampErrorFields = this.props.timeStampErrorFields.filter(t => t !== 'amount');

      this.props.setValidation({
        timeStampValid: timeStampErrorFields.length ? false : true,
        timeStampError: timeStampErrorFields.length ? `Time stamp not correct. Please check ${this.props.timeStampErrorFields[0]} format.` : '',
        timeStampErrorFields: [...timeStampErrorFields]
      })
    }

    this.props.setTimeStamp({
      ...this.props.timeStamps,
      amount : e
    })

  }

  addTransaction = type => {
    if (this.props.timeStampValid) {
      this.props.addTransaction({ transactionId: '448', amount: '432', type: 'Refund' },)
      // Need to post data to the server
    }
    /* if(this.state.timeStampValid) {
      console.log('WE CAN ADD TRANSACTION');
    } */
  }

  render() {
    return (
      <div className="content">
        <div className="App">
          <div className="wallet container">
            <div className="row">
              <div className="col-sm-6 offset-sm-3  balances">
                <div className="row">
                  <div className="col-sm-6"><Balance accountId={this.props.accounts[0].id} balance={this.props.accounts[0].balance} /></div>
                  <div className="col-sm-6"><Balance accountId={this.props.accounts[1].id} balance={this.props.accounts[1].balance} /></div>
                </div>
              </div>
              <div className="col-sm-6 offset-sm-3 time-stamps">
                <TimeStampInput
                  {...this.props.timeStamps}
                  timeStampValid={this.props.timeStampValid}
                  timeStampError={this.props.timeStampError}
                  timeStampErrorFields={this.props.timeStampErrorFields}
                  onAmountChange={this.setAmount}
                  onInputTimeChange={this.setTime} />
              </div>
              <div className="col-sm-6 offset-sm-3 action-buttons">
                <button
                  onClick={() => this.addTransaction('fund')}
                  className={"custom-btn fund-btn " + (this.props.timeStampValid ? '' : ' disabled')}
                  text="Fund" >Fund <i className="custom-btn-icon fa fa-arrow-right"></i>
                </button>
                <button
                  onClick={() => this.addTransaction('refund')}
                  className={"custom-btn refund-btn " + (this.props.timeStampValid ? '' : ' disabled')}
                  text="Refund" ><i className="custom-btn-icon fa fa-arrow-left"></i> Refund
                </button>
              </div>
              <div className="col-sm-6 offset-sm-3 history">
                <HistoryTable transactions={this.props.transactions} />
              </div>
              <div className="col-sm-6 offset-sm-3 timeline">
                Timeline
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => state,
  {
    setValidation,
    setTimeStamp,
    addTransaction
  }
)(App);
