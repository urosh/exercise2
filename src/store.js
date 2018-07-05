import {createStore} from 'redux';
import reducers from './reducers/transactions';

export default createStore(reducers);