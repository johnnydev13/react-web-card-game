import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import { BrowserRouter as Router } from 'react-router-dom'
import { sendConnection } from './actions/user';
import store from './store';
import { StyleRoot } from 'radium';
// sending user connection id to save on a server
// in case or page reload connection will change but login stays the same
store.dispatch(sendConnection());

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <StyleRoot>
        <Root store={store} />
        </StyleRoot>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
