import {MOVE_CARDS} from '../actions/cards';
import {BEGIN_GAME} from '../actions/game';

export default function socketMiddleware(socket) {
    return ({dispatch, getState}) => {
        socket.connect().then(() => {
            // socket connected
        }).catch(function () {
            // socket is not connected
        });

        socket.on("gameStarted", (data) => {
            dispatch({
                type:    BEGIN_GAME,
                payload: data
            });
        });

        return next => action => {
            if (typeof action === 'function') {
                return action(dispatch, getState);
            }

            /*
             * Socket middleware usage.
             * promise: (socket) => socket.emit('MESSAGE', 'hello world!')
             * type: always 'socket'
             * types: [REQUEST, SUCCESS, FAILURE]
             */
            const { promise, type, types, ...rest } = action;

            if (type !== 'socket' || !promise) {
                // Move on! Not a socket request or a badly formed one.
                return next(action);
            }

            const [REQUEST, SUCCESS, FAILURE] = types;
            next({...rest, type: REQUEST});

            const actionPromise = promise(socket);

            return actionPromise.then((result) => {
                return next({...rest, result, type: SUCCESS });
            })
                .catch((error) => {
                    return next({...rest, error, type: FAILURE });
                });
        };
    };
}
