import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './History.css';

const HistoryTable = props => {
 
  return (
    <div className="history-table-container">
      <BootstrapTable data={props.transactions} striped hover options={{ noDataText: 'No available transactions' }}>
        <TableHeaderColumn  dataField='type'>Transaction type</TableHeaderColumn>
        <TableHeaderColumn dataField='amount'>Amount</TableHeaderColumn>
        <TableHeaderColumn dataField='transactionId' isKey>Transaction Id</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
}

export default HistoryTable;