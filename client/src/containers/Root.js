import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import Home from './Home'
import Game from './Game'
import User from './User'
import Header from './Header'
import PlayField from './PlayField'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/styles';

const Root = ({ store }) => (
    <Provider store={store}>
        <Header/>
        <Route exact path="/"                  component={Home} />
        <Route exact path="/user"              component={User} />
        <Route exact path="/game/:roomId"      component={Game} />
        <Route exact path="/game/:roomId/play" component={PlayField} />
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root
