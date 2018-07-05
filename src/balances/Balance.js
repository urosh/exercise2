import React from 'react';
import  './Balance.css';

const Balance = props => {
  return (
    <div className="balance-container">
      <div className="balance-account-container">
        <span className="balance-account-text">Account </span>
        <span className="balance-account-id">{props.accountId}</span>
      </div>
      <div className="balance-value-container">
        <span className="balance-value">{props.balance} $</span>
      </div>
    </div>
  );

}

export default Balance;
