const db = require('../config/database');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const bcrypt = require('bcryptjs');

const post_usuarios =  (req, res) => {
    const supabase = createClient(process.env.SB_HOST,process.env.SB_KEY);

    const form = formidable({
        multiples: false,
        keepExtensions: true
    });
    
    switch (req.params['opcion']) {
        case "crear":
            form.parse(req, (err, fields, files) => {
                if(files.avatar.originalFilename != ""){
                    const filePath = files.avatar.filepath;
                    const ext = path.extname(filePath);
                    const newFileName = `image_${Date.now()}${ext}`;
                    supabase.storage.from('clase10').upload(
                        newFileName,
                        fs.createReadStream(filePath),
                        {
                            upsert: false,
                            contentType: files.avatar.contentType,
                        }
                    ).then((data, err) => {
                        if(err) console.log(err);
                    });
                    const pass = bcrypt.hashSync(fields.password);
                    db.createUser(fields.email, fields.name, fields.surname, pass, newFileName).then((r)=>{
                        res.redirect("/usuarios");
                    });
                }
            });
            break;

        case "modificar":
            form.parse(req, (err, fields, files) => {
                if(files.avatar.originalFilename != ""){
                    const filePath = files.avatar.filepath;
                    const ext = path.extname(filePath);
                    const newFileName = `image_${Date.now()}${ext}`;
                    supabase.storage.from('clase10').upload(
                        newFileName,
                        fs.createReadStream(filePath),
                        {
                            upsert: false,
                            contentType: files.avatar.contentType,
                        }
                    ).then((data, err) => {
                        if(err) console.log(err);
                    });
                    
                    db.findUser(fields.email).then((u)=>{
                        db.updateUser(fields.email, fields.name, fields.surname, u.pass, newFileName).then((r)=>{
                            res.redirect("/usuarios");
                        });
                    });
                }
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
            db.findUser(req.query.email).then((user)=>{
                res.render('edit_user', {user: user});
            });
            break;

        case "eliminar":
            db.deleteUser(req.query.email).then((r)=>{
                res.redirect("/usuarios");
            });
            break;
        
        default:
            res.redirect('/usuarios');
            break;
    }
}

const get_login = (req,res) => {
    const err = req.query.err ? true : false;
    res.render('login', {err});
}

module.exports= {
    post_usuarios,
    get_usuarios,
    get_login

}