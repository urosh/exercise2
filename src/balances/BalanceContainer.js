import React, { Component } from 'react';
import Balance from './Balance';
import { connect } from 'react-redux';

const BalanceContainer = props => {
  return (
    <div className="row">
      <div className="col-sm-6"><Balance accountId={props.accounts[0].id} balance={props.accounts[0].balance} /></div>
      <div className="col-sm-6"><Balance accountId={props.accounts[1].id} balance={props.accounts[1].balance} /></div>
    </div>
  )

}

export default connect((state) => ({accounts: state.accounts}))(BalanceContainer);
