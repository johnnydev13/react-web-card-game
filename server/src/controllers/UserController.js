import BaseController from './BaseController';
import UserModel from "../models/User";
import UserService from "../services/User";
import UsersStorageSingleton from "../singletons/UsersStorageSingleton";
import UserError from "../errors/UserError";

let UsersStorageInstance = UsersStorageSingleton.getInstance().get();

export default class UserController extends BaseController{
    constructor() {
        super();
    }

    actionSendConnection(client, data, callback) {
        let {login, name} = data;

        let UserModelInstance = new UserModel();
        UserModelInstance.setName(name.trim());
        UserModelInstance.setLogin(login.trim());
        UserModelInstance.setClientId(client.id);

        let UserServiceInstance = new UserService(UsersStorageInstance);

        UserServiceInstance.setUser(UserModelInstance);
        UserServiceInstance.save();

        return callback(true);
    }

    actionProfileEdit(client, data, callback) {
        let {login, name} = data;

        let UserModelInstance = new UserModel();
        UserModelInstance.setName(name.trim());
        UserModelInstance.setLogin(login.trim());
        UserModelInstance.setClientId(client.id);

        let UserServiceInstance = new UserService(UsersStorageInstance);
        UserServiceInstance.setUser(UserModelInstance);

        let error = new UserError();

        if (!UserServiceInstance.isValidName()) {
            error.addError('name', 'Invalid name, should be ' + UserServiceInstance.getNameRegex())
        }
        if (!UserServiceInstance.isValidLogin()) {
            error.addError('login', 'Invalid name, should be ' + UserServiceInstance.getLoginRegex())
        }

        if (error.hasErrors()) {
            return callback(error.get());
        }

        UserServiceInstance.save();

        return callback(UserModelInstance.get());
    }
}
