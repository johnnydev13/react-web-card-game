import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import { BrowserRouter as Router } from 'react-router-dom'
import configureStore from './store/configureStore'
import SocketClient from './api/socketClient';
import { sendConnection } from './actions/user';

const socketClient = new SocketClient();
const store = configureStore(socketClient);

// sending user connection id to save on a server
// in case or page reload connection will change but login stays the same
store.dispatch(sendConnection());

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Root store={store} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
