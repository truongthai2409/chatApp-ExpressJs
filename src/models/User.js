class User {
    constructor({ full_name, email, password, avatar }) {
        this.full_name = full_name;
        this.email = email;
        this.password = password;
        this.avatar = avatar;
    }
}

module.exports = { User }