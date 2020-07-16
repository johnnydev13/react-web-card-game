export default class UserError {
    constructor() {
        this.errors = {};
    }

    addError(name, message) {
        this.errors[name] = message;
    }

    get() {
        return {
            error: this.errors,
        };
    }

    hasErrors() {
        return Object.keys(this.errors).length > 0;
    }
}
