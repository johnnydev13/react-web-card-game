import * as userActions from '../actions/user';
import * as localStorageKeys from '../constants/localStorageKeys';

const getUser = () => {
    var initialUser = {
        name: '',
        login: '',
    };

    try {
        return JSON.parse(window.localStorage.getItem(localStorageKeys.USER_PROFILE)) || initialUser;
    } catch (e) {
        return initialUser
    }
};

const initialState = {
    ...getUser(),
    errors: {},
};

function user(state = initialState, action) {
    switch (action.type) {
        case userActions.EDIT_PROFILE_PENDING:
            return {...state, errors: {}};
        case userActions.EDIT_PROFILE_SUCCESS:
            return {...state, name: action.result.name, login: action.result.login};
        case userActions.EDIT_PROFILE_FAILURE:
            return {...state, errors: action.error};

        case userActions.EDIT_PROFILE:
            return {...state, login: action.login, name: action.name};
        default:
            return state;

    }
}

export default user;
