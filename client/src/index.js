import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from './store/configureStore'
import SocketClient from "./api/socketClient";

const socketClient = new SocketClient();
const store = configureStore(socketClient);

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Root store={store} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
