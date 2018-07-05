const initState = {
  transactions: [
    { transactionId: '123', amount: '120', type: 'Refund' },
    { transactionId: '456', amount: '20', type: 'Refund' },
    { transactionId: '789', amount: '12', type: 'Fund' },
    { transactionId: '118', amount: '32', type: 'Refund' },
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
    minute: '05',
    amount: 10
  },
  timeStampValid: true,
  timeStampError: '',
  timeStampErrorFields: []    
}

// Four objects: transactions, accounts, timeStamps, validation
export default (state = initState, action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION': {
      return {
        ...state,
        transactions: state.transactions.concat(action.payload) 
      }
    }
    case 'UPDATE_TIME_STAMP': {
      return {
        ...state,
        timeStamps: {...action.payload}
      }
    }
    case 'UPDATE_VALIDATION': {
      return {
        ...state, 
        ...action.payload
      }
    }
    default: 
      return state
  } 
}

