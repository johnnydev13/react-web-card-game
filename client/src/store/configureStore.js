import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger';
import initialReducers from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import createReducerManager from './createReducerManager';
import socketMiddleware from '../middleware/socketMiddleware';
import localStorageMiddleware from '../middleware/localStorageMiddleware';

const logger = createLogger({collapsed: true});

const configureStore = (socketClient) => {
    const reducerManager = createReducerManager(initialReducers);

    const middlewares = [
        thunk,
        logger,
        socketMiddleware(socketClient),
        localStorageMiddleware,
    ];

    const store = createStore(
        reducerManager.reduce,
        composeWithDevTools(
            applyMiddleware(...middlewares),
        )
    );

    store.reducerManager = reducerManager;

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            store.replaceReducer(reducerManager.reduce)
        })
    }

    return store
};

export default configureStore
