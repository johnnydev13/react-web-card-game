export default class Room {
    constructor() {
        this.id = null;
        this.maxPlayers = null;
    }

    setId(id) {
        this.id = id;
    }

    setMaxPlayers(maxPlayers) {
        this.maxPlayers = maxPlayers;
    }

    get() {
        return {
            id: this.id,
            maxPlayers: this.maxPlayers,
        }
    }
}
