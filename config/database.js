const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize('postgresql://postgres:dp$m3-eV4jyBvVR@db.eemlqvkorfcljgmacfiq.supabase.co:5432/postgres', {
    logging: false,
    dialect: 'postgres',
    }
);

if(sequelize.dialect == 'postgres'){
    sequelize.dialectModule = require('pg');
}

class User extends Model{

}

const initDB = () => {
    User.init(  
        {
            email:{
                type: DataTypes.STRING,
                primaryKey: true,
            },
            name:DataTypes.STRING,
            surname:DataTypes.STRING,
            password:DataTypes.STRING,
            avatar:DataTypes.STRING,  
        },  
        { sequelize, modelName:"user" }
    );
    
    sequelize.sync({
        // force: true
    }).then(() => {
            //console.log(`¡Las tablas fueron creadas!`);
        }
    );
}

const createUser = (email, name, surname, password, avatar) => {
    return new Promise((resolve, reject) => {
        User.create({
            email,
            name,
            surname,
            password,
            avatar
        }).then((res) => {
            resolve(res);
        }).catch((err)=>{
            reject(err)
        });
    });
}

const getUsers = () => {
    return new Promise((resolve, reject) => {
        User.findAll().then((users) => {
            resolve(users);
        }).catch((err)=>{reject(err)});
    });
}

const findUser = (email) => {
    return new Promise((resolve, reject) => {
        User.findByPk(email).then((user) => {
            resolve(user);
        }).catch((err)=>{reject(err)});
    });
}

const updateUser = (u) => {
    return new Promise((resolve, reject) => {
        User.update({email: u.email, name: u.name, surname: u.surname, password: u.password, avatar: u.avatar},{where: {email: u.email}})
        .then((res) => {
            resolve(res);
        }).catch((err)=>{
            reject(err)
        });
    });
}

const deleteUser = (email) => {
    return new Promise((resolve, reject) => {
        User.destroy({
            where: {email:email},
        }).then((res) => {
            resolve(res);
        }).catch((err)=>{
            reject(err)
        });
    });
}

module.exports = {
    initDB,
    createUser,
    getUsers,
    findUser,
    updateUser,
    deleteUser
}