import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import { bindActionCreators } from 'redux';
import { setValidation, setTimeStamp, addTransaction } from './reducers/transactions';



const actions = bindActionCreators({
  setValidation,
  setTimeStamp,
}, store.dispatch);


const updateValidation = validation => 
  store.dispatch(setValidation(validation));


const updateTime = time => 
  store.dispatch(setTimeStamp(time))

const render = () => {
  const state = store.getState();
  ReactDOM.render(<App  {...state} updateTime={actions.setTimeStamp} updateValidation={actions.setValidation} />, document.getElementById('root'));
}

render();

store.subscribe(render);

registerServiceWorker();
