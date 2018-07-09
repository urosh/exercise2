const initState = {
  transactions: [],
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
    minutes: '05',
    amount: 10
  },
  timeStampValid: true,
  timeStampError: '',
  timeStampErrorFields: []    
}

const  ADD_TRANSACTION = 'ADD_TRANSACTION';
const  UPDATE_TIME_STAMP = 'UPDATE_TIME_STAMP';
const  UPDATE_VALIDATION = 'UPDATE_VALIDATION';


export const addTransaction = val => ({ type: ADD_TRANSACTION, payload: val});
export const setTimeStamp = val => ({type: UPDATE_TIME_STAMP, payload: val});
export const setValidation = val => ({type: UPDATE_VALIDATION, payload: val});

// Four objects: transactions, accounts, timeStamps, validation
export default (state = initState, action) => {
  switch (action.type) {
    case ADD_TRANSACTION: {
      return {
        ...state,
        transactions: state.transactions.concat(action.payload) 
      }
    }
    case UPDATE_TIME_STAMP: {
      return {
        ...state,
        timeStamps: {...action.payload}
      }
    }
    case UPDATE_VALIDATION: {
      return {
        ...state, 
        ...action.payload
      }
    }
    default: 
      return state
  } 
}

