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
            const { promise, type, onPending, onSuccess, onFailure, ...rest } = action;

            if (type !== SOCKET || !promise) {
                // not a socket request
                return next(action);
            }

            if (typeof onPending !== 'undefined') {
                next({...rest, type: onPending});
            }

            const actionPromise = promise(socket);

            return actionPromise
                .then((result) => {
                    if (typeof result.error !== 'undefined') {
                        if (typeof onFailure !== 'undefined') {
                            return next({...rest, result, type: onFailure });
                        }

                        return false;
                    }

                    let successDispatch;

                    if (typeof onSuccess === 'function') {
                        onSuccess(result);
                    }

                    if (typeof onSuccess !== 'undefined') {
                        successDispatch = next({...rest, result, type: onSuccess });
                    }

                    return successDispatch;
                })
                .catch((error) => {
                    if (typeof onFailure !== 'undefined') {
                        return next({...rest, error, type: onFailure });
                    }
                });
        };
    };
}
