import { roomCreated, playerConnected, beginGame } from '../actions/game';
import { SOCKET } from '../constants/apiRequestTypes';

export default function socketMiddleware(socket) {
    return ({dispatch, getState}) => {
        socket.connect().then(() => {
            // socket connected
        }).catch(function () {
            // socket is not connected
        });

        socket.on("roomCreated", (data) => {
            dispatch(roomCreated(data.id));
        });

        socket.on("playerConnected", (data) => {
            dispatch(playerConnected(data.players));
        });

        socket.on("gameBegins", (data) => {
            console.log('game begins server event', data);
            dispatch(beginGame(data));
        });

        return next => action => {
            if (typeof action === 'function') {
                return action(dispatch, getState);
            }

            /*
             * Socket middleware usage.
             * promise: (socket) => socket.emit('MESSAGE', 'hello world!')
             * onSuccess: (data) => do something if socket request succeed
             * type: always 'socket'
             * stages: [REQUEST, SUCCESS, FAILURE]
             */
            const { promise, type, stages, onSuccess, ...rest } = action;

            if (type !== SOCKET || !promise) {
                // not a socket request
                return next(action);
            }

            var REQUEST, SUCCESS, FAILURE;

            if (typeof stages !== 'undefined') {
                [REQUEST, SUCCESS, FAILURE] = stages;
            }

            if (typeof REQUEST !== 'undefined') {
                next({...rest, type: REQUEST});
            }

            const actionPromise = promise(socket);

            return actionPromise
                .then((result) => {
                    if (typeof result.error !== 'undefined' && typeof FAILURE !== 'undefined') {
                        return next({...rest, result, type: FAILURE });
                    }

                    let successDispatch;

                    if (typeof SUCCESS !== 'undefined') {
                        successDispatch = next({...rest, result, type: SUCCESS });
                    }

                    if (typeof onSuccess === 'function') {
                        onSuccess(result);
                    }

                    return successDispatch;
                })
                .catch((error) => {
                    return next({...rest, error, type: FAILURE });
                });
        };
    };
}
