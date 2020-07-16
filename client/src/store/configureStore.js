import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import socketMiddleware from '../middleware/socketMiddleware';
import localStorageMiddleware from '../middleware/localStorageMiddleware';


const logger = createLogger({collapsed: true});

const configureStore = (socketClient) => {
    const middlewares = [
        thunk,
        logger,
        socketMiddleware(socketClient),
        localStorageMiddleware,
    ];

    const store = createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(...middlewares),
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            store.replaceReducer(rootReducer)
        })
    }

    return store
};

export default configureStore
