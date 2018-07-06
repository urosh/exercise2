import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'
import registerServiceWorker from './registerServiceWorker';
import store from './store';



// This helps us not to call store.dispatch all the time, it does it for us

ReactDOM.render(
  <Provider store={store}>
    <App  />
  </Provider>, 
  document.getElementById('root'));

registerServiceWorker();
