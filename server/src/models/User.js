export default class User {
    constructor() {
        this.login = null;
        this.name = null;
        this.clientId = null;
    }

    setLogin(login) {
        this.login = login;
    }

    setName(name) {
        this.name = name;
    }

    setClientId(clientId) {
        this.clientId = clientId;
    }

    get() {
        return {
            name:  this.name,
            login: this.login,
        }
    }
}
