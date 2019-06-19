import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import {Provider} from 'react-keep-alive';
import { Provider as ReduxProvider } from 'react-redux';
import store from './Store.js';
import App from './App';
import 'antd/dist/antd.css';

import './assets/css/common.css';
import * as serviceWorker from './serviceWorker';
ReactDOM.render(
  <ReduxProvider store={store}>
    <Router >
      <Provider name="App">
        <App />
      </Provider>
    </Router>
</ReduxProvider>,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
