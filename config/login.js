const db = require('./database');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');

const passportLogin = new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        session: true,
        passReqToCallback: true
    },
    (req, email, password, done) => {
        deserializeUser(email, (err, user) => {
            if (err) return done(err);    
            if (!user) return done(null, false, { message: "Incorrect email." });
            const passMatch = bcrypt.compareSync(password, user.password);
            if (!passMatch) return done(null, false, { message: "Incorrect password." });    

            return done(null, user);  
        });
    }
);

const serializeUser = (user, done) => {
    done(null, user.email);
}

const deserializeUser = (email, done) => {
    db.findUser(email)
    .then((u) => done(null, u))
    .catch((err) => done("error", false));
}

module.exports = {
    passportLogin,
    serializeUser,
    deserializeUser
}