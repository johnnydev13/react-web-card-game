import Memo from "../storages/Memo";

let instance = null;

export default class UsersStorageSingleton {
    constructor() {
        this.storage = new Memo();
    }

    static getInstance() {
        if(!instance) {
            instance = new UsersStorageSingleton();
        }

        return instance
    }

    get() {
        return this.storage;
    }
}
