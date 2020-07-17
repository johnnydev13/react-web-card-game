class Memo {
    constructor() {
        this.data = {};
    }

    set(key, data) {
        this.data[key] = data;
        console.log('set this.data', key, this.data);
    }
    getAll() {
        return this.data;
    }
    get(key) {
        console.log('get this.data', key, this.data);

        return this.data[key];
    }
    delete(key) {
        delete this.data[key];
    }
    /*setInPool(pool, key, data) {
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
    }*/
}

export default Memo;
