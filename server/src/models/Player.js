export default class Player {
    constructor() {
        this.id = null;
        this.login = null;
        this.num = 0;
        this.name = null;
        this.clientId = null;
        this.cards = [];
        this.dealWins = 0;
        this.scores = 0;
    }

    setId(id) {
        this.id = id;
    }

    setNum(num) {
        this.num = num;
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
            login: this.login,
            wins: this.wins,
            cards: [],
        }
    }
}
