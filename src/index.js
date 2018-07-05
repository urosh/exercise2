import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'
import registerServiceWorker from './registerServiceWorker';
import store from './store';

const updateValidation = validation => {
  console.log('SENDING VALIDATION', validation);
  store.dispatch({
    type: 'UPDATE_VALIDATION', 
    payload: validation
  })
}

const updateTime = time => {
  store.dispatch({
    type: 'UPDATE_TIME_STAMP',
    payload: time
  })
}

const render = () => {
  const state = store.getState();
  ReactDOM.render(<App  {...state} updateTime={updateTime} updateValidation={updateValidation} />, document.getElementById('root'));
}

render();

store.subscribe(render);

registerServiceWorker();
