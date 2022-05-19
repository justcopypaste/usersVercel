const db = require('./database');
const formidable = require('formidable');

const post_usuarios = (req, res) => {
    const form = formidable({
        multiples:false,
        uploadDir:__dirname+"/../public/img",
        keepExtensions:true
    });
    switch (req.params['opcion']) {
        case "crear":
            form.parse(req, (err, fields, files) => {
                db.createUser(fields.name, fields.surname, files.avatar.newFilename).then((r)=>{
                    res.redirect("/usuarios");
                });
             });
            break;

        case "modificar":
            form.parse(req, (err, fields, files) => {
                const user = {
                    id: fields.id,
                    name: fields.name,
                    surname: fields.surname,
                    avatar: files.avatar.newFilename
                };
                db.updateUser(user).then((r)=>{
                    res.redirect("/usuarios");
                });
             });
            break;
        
        default:
            res.redirect('/usuarios');
            break;
    }
}

const get_usuarios = (req, res) => {
    switch (req.params['opcion']) {
        case "crear":
            res.render('new_user');
            break;

        case "modificar":
            db.findUser(req.query.id).then((user)=>{
                res.render('edit_user', {user: user});
            });
            break;

        case "eliminar":
            const id = req.query.id;
            
            db.deleteUser(id).then((r)=>{
                res.redirect("/usuarios");
            });
            break;
        
        default:
            res.redirect('/usuarios');
            break;
    }
}

module.exports= {
    post_usuarios,
    get_usuarios
}