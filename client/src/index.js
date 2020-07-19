import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import { BrowserRouter as Router } from 'react-router-dom'

import store from './store';
import { StyleRoot } from 'radium';

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
