import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import Home from './Home'
import Game from './Game'

const Root = ({ store }) => (
    <Provider store={store}>
        <Route exact path="/"     component={Home} />
        <Route exact path="/game" component={Game} />
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root
