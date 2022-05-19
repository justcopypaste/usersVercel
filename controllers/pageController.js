const db = require('./database');

const usuarios = (req, res) => {
    db.getUsers().then((users)=>{
        res.render('users', {users: users});
    })
} 

const home = (req, res) => {
    res.render('home');
}

module.exports= {
    usuarios,
    home
}