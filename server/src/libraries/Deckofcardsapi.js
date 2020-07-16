import util from 'util';

class Deckofcardsapi {
    constructor(config, requester) {
        this.config = config;
        this.requester = requester;
    }
    makeUrl(method, ...params) {
        return this.config.apiUrl + util.format(method, ...params);
    }
    createDeck() {
        let result = this.request(this.makeUrl(this.config.methodNewDeck));

        return result.then(data => {
            return this.parseResult(data, 'deck_id')
        }).catch(err => {
            return err;
        });
    }
    drawFromDeck(deckId, count) {
        let result = this.request(this.makeUrl(this.config.methodDraw, deckId, count));

        return result.then(data => {
            return this.parseResult(data, 'cards')
        }).catch(err => {
            return err;
        });
    }
    request(url) {
        return this.requester.get(url).then(response => {
            return response.data;
        }).catch(error => {
            return error;
        })
    }
    parseResult(data, key) {
        if (typeof data[key] === 'undefined') {
            return false;
        }

        return data[key];
    }
}

export default Deckofcardsapi;
