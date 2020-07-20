import { EDIT_PROFILE_SUCCESS } from '../actions/user';
import * as localStorageKeys from '../constants/localStorageKeys';

const localStorageMiddleware = ({ getState }) => {
    return next => action => {
        const result = next(action);

        console.log(action.type);
        if (action.type === EDIT_PROFILE_SUCCESS) {

            localStorage.setItem(localStorageKeys.USER_PROFILE, JSON.stringify(action.result));
        }

        return result;
    };
};

export default localStorageMiddleware;
