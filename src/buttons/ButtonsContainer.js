import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTransaction } from '../reducers/transactions';

const ButtonsContainer = props => {
  const addTransaction = type => {
    if (props.timeStampValid) {
      //props.addTransaction({ transactionId: '448', amount: '432', type: 'Refund' }, )
      // Need to post data to the server
      fetch('http://localhost:3232/requestTransfer', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          "Content-Type": "application/json; charset=utf-8",
          // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          ...props.timeStamps,
          year: (props.timeStamps.year),
          type: 'fund',
          credit: 'A',
          debit: 'B'
        })
      })
      .then(res => res.text())
      .then(response => {
        console.log('Now i am trying to dispatch')
        props.addTransaction({transactionId: '1', amount: '12', type: 'fund'})
      })
    }
  }
  return (
    <div>
      <button
        onClick={() => addTransaction('fund')}
        className={"custom-btn fund-btn " + (props.timeStampValid ? '' : ' disabled')}
        text="Fund" >Fund <i className="custom-btn-icon fa fa-arrow-right"></i>
      </button>
      <button
        onClick={() => addTransaction('refund')}
        className={"custom-btn refund-btn " + (props.timeStampValid ? '' : ' disabled')}
        text="Refund" ><i className="custom-btn-icon fa fa-arrow-left"></i> Refund
        </button>
    </div>
  );
}

export default connect((state) => ({
  timeStampValid: state.timeStampValid,
  timeStamps: state.timeStamps
}), {
    addTransaction
  })(ButtonsContainer);
