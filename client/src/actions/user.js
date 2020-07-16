import { SOCKET } from '../constants/apiRequestTypes';

export const EDIT_PROFILE = 'EDIT_PROFILE';

export const EDIT_PROFILE_PENDING = 'EDIT_PROFILE_PENDING';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAILURE = 'EDIT_PROFILE_FAILURE';

export const editProfile = (login, name) => ({
    type: SOCKET,
    stages: [EDIT_PROFILE_PENDING, EDIT_PROFILE_SUCCESS, EDIT_PROFILE_FAILURE],
    promise: (socket) => {
        return socket.emit('profileEdit', {login, name});
    },
});

export const sendConnection = () => (dispatch, getState) => {
    let user = getState().user;

    if (user.login === '') {
        return false;
    }

    return dispatch({
        type: SOCKET,
        promise: (socket) => {
            return socket.emit('sendConnection', {login: user.login, name: user.name})
        }
    });
};
