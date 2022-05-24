const db = require('../config/database');

const usuarios = (req, res) => {
    if(!req.isAuthenticated()) return res.redirect('/login');
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