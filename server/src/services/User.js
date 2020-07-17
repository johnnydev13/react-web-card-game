class User {
    constructor(storage) {
        this.storage = storage;
        this.user = null;

        this.nameRegex = /^[a-z0-9-_ ]{3,20}$/i;
        this.loginRegex = /^[a-z0-9-_]{3,20}$/i;

        this.userPoolKey = 'user';
    }

    setUser(user) {
        this.user = user;
    }

    getNameRegex() {
        return this.nameRegex;
    }

    getLoginRegex() {
        return this.loginRegex;
    }

    isValidName() {
        return this.nameRegex.test(this.user.name);
    }
    isValidLogin() {
        return this.loginRegex.test(this.user.login);
    }
    checkExists() {
        return false;
    }

    save() {
        console.log('saving user', this.user);
        return this.storage.set(this.user.login, this.user);
    }
}

export default User;
