import React, { Component } from 'react';
import './App.css';
import Balance from './balances/Balance';
import TimeStampInput from './timeStamps/TimeStampInput';
import HistoryTable from './history/HistoryTable';

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
      return `Time stamp not correct. Please check ${(type ? type : this.state.timeStampErrorFields[0])} format.`
    },
    timeError: `Please select time stamp in future.`
  }
}

const leapYearCheck = (year) =>  {
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}


class App extends Component {
  componentDidMount() {
    console.log('COMPONENT READY');
  }
  
  state = {
    transactions: [
      {transactionId: '123', amount: '120', type: 'Refund'},
      {transactionId: '456', amount: '20', type: 'Refund'},
      {transactionId: '789', amount: '12', type: 'Fund'},
    ],
    accounts: [
      {
        id: 'A',
        balance: 100
      },
      {
        id: 'B',
        balance: 0
      }
    ],
    timeStamps: {
      year: '18',
      month: '07',
      day: '04',
      hour: '10',
      minute: '05'
    },
    timeStampValid: true,
    timeStampError: '',
    timeStampErrorFields: []    
  }

  validateFuture = () => {
    // Get now and compare this.state.timeStamps

  }

  validateDays = e => {
    let day = e || this.state.timeStamps.day;
    let type = 'day';
    let monthDays = inputValidator.day.max[this.state.timeStamps.month - 1];
    if(Number(this.state.timeStamps.month) === 2) {
      // Check leap year
      monthDays = leapYearCheck(Number(this.state.timeStamps.year) + 2000) ? 29 : 28;

    } 

    if (day > monthDays){
      return this.setState({
        timeStampValid: false,
        timeStampError: `Time stamp not correct. Please check day format.`,
        timeStampErrorFields: [...this.state.timeStampErrorFields, type]
      })
    }

    let timeStampErrorFields = this.state.timeStampErrorFields.filter(t => t !== type);

    this.setState({
      timeStampValid: timeStampErrorFields.length ? false : true,
      timeStampError: timeStampErrorFields.length ? `Time stamp not correct. Please check ${this.state.timeStampErrorFields[0]} format.` : '',
      timeStampErrorFields: [...timeStampErrorFields]
    }, () => {
      this.validateFuture();
    })

    // Validate
    // get Number of days in the current month
  }

  validateInput = (e, type) => {
    
    if(type === 'day') return this.validateDays(e);

    if(Number(e) < inputValidator[type].min) {
      return this.setState({
        timeStampValid: false,
        timeStampError: `Time stamp not correct. Please check ${type} format.`,
        timeStampErrorFields: [...this.state.timeStampErrorFields, type]
      })
    }
    
    if(Number(e) > inputValidator[type].max){
      return this.setState({
        timeStampValid: false,
        timeStampError: `Time stamp not correct. Please check ${type} format.`,
        timeStampErrorFields: [...this.state.timeStampErrorFields, type]
      })
    }

    if(String(e).length > 2) {
      return this.setState({
        timeStampValid: false,
        timeStampError: `Time ${type} not correct`,
        timeStampErrorFields: [...this.state.timeStampErrorFields, type]
      })
    }

    let timeStampErrorFields = this.state.timeStampErrorFields.filter(t => t !== type);
    
    this.setState({
      timeStampValid: timeStampErrorFields.length ? false : true,
      timeStampError: timeStampErrorFields.length ? `Time stamp not correct. Please check ${this.state.timeStampErrorFields[0]} format.` : '',
      timeStampErrorFields: [...timeStampErrorFields]
    }, () => {
      if (type === 'month' || type === 'year') {
        this.validateDays();
      }else{
        this.validateFuture();
      }
    })

   }

  setTime = (e, type) => {
    // Remove all non number characters
    e = e.replace(/[^0-9]+/, '');
     
    this.validateInput(e, type);

    this.setState({
      timeStamps: {
        ...this.state.timeStamps, 
        [type]: e
      }
    })
  }

  addTransaction = type => {
    if(this.state.timeStampValid) {
      console.log('WE CAN ADD TRANSACTION');
    }
  }
  
  render() {
    return (
      <div className="content">
        <div className="App">
          <div className="wallet container">
            <div className="row">
              <div className="col-sm-6 offset-sm-3  balances">
                <div className="row">
                  <div className="col-sm-6"><Balance accountId={this.state.accounts[0].id} balance={this.state.accounts[0].balance} /></div>
                  <div className="col-sm-6"><Balance accountId={this.state.accounts[1].id} balance={this.state.accounts[1].balance} /></div>
                </div>
              </div>
              <div className="col-sm-6 offset-sm-3 time-stamps">
                <TimeStampInput 
                  {...this.state.timeStamps} 
                  timeStampValid={this.state.timeStampValid} 
                  timeStampError={this.state.timeStampError}
                  timeStampErrorFields={this.state.timeStampErrorFields}
                  onInputTimeChange={this.setTime} />
              </div>
              <div className="col-sm-6 offset-sm-3 action-buttons">
                <button
                  onClick={() => this.addTransaction('fund')} 
                  className={"custom-btn fund-btn " + (this.state.timeStampValid ? '' : ' disabled')} 
                  text="Fund" >Fund <i className="custom-btn-icon fa fa-arrow-right"></i>
                </button>
                <button 
                  onClick={() => this.addTransaction('refund')}
                  className={"custom-btn refund-btn " + (this.state.timeStampValid ? '' : ' disabled')} 
                  text="Refund" ><i className="custom-btn-icon fa fa-arrow-left"></i> Refund
                </button>
              </div>
              <div className="col-sm-6 offset-sm-3 history">
                <HistoryTable transactions={this.state.transactions} />
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


export default App;
