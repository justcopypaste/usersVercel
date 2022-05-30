const db = require('./database');
const bcrypt = require('bcryptjs');

const passportLogin = (user, pass, done) => {
    deserializeUser(user, (err, u)=>{
        if(err || !user) return done(null, false);
        
        const passMatch = bcrypt.compareSync(pass, u.password);
        if(user == u.email && passMatch){
            done(null, u);
        }else{
            done(null, false);
        }
    });
}

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