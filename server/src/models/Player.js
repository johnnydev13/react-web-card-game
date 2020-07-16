export default class Player {
    constructor() {
        this.id = null;
        this.login = null;
        this.name = null;
        this.clientId = null;
        this.cards = [];
    }

    setId(id) {
        this.id = id;
    }

    setLogin(login) {
        this.login = login;
    }

    setClientId(clientId) {
        this.clientId = clientId;
    }

    setName(name) {
        this.name = name;
    }

    get() {
        return {
            id:   this.id,
            name: this.name,
            cards: [],
        }
    }
}
