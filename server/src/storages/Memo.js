class Memo {
    constructor() {
        this.data = {};
    }

    set(key, data) {
        this.data[key] = data;
    }
    getAll() {
        return this.data;
    }
    get(key) {
        return this.data[key];
    }
    delete(key) {
        delete this.data[key];
    }
}

export default Memo;
