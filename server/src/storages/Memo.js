class Memo {
    constructor() {
        this.data = {};
    }

    setInPool(pool, key, data) {
        if (typeof this.data[pool] === 'undefined') {
            this.data[pool] = {};
        }

        this.data[pool][key] = data;
    }

    getByKey(pool, key) {
        if (typeof this.data[pool] == 'undefined') {
            return null;
        }

        return this.data[pool][key] || null;
    }

    getPool(pool) {
        return this.data[pool] || null;
    }

    removeByKey(pool, key) {
        if (typeof this.data[pool] == 'undefined') {
            return null;
        }

        delete this.data[pool][key];
    }
}

export default Memo;
