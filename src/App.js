import React, { Component } from 'react';
import './App.css';
import BalanceContainer from './balances/BalanceContainer';
import TimeStampInput from './timeStamps/TimeStampInput';
import HistoryTable from './history/HistoryTable';
import ButtonContainer from './buttons/ButtonsContainer';



class App extends Component {
  
  render() {
    return (
      <div className="content">
        <div className="App">
          <div className="wallet container">
            <div className="row">
              <div className="col-sm-6 offset-sm-3  balances">
                <BalanceContainer />
              </div>
              <div className="col-sm-6 offset-sm-3 time-stamps">
                <TimeStampInput />
              </div>
              <div className="col-sm-6 offset-sm-3 action-buttons">
                <ButtonContainer />
                
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

export default App;
/* 
export default connect(
  (state) => state,
  {
    setValidation,
    setTimeStamp,
    addTransaction
  }
)(App);
 */