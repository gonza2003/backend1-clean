const crypto = require ('node:crypto');

class UserManager {
    constructor() {
        this.users = [];
    }

    getUsers= () => {
        return this.users;
    }

    register = (obj) => {
        const user = { 
        ...obj,
        };
        user.secret =  crypto.randomBytes(128).toString(); 
        user.password = crypto
            .createHmac('sha256', user.secret)
            .update (user.password)
            .digest('hex'),
        this.users.push(user);
        return user;
    };

    login = (email, password) => {
        const users = this.getUsers ();
        const user = users.find ((u) => u.email === email);
        if (!user) throw new Error ('User not found');
        const newCrypto = crypto
        .createHmac ('sha256', user.secret)
        .update (password)
        .digest ('hex');
        if (user.password !== newCrypto) throw new Error ('Invalid password');
        return `Login OK`;
    }
}
const userManager = new UserManager ();

userManager.register ({ email: 'gonza@email.com', password: '1234' }); 
userManager.register ({ email: 'gonza@email.com', password: '12345' });

console.log (userManager.getUsers ());


